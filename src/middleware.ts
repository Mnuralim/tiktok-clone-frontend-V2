import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'

export async function middleware(req: NextRequest) {
  const session = await auth()

  if (!session?.user.accessToken && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/login', req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  if (session?.user.accessToken && req.nextUrl.pathname === '/login') {
    const newUrl = new URL('/', req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg$).*)'],
}
