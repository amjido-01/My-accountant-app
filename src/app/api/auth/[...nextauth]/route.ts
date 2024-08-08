import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient();

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

console.log('NextAuth configuration loaded');

export  default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>> | undefined) {
        try {
          // Validate the credentials using Zod
          const { email, password } = credentialsSchema.parse(credentials);

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || user.email === null) {
            throw new Error('No user found');
          }

          const isValid = await bcrypt.compare(password, user.password || '');

          if (!isValid) {
            return null;
          }

          return { id: user.id.toString(), email: user.email };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return null;
          }
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string; // Ensure email is a string
      return session;
    },
  },
});



// export  { handlers as GET, auth as POST };