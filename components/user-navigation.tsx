'use client'

import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import { Shield, User, FileText, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'

export function UserNavigation() {
  const router = useRouter()
  const { setUserType, setWalletAddress } = useAuthStore()

  const handleLogout = () => {
    setUserType(null)
    setWalletAddress(null)
    router.push('/')
  }

  return (
    <header className="border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-8"
          >
            <Link
              href="/user/dashboard"
              className="flex items-center space-x-2"
            >
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">VerifyChain</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/user/dashboard"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <ConnectButton />
          </motion.div>
        </div>
      </div>
    </header>
  )
}
