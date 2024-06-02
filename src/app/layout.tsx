import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './provider'
import BottomBar from '@/components/bottom-bar'
import CommentListWrapper from '@/components/comment-list-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tiktok Clone',
  description: 'Generated by create next app',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <div className="w-full max-w-xl mx-auto">
          <Providers>
            {children}
            <BottomBar />
            <CommentListWrapper />
          </Providers>
        </div>
      </body>
    </html>
  )
}
