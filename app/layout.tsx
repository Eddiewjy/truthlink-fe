'use client'

import type React from 'react'

import { Inter } from 'next/font/google'
import './globals.css'
import { AbstraxionProvider } from '@burnt-labs/abstraxion'

const inter = Inter({ subsets: ['latin'] })

const abstraxionConfig = {
  rpcUrl: 'https://rpc.xion-testnet-2.burnt.com:443'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Language" content="en" />
      </head>
      <body className={inter.className}>
        <AbstraxionProvider config={abstraxionConfig}>
          {children}
        </AbstraxionProvider>
      </body>
    </html>
  )
}
