"use client"
import React from 'react'
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
    <Button>Get started</Button>
  </div>
  </div>
</nav>
  )
}

export default Navbar