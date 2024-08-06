'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
// import { useActionState } from 'react';
// import { authenticate } from '@/lib/actions';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

type SignInForm = z.infer<typeof signInSchema>;

const page = () => {
    // const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            signInSchema.parse({email, password});
            const res = await signIn("credentials", {email, password, callbackUrl: "/dashboard"});
            if (res?.error) {
                setError(res.error);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError(error.errors[0].message);
        } else {
            setError('An error occurred');
        }
    }
}

  return (
        <div className="">

    <div className="flex justify-center hscreen">

        <div className='hidden bg-cover h-screen lg:block lg:w-[60%]'>
        <Image src="/form.jpg"  alt="Finance"   width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: "cover" }} priority={true} />
        </div>
        
        <div className="w-full border-2 max-w-md px-6 mx-auto lg:w-2/6">
        <div>
            
        </div>
        <p className="mt-3 md:mt-14 text-xl text-center text-gray-600 dark:text-gray-200">
            Login to your account
        </p>

        <a href="#" className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <div className="px-4 py-2">
                <svg className="w-6 h-6" viewBox="0 0 40 40">
                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
        </a>

        <div className="flex border-2 border-red-500 items-center justify-between mt-4 md:mt-20">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                with email</a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="mt-4">
            <Label className='block mb-2 text-sm font-medium' htmlFor="email">Email Address</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className='block w-full px-4 py-2' id='email' type='text' />
        </div>

        <div className="mt-4">
            <div className="flex justify-between">
               
                <a href="#" className="text-xs">Forget Password?</a>
                <Label className='block mb-2 text-sm font-medium' htmlFor="password">Password?</Label>
            </div>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} id='password' type='password' className='block w-full px-4 py-2' />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mt-6">
        {/* {error && <p>{error}</p>} */}
            <Button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600"> Sign In </Button>
        </div>

        <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link href="/signup" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
        </form>
        

        {/* <div className="flex items-center w-full border-2 max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
                <div className="text-center">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
                    </div>

                    <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                </div>

                <div className="mt-8">
                    <form>
                        <div>
                            <label for="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                            <input type="email" name="email" id="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between mb-2">
                                <label for="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                            </div>

                            <input type="password" name="password" id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign in
                            </button>
                        </div>

                    </form>

                    <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
                </div>
            </div>
        </div> */}
        </div>

    </div>

    </div>
  )
}

export default page