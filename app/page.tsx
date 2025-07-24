'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Users, Building2, Zap } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

export default function HomePage() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const { userType, setUserType, setWalletAddress } = useAuthStore()

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address)
    }
  }, [isConnected, address, setWalletAddress])

  const handleUserTypeSelection = (type: 'user' | 'enterprise') => {
    setUserType(type)
    router.push(type === 'user' ? '/user/dashboard' : '/enterprise/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <Shield className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">
                  VerifyChain
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ConnectButton />
              </motion.div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30"
              >
                <Zap className="w-4 h-4 mr-1" />
                Web3 Background Verification
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Decentralized
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {' '}
                Background{' '}
              </span>
              Verification
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Secure, transparent, and privacy-focused background verification
              powered by blockchain technology
            </motion.p>

            {!isConnected ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-16"
              >
                <p className="text-gray-400 mb-4">
                  Connect your wallet to get started
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16"
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-blue-500/20 w-fit group-hover:bg-blue-500/30 transition-colors">
                      <Users className="h-8 w-8 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">
                      Individual User
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your professional profile and control your privacy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleUserTypeSelection('user')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Continue as User
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-purple-500/20 w-fit group-hover:bg-purple-500/30 transition-colors">
                      <Building2 className="h-8 w-8 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">Enterprise</CardTitle>
                    <CardDescription className="text-gray-400">
                      Conduct secure background verifications for your
                      organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleUserTypeSelection('enterprise')}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Continue as Enterprise
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Privacy First</CardTitle>
                <CardDescription className="text-gray-400">
                  You control what information to share and with whom
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">
                  Instant Verification
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Fast and reliable background checks powered by blockchain
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Trusted Network</CardTitle>
                <CardDescription className="text-gray-400">
                  Built on decentralized trust and transparency
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
