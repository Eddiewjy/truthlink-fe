'use client'

import { motion } from 'framer-motion'
import { AbstraxionConnectButton } from './abstraxion-connect-button'
import { Button } from '@/components/ui/button'
import { Shield, Building2, Search, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'

export function EnterpriseNavigation() {
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
              href="/enterprise/dashboard"
              className="flex items-center space-x-2"
            >
              <Shield className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">TruthLink</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/enterprise/dashboard"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Building2 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/enterprise/search"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Link>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <AbstraxionConnectButton />
          </motion.div>
        </div>
      </div>
    </header>
  )
}
