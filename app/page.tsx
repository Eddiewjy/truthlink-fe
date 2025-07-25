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
import { Boxes } from '@/components/ui/background-boxes'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'

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

  // 打字机效果的文字配置
  const words = [
    {
      text: 'Decentralized',
      className:
        'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'
    },
    {
      text: 'Multiagent',
      className:
        'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400'
    },
    {
      text: 'Recruitment',
      className:
        'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Boxes */}
      <div className="absolute inset-0 z-0">
        <Boxes />
      </div>

      {/* Overlay gradient for better text readability - with pointer-events-none */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/80 z-3 pointer-events-none" />

      {/* Header */}
      <header className="border-b border-gray-700/50 backdrop-blur-sm z-5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Shield className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Truthlink
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
      <section className="relative container mx-auto px-4 py-20 z-5">
        <div className="text-center max-w-4xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <TypewriterEffectSmooth
              words={words}
              className="justify-center"
              cursorClassName="text-green-400"
              typeSpeed={150}
              deleteSpeed={100}
              delayBetweenWords={1500}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl mb-12 max-w-2xl mx-auto"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
              Secure, transparent, and privacy-focused recruitment verification
              powered by blockchain technology
            </span>
          </motion.p>

          {!isConnected ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-16"
            >
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 mb-4">
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
              <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-green-500/20 w-fit group-hover:bg-green-500/30 transition-colors">
                    <Users className="h-8 w-8 text-green-400" />
                  </div>
                  <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500">
                    Individual User
                  </CardTitle>
                  <CardDescription className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                    Manage your professional profile and control your privacy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleUserTypeSelection('user')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Continue as User
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-purple-500/20 w-fit group-hover:bg-purple-500/30 transition-colors">
                    <Building2 className="h-8 w-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500">
                    Enterprise
                  </CardTitle>
                  <CardDescription className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                    Conduct secure recruitment verifications for your
                    organization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleUserTypeSelection('enterprise')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Continue as Enterprise
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
