'use client'
import { motion } from 'framer-motion'
import { UserNavigation } from '@/components/user-navigation'
import { NFTViewer } from '@/components/nft-viewer'
import { IPFSReader } from '@/components/ipfs-reader'
import { NFTQuery } from '@/components/nft-query'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Award, FileText, Search } from 'lucide-react'

export default function NFTToolsPage() {
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
            NFT Tools & IPFS Reader
          </h1>
          <p className="text-gray-300">
            Manage your NFTs and explore IPFS content
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - NFT Tools */}
          <div className="space-y-8">
            {/* NFT Viewer - Enhanced version with details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">
                    My NFT Collection
                  </h2>
                </div>
                <p className="text-gray-400 text-sm">
                  View and explore your NFT collection with detailed information
                </p>
              </div>
              <NFTViewer />
            </motion.div>

            {/* Simple NFT Query */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Search className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">
                    Quick NFT Query
                  </h2>
                </div>
                <p className="text-gray-400 text-sm">
                  Simple tool to quickly check NFTs owned by any address
                </p>
              </div>
              <NFTQuery />
            </motion.div>
          </div>

          {/* Right Column - IPFS Tools */}
          <div className="space-y-8">
            {/* IPFS Reader */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-6 h-6 text-green-400" />
                  <h2 className="text-xl font-bold text-white">
                    IPFS Content Reader
                  </h2>
                </div>
                <p className="text-gray-400 text-sm">
                  Read and preview content from any IPFS address
                </p>
              </div>
              <IPFSReader />
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">How to Use</CardTitle>
                  <CardDescription className="text-gray-300 space-y-2">
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-semibold text-purple-300">
                          NFT Collection:
                        </span>
                        <span className="ml-2">
                          Connect your wallet or enter an address to view
                          detailed NFT information with IPFS content preview.
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-300">
                          Quick Query:
                        </span>
                        <span className="ml-2">
                          Simple list view of NFTs owned by any wallet address.
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-green-300">
                          IPFS Reader:
                        </span>
                        <span className="ml-2">
                          Enter any IPFS URL (ipfs://...) to preview images,
                          JSON data, or text content.
                        </span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">
                    Supported Features
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          ✓
                        </div>
                        <div className="text-sm">NFT Metadata</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          ✓
                        </div>
                        <div className="text-sm">IPFS Images</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">
                          ✓
                        </div>
                        <div className="text-sm">JSON Content</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400 mb-1">
                          ✓
                        </div>
                        <div className="text-sm">Text Files</div>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
