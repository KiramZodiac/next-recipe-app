import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET, // MUST MATCH
  })

  const protectedRoutes = ['/savedRecipes', '/addRecipe','/testimonials']

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/api/auth/signin', req.url)
      loginUrl.searchParams.set('callbackUrl', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}
