"use client"
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter()

  if (status === 'loading') {
    return <div>loading...</div>
  }
  if (!session?.user) {
    router.push('/login');
    return null;
  }

  return (
    <div>
       <h1>Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}

export default page