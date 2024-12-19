'use client'

import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

import { usePathname } from 'next/navigation'


function NavBar() {

  const links = [
    {
      title:'Recipes',
      href:'/'
    },
    {
      title:'Testimonials',
      href:'/testimonials'
    },
   
  
  
  ]

const {data:session}= useSession()

const activeRoute = usePathname()

console.log(activeRoute);


  return (
    <div className=" flex  w-full  shadow-dark-mild border-b space-x-5 space-y-5 p-5 max-sm:p-0 ">
    <div className="flex justify-between items-center w-full px-3">
      <div className=' gap-2 flex '>
      <Image height={200} width={200} alt='user image' src={session?.user?.image || ""} className ='rounded-3xl w-10'/>
    <h2> {session?.user?.name}</h2></div>
     
<div className="flex items-center justify-end space-x-6 ">

<div className=' flex gap-2'>
  {links.map((link)=>(
    <div key={link.title} >
      <Link  href={link.href} className={activeRoute ===link.href ?'text-black font-bold': ' text-slate-500 font-bold'}>{link.title.toLocaleUpperCase()}</Link>
    </div>
  ))}
</div>

  <button 
    className="text-xl text-red-700 hover:text-red-400 transition-colors duration-200" onClick={()=>signOut()}>
    LOGOUT
  </button>
</div>
</div>
</div>
  )  
}

export default NavBar;
