"use client"
import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {ModeToggle} from "@/components/ui/ModeToggle";
const Navbar = () => {
  return (
<nav className="container w-full z-20 start-0 border-b border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FinTrack</span>
  </a>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <ModeToggle />
    <Link href="/login" className='h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>Get started</Link>
  </div>
  </div>
</nav>
  )
}

export default Navbar