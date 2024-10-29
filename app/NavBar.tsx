'use client'

import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

function NavBar() {

const {data:session}= useSession()




  return (
    <div className=" bg-slate-300 w-full top-0  shadow-dark-mild dark:bg-neutral-700 lg:py-4 lg:pr-44 h-20">
    <div className="flex justify-between items-center w-full px-3">
      <div className=' gap-2 flex '>
      <Image height={200} width={200} alt='user image' src={session?.user?.image || ""} className ='rounded-3xl w-10'/>
    <h2> {session?.user?.name}</h2></div>
     
     
   
      <div className="flex items-center justify-end space-x-6 ">
  <Link 
    className="text-xl text-gray-900 dark:text-gray-100 hover:text-blue-500 transition-colors duration-200" 
    href={'/'}>
    Recipes
  </Link>
  <Link 
    className="text-xl text-gray-900 dark:text-gray-100 hover:text-blue-500 transition-colors duration-200" 
    href={'/testimonials'}>
    Testimonials
  </Link>
  <Link 
    className="text-xl text-gray-900 dark:text-gray-100 hover:text-blue-500 transition-colors duration-200" 
    href={'/'}>
    Contact
  </Link>
  <button 
    className="text-xl text-red-600 dark:text-red-400 hover:text-red-800 transition-colors duration-200" onClick={()=>signOut()}>
    LogOut
  </button>
</div>
</div>
  </div>
  )  
}

export default NavBar
