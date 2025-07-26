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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Search,
  Wallet,
  ExternalLink,
  Award,
  Eye,
  FileText,
  Image
} from 'lucide-react'
import { motion } from 'framer-motion'

const contractAddress =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  'xion1ds0u7pgc7g2qdscf2ak56ca0xxuywxwqa5e42nsee520jsuk3m7sw2tvg7'

interface NFTDetail {
  token_id: string
  token_uri?: string
  owner?: string
  extension?: any
}

interface IPFSContent {
  type: string
  content: any
  loading: boolean
}

interface NFTViewerProps {
  defaultWallet?: string
}

export function NFTViewer({ defaultWallet }: NFTViewerProps) {
  const { data: account } = useAbstraxionAccount()
  const { client: queryClient } = useAbstraxionClient()

  const [walletAddress, setWalletAddress] = useState(defaultWallet || '')
  const [nftList, setNftList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedNFT, setSelectedNFT] = useState<NFTDetail | null>(null)
  const [ipfsContent, setIpfsContent] = useState<IPFSContent>({
    type: '',
    content: null,
    loading: false
  })
  const [dialogOpen, setDialogOpen] = useState(false)

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

  // Query detailed NFT information
  const queryNFTDetail = async (tokenId: string) => {
    if (!queryClient) return

    try {
      const res = await queryClient.queryContractSmart(contractAddress, {
        nft_info: { token_id: tokenId }
      })
      setSelectedNFT({ token_id: tokenId, ...res })

      // If token_uri is available, try to fetch IPFS content
      if (res?.token_uri && res.token_uri.startsWith('ipfs://')) {
        await fetchIPFSContent(res.token_uri)
      } else {
        setIpfsContent({ type: '', content: null, loading: false })
      }

      setDialogOpen(true)
    } catch (e: any) {
      setSelectedNFT({
        token_id: tokenId,
        extension: { error: e.message || e.toString() }
      })
      setDialogOpen(true)
    }
  }

  // Fetch IPFS content
  const fetchIPFSContent = async (ipfsUrl: string) => {
    setIpfsContent({ type: '', content: null, loading: true })

    try {
      const httpUrl = ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/')
      const response = await fetch(httpUrl)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type') || ''

      if (contentType.includes('image/')) {
        setIpfsContent({ type: 'image', content: httpUrl, loading: false })
      } else if (
        contentType.includes('application/json') ||
        contentType.includes('text/plain')
      ) {
        const text = await response.text()
        try {
          const jsonData = JSON.parse(text)
          setIpfsContent({ type: 'json', content: jsonData, loading: false })
        } catch {
          setIpfsContent({ type: 'text', content: text, loading: false })
        }
      } else {
        const text = await response.text()
        setIpfsContent({ type: 'text', content: text, loading: false })
      }
    } catch (error: any) {
      setIpfsContent({
        type: 'error',
        content: `Failed to fetch: ${error.message}`,
        loading: false
      })
    }
  }

  const renderIPFSContent = () => {
    if (ipfsContent.loading) {
      return (
        <div className="flex items-center space-x-2 text-gray-300">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          <span>Loading IPFS content...</span>
        </div>
      )
    }

    switch (ipfsContent.type) {
      case 'image':
        return (
          <div className="space-y-2">
            <img
              src={ipfsContent.content}
              alt="NFT content"
              className="max-w-full max-h-64 rounded border border-gray-700"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <Button
              onClick={() => window.open(ipfsContent.content, '_blank')}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Original
            </Button>
          </div>
        )
      case 'json':
        return (
          <div className="space-y-2">
            <pre className="text-gray-200 bg-gray-800 p-3 rounded overflow-x-auto text-sm max-h-40 overflow-y-auto">
              {JSON.stringify(ipfsContent.content, null, 2)}
            </pre>
            <div className="text-sm text-gray-400">
              JSON format, {Object.keys(ipfsContent.content).length} fields
            </div>
          </div>
        )
      case 'text':
        return (
          <div className="space-y-2">
            <pre className="text-gray-200 bg-gray-800 p-3 rounded overflow-x-auto text-sm max-h-40 overflow-y-auto whitespace-pre-wrap">
              {ipfsContent.content}
            </pre>
            <div className="text-sm text-gray-400">
              Text content, {ipfsContent.content.length} characters
            </div>
          </div>
        )
      case 'error':
        return (
          <div className="text-red-400 bg-red-900/20 p-3 rounded">
            {ipfsContent.content}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-blue-400" />
            <CardTitle className="text-white">My NFTs</CardTitle>
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
                My Wallet
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
                <span>View My NFTs</span>
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
                <h3 className="text-white font-semibold">
                  Your NFT Collection
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-green-500/20 text-green-300 border-green-500/30"
                >
                  {nftList.length} NFTs
                </Badge>
              </div>
              <div className="grid gap-3 max-h-80 overflow-y-auto">
                {nftList.map((tokenId, index) => (
                  <motion.div
                    key={tokenId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-800/60 rounded-lg border border-gray-700/50 hover:bg-gray-700/60 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">NFT #{tokenId}</p>
                        <p className="text-sm text-gray-400">
                          Token ID: {tokenId}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => queryNFTDetail(tokenId)}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* NFT Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>NFT Details</span>
            </DialogTitle>
          </DialogHeader>

          {selectedNFT && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Token ID:</span>
                  <p className="text-white font-mono">{selectedNFT.token_id}</p>
                </div>
                {selectedNFT.token_uri && (
                  <div className="col-span-2">
                    <span className="text-gray-400">Token URI:</span>
                    <p className="text-blue-300 font-mono text-xs break-all">
                      {selectedNFT.token_uri}
                    </p>
                  </div>
                )}
              </div>

              {selectedNFT.token_uri && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {ipfsContent.type === 'image' && (
                      <Image className="w-4 h-4 text-green-400" />
                    )}
                    {(ipfsContent.type === 'json' ||
                      ipfsContent.type === 'text') && (
                      <FileText className="w-4 h-4 text-blue-400" />
                    )}
                    <h4 className="text-white font-semibold">IPFS Content</h4>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
                    {renderIPFSContent()}
                  </div>
                </div>
              )}

              {selectedNFT.extension?.error && (
                <div className="text-red-400 bg-red-900/20 p-3 rounded">
                  Error loading NFT details: {selectedNFT.extension.error}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
