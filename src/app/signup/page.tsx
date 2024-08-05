"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const prisma = new PrismaClient()

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignUpForm = z.infer<typeof SignupSchema>

const page = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("hello")
  console.log('Form submitted');
  try {
    SignupSchema.parse({ email, password });
    console.log('Validation passed');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed');
    await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    console.log('User created');
    router.push('/login');
  } catch (error) {
    if (error instanceof z.ZodError) {
      setError(error.errors[0].message);
    } else {
      setError('An error occurred');
    }
  }
    }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default page