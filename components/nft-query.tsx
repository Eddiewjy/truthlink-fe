'use client'
import { useState } from 'react'
import {
  useAbstraxionAccount,
  useAbstraxionClient
} from '@burnt-labs/abstraxion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Wallet, ExternalLink, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const contractAddress =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  'xion1ds0u7pgc7g2qdscf2ak56ca0xxuywxwqa5e42nsee520jsuk3m7sw2tvg7'

interface NFTQueryProps {
  defaultWallet?: string
}

export function NFTQuery({ defaultWallet }: NFTQueryProps) {
  const { data: account } = useAbstraxionAccount()
  const { client: queryClient } = useAbstraxionClient()

  const [walletAddress, setWalletAddress] = useState(defaultWallet || '')
  const [nftList, setNftList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Auto-fill wallet address when account is connected
  const handleAutoFill = () => {
    if (account?.bech32Address) {
      setWalletAddress(account.bech32Address)
    }
  }

  // Query NFTs for the specified wallet
  const queryNFTs = async () => {
    if (!walletAddress.trim()) {
      setError('Please enter a wallet address')
      return
    }

    setLoading(true)
    setError('')
    setNftList([])

    try {
      if (!queryClient) {
        throw new Error('Query client not initialized')
      }

      const res = await queryClient.queryContractSmart(contractAddress, {
        tokens: { owner: walletAddress.trim() }
      })

      setNftList(res.tokens || [])
      if (!res.tokens || res.tokens.length === 0) {
        setError('No NFTs found for this address')
      }
    } catch (e: any) {
      setError('Query failed: ' + (e.message || e.toString()))
    }
    setLoading(false)
  }

  return (
    <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-blue-400" />
          <CardTitle className="text-white">Query NFTs</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter wallet address (xion1...)"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
          {account?.bech32Address && (
            <Button
              onClick={handleAutoFill}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Wallet className="w-4 h-4 mr-1" />
              Use Connected
            </Button>
          )}
        </div>

        <Button
          onClick={queryNFTs}
          disabled={loading || !walletAddress.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Querying...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Query NFTs</span>
            </div>
          )}
        </Button>

        {error && (
          <div className="text-red-400 bg-red-900/20 p-3 rounded border border-red-500/20">
            {error}
          </div>
        )}

        {nftList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Found NFTs</h3>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-300 border-green-500/30"
              >
                {nftList.length} items
              </Badge>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {nftList.map((tokenId, index) => (
                <motion.div
                  key={tokenId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">NFT #{tokenId}</p>
                      <p className="text-xs text-gray-400">
                        Token ID: {tokenId}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
