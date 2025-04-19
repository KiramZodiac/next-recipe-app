'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const activeRoute = usePathname()

  const links = [
    {
      title: 'Recipes',
      href: '/'
    },
    
    {
      title: 'Saved Recipes',
      href: '/savedRecipes'
    },
    {
      title: 'Add Recipe',
      href: '/addRecipe'
    },
    {
      title: 'Testimonials',
      href: '/testimonials'
    },
  ]

  const isLoggedIn = status === 'authenticated'

  return (
    <nav className="flex w-full shadow-md border-b p-4 sm:p-5 bg-white flex-col sm:flex-row sm:items-center sm:justify-between">
      {/* Logo and User Info */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center gap-3">
          <Image
            height={200}
            width={200}
            alt="user image"
            src={session?.user?.image || "/default-avatar.webp"} 
            className="rounded-full w-10 h-10"
          />
          <h2 className="text-lg font-semibold">{session?.user?.name || 'Guest'}</h2>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-2xl text-gray-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

     
      <div
        className={`${
          menuOpen ? 'block' : 'hidden'
        } sm:flex flex-col sm:flex-row sm:items-center sm:justify-end w-full mt-4 sm:mt-0 space-y-4 sm:space-y-0 sm:space-x-6`}
      >
        <div className="flex flex-col sm:flex-row sm:gap-5 gap-3 justify-center">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`text-base font-semibold transition-colors duration-200 ${
                activeRoute === link.href
                  ? 'text-blue-600 underline'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              {link.title.toLocaleUpperCase()}
            </Link>
          ))}
        </div>

        {isLoggedIn ? (
          <Button onClick={() => signOut()}>Log Out</Button>
        ) : (
          <Button onClick={() => signIn()}>Log In</Button>
        )}
      </div>
    </nav>
  )
}

export default NavBar
