'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useAbstraxionClient
} from '@burnt-labs/abstraxion'
import { StdFee } from '@cosmjs/amino'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'

const contractAddress =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  'xion1ds0u7pgc7g2qdscf2ak56ca0xxuywxwqa5e42nsee520jsuk3m7sw2tvg7'

const PRIV_HEX =
  '91d1dda5fb6449948afd7f282d9f61a7000abd0dac677ce3e7a25c4a8064b878'
const RPC = 'https://rpc.xion-testnet-2.burnt.com:443'

async function getOwnerClient() {
  const wallet = await DirectSecp256k1Wallet.fromKey(
    Buffer.from(PRIV_HEX, 'hex'),
    'xion'
  )
  const [acct] = await wallet.getAccounts()
  const client = await SigningCosmWasmClient.connectWithSigner(RPC, wallet)
  return { client, ownerAddr: acct.address }
}

export default function MintWorkNFT() {
  const { data: account, login } = useAbstraxionAccount()
  const { client } = useAbstraxionSigningClient()
  const { client: queryClient } = useAbstraxionClient()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mintResult, setMintResult] = useState<string>('')
  const [receiver, setReceiver] = useState<string>('')
  const [tokenId, setTokenId] = useState<string>('')
  const [tokenUri, setTokenUri] = useState<string>('')

  const mintNFT = async () => {
    setLoading(true)
    setMintResult('')
    try {
      if (!tokenId || !tokenUri)
        throw new Error('Please fill in token_id and token_uri')

      // 1. Get owner wallet signer / address
      const { client: ownerClient, ownerAddr } = await getOwnerClient()

      // 2. Assemble execution message
      const msg = {
        mint: {
          token_id: tokenId,
          owner: receiver || ownerAddr, // Receiver, leave empty to send to self
          token_uri: tokenUri
        }
      }

      // 3. Set fee rate
      const fee: StdFee = {
        amount: [{ denom: 'uxion', amount: '6000' }], // 0.006 XION
        gas: '500000'
      }

      // 4. Execute by ownerAddr
      const res = await ownerClient.execute(
        ownerAddr,
        contractAddress,
        msg,
        fee
      )
      setMintResult(
        `NFT minted successfully! Transaction hash: ${res.transactionHash}`
      )
    } catch (error: any) {
      setMintResult(`Minting failed: ${error.message || error.toString()}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Mint Work NFT
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 border-gray-700/50 backdrop-blur-sm text-white">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Mint NFT
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Mint Work Experience NFT
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Receiver Wallet Address (Optional, leave empty to send to self)
            </label>
            <Input
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="xion1..."
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Token ID (Unique)
            </label>
            <Input
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="token_id"
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Token URI (IPFS Link)
            </label>
            <Input
              value={tokenUri}
              onChange={(e) => setTokenUri(e.target.value)}
              placeholder="ipfs://..."
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Status Display */}
          {mintResult && (
            <div className="p-4 rounded-lg border border-gray-600/50 bg-gray-800/30 text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="text-sm whitespace-pre-wrap break-all max-h-32 overflow-y-auto block">
                  {mintResult}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={mintNFT}
              disabled={loading || !tokenId || !tokenUri}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md transition-all duration-300"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Minting...' : 'Mint NFT'}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
