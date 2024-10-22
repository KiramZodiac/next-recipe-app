import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <div className="fixed w-full bg-slate-400 shadow-dark-mild dark:bg-neutral-700 lg:py-4">
    <div className="flex justify-between items-center w-full px-3">

      <div className="flex-grow"></div> 
      
   
      <div className="me-10">
        <Link className="text-xl text-black dark:text-white" href={'/'}>Recipes</Link>
      </div>
    </div>
  </div>
  )  
}

export default NavBar
