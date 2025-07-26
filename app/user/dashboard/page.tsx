'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Briefcase,
  Users,
  FolderOpen,
  ChevronRight,
  MapPin,
  Calendar,
  Award,
  ExternalLink
} from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { UserNavigation } from '@/components/user-navigation'
import { NFTViewer } from '@/components/nft-viewer'
import { IPFSReader } from '@/components/ipfs-reader'
import Link from 'next/link'

export default function UserDashboard() {
  const { walletAddress } = useAuthStore()

  // User basic information
  const userInfo = {
    name: 'John Smith',
    age: 28,
    avatar: '/placeholder-user.jpg',
    location: 'New York',
    joinDate: '2023-01-15'
  }

  // Module data
  const modules = [
    {
      title: 'Work Experience',
      description: 'Internships, Job Experience',
      icon: Briefcase,
      href: '/user/work-experience',
      color: 'from-blue-500 to-blue-600',
      count: 3
    },
    {
      title: 'Community Experience',
      description: 'Activities, Contributions',
      icon: Users,
      href: '/user/community-experience',
      color: 'from-green-500 to-green-600',
      count: 5
    },
    {
      title: 'Project Experience',
      description: 'Competitions, Research',
      icon: FolderOpen,
      href: '/user/project-experience',
      color: 'from-purple-500 to-purple-600',
      count: 7
    }
  ]

  // Recent NFTs data
  const recentNFTs = [
    {
      id: 1,
      name: 'Excellence Award 2024',
      type: 'Work Achievement',
      date: '2024-06-15',
      image: '/nft-placeholder-1.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Community Leader',
      type: 'Community Recognition',
      date: '2024-05-20',
      image: '/nft-placeholder-2.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Project Innovation',
      type: 'Project Completion',
      date: '2024-04-10',
      image: '/nft-placeholder-3.jpg',
      verified: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <UserNavigation />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Personal Dashboard
          </h1>
          <p className="text-gray-300">
            Manage your personal information and professional profile
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User basic information card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={userInfo.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl">
                    {userInfo.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-white text-2xl">
                  {userInfo.name}
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Age {userInfo.age}
                </CardDescription>
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{userInfo.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">Joined {userInfo.joinDate}</span>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-500/20 text-green-300 border-green-500/30 mt-4"
                >
                  Verified User
                </Badge>
              </CardHeader>
            </Card>

            {/* NFT query component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <NFTViewer defaultWallet={walletAddress || undefined} />
            </motion.div>

            {/* Recently obtained NFT cards */}
            <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <CardTitle className="text-white text-xl">
                    Recent NFTs
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-300">
                  Latest achievements and certifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-white truncate">
                          {nft.name}
                        </p>
                        {nft.verified && (
                          <Badge
                            variant="secondary"
                            className="bg-green-500/20 text-green-300 border-green-500/30 text-xs"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{nft.type}</p>
                      <p className="text-xs text-gray-500">{nft.date}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Module navigation area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="grid gap-6">
              {/* IPFS Reader component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <IPFSReader />
              </motion.div>

              <div className="grid grid-cols-1 gap-6">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link href={module.href}>
                      <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 cursor-pointer group">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div
                              className={`p-3 rounded-lg bg-gradient-to-r ${module.color} group-hover:scale-110 transition-transform duration-300`}
                            >
                              <module.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="secondary"
                                className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                              >
                                {typeof module.count === 'number'
                                  ? `${module.count} items`
                                  : module.count}
                              </Badge>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                          </div>
                          <CardTitle className="text-white text-xl group-hover:text-blue-300 transition-colors duration-300">
                            {module.title}
                          </CardTitle>
                          <CardDescription className="text-gray-300">
                            {module.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Additional statistics information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Profile Overview
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Your digital identity statistics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-blue-400">
                          15
                        </div>
                        <div className="text-sm text-gray-300">
                          Total Records
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-green-400">
                          12
                        </div>
                        <div className="text-sm text-gray-300">Verified</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-purple-400">
                          8
                        </div>
                        <div className="text-sm text-gray-300">
                          NFT Certificates
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
