'use client'
import { useState, useRef } from 'react'
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useAbstraxionClient
} from '@burnt-labs/abstraxion'
import { Button } from '@burnt-labs/ui'
import '@burnt-labs/ui/dist/index.css'
import { StdFee } from '@cosmjs/amino'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing'

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
  const [acct] = await wallet.getAccounts() // ownerAddr
  const client = await SigningCosmWasmClient.connectWithSigner(RPC, wallet)
  return { client, ownerAddr: acct.address }
}

export default function MintNFTPage() {
  const { data: account, login } = useAbstraxionAccount()
  const { client: queryClient } = useAbstraxionClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [mintResult, setMintResult] = useState<string>('')
  const [queryResult, setQueryResult] = useState<string>('')
  const [owner, setOwner] = useState<string>('')
  const [receiver, setReceiver] = useState<string>('')
  const [tokenId, setTokenId] = useState<string>('')
  const [tokenUri, setTokenUri] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [uploadResult, setUploadResult] = useState<string>('')
  const [uploadedIpfsUrl, setUploadedIpfsUrl] = useState<string>('')
  const [ipfsReadUrl, setIpfsReadUrl] = useState('')
  const [ipfsContentLoading, setIpfsContentLoading] = useState(false)
  const [ipfsContentType, setIpfsContentType] = useState<string>('')
  const [ipfsContent, setIpfsContent] = useState<string | object | null>(null)
  const [queryTokenId, setQueryTokenId] = useState<string>('')
  const [tokenInfo, setTokenInfo] = useState<any>(null)
  const [ipfsImgUrl, setIpfsImgUrl] = useState<string>('')
  const [manualIpfsUrl, setManualIpfsUrl] = useState<string>('')

  // Upload file to IPFS (Pinata)
  const uploadToIPFS = async (file: File) => {
    setLoading(true)
    setUploadResult('')
    setUploadedIpfsUrl('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4NjgwZDhiYy03MmJlLTQwM2ItODhjMi1jM2M3NDk1Y2ViOTQiLCJlbWFpbCI6InpicjAxMDUyMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYmQ1NDIxZGNjMmVlNGM1OWM3MDEiLCJzY29wZWRLZXlTZWNyZXQiOiI0YmUzYWVkZTkyNTA4ZGY5N2I2ODhmNzA3NzAxMWM5NGQwYTk2ZDZjNmZmZmJhYzVmOGYxZDQxMGIxOGMxZWYyIiwiZXhwIjoxNzg1MDUwOTM4fQ.W8sTE4Ycdpw12jRycamBMxcjM7y-1kSTT8fzsMiE2Zc'
          },
          body: formData
        }
      )
      if (!res.ok) {
        const err = await res.text()
        throw new Error(err)
      }
      const data = await res.json()
      const ipfsUrl = `ipfs://${data.IpfsHash}`
      setUploadedIpfsUrl(ipfsUrl)
      setUploadResult(`Upload successful! IPFS address: ${ipfsUrl}`)
      setTokenUri(ipfsUrl)
    } catch (error: any) {
      setUploadResult('Upload failed: ' + (error.message || error.toString()))
    }
    setLoading(false)
  }

  // mintNFT
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
          owner: receiver || ownerAddr, // Receiver
          token_uri: tokenUri
        }
      }

      // 3. Set fee rate (never write payer / granter)
      const fee: StdFee = {
        amount: [{ denom: 'uxion', amount: '6000' }], // 0.006 XION
        gas: '230000'
      }

      // 4. Execute by ownerAddr
      const res = await ownerClient.execute(
        ownerAddr,
        contractAddress,
        msg,
        fee
      )

      setMintResult(`Mint successful! TxHash: ${res.transactionHash}`)
    } catch (e: any) {
      setMintResult('Mint failed: ' + (e.message || e.toString()))
    }
    setLoading(false)
  }

  // 查询NFT
  const queryNFTs = async () => {
    setLoading(true)
    setQueryResult('')
    try {
      if (!queryClient) throw new Error('query client 未初始化')
      if (!owner) throw new Error('请填写钱包地址')
      const res = await queryClient.queryContractSmart(contractAddress, {
        tokens: { owner }
      })
      setQueryResult(JSON.stringify(res.tokens || [], null, 2))
    } catch (e: any) {
      setQueryResult('查询失败: ' + (e.message || e.toString()))
    }
    setLoading(false)
  }

  // 查询单个token_id的token_uri
  const queryTokenInfo = async () => {
    setLoading(true)
    setTokenInfo(null)
    setIpfsImgUrl('')
    try {
      if (!queryClient) throw new Error('query client 未初始化')
      if (!queryTokenId) throw new Error('请填写 token_id')
      const res = await queryClient.queryContractSmart(contractAddress, {
        nft_info: { token_id: queryTokenId }
      })
      setTokenInfo(res)
      // 处理ipfs图片
      if (res?.token_uri && res.token_uri.startsWith('ipfs://')) {
        // 用ipfs.io公共网关访问
        setIpfsImgUrl(res.token_uri.replace('ipfs://', 'https://ipfs.io/ipfs/'))
      }
    } catch (e: any) {
      setTokenInfo({ error: e.message || e.toString() })
    }
    setLoading(false)
  }

  // 手动设置IPFS地址
  const setManualIpfs = () => {
    if (manualIpfsUrl) {
      setTokenUri(manualIpfsUrl)
      setUploadResult(`已手动设置IPFS地址: ${manualIpfsUrl}`)
    }
  }

  // 处理文件选择
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadToIPFS(file)
    }
  }

  // 触发文件选择
  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  // 显示IPFS内容
  const displayIpfsContent = async (ipfsUrl: string) => {
    console.log('displayIpfsContent called, ipfsUrl:', ipfsUrl)
    setIpfsContentLoading(true)
    setIpfsContent(null)
    setIpfsContentType('')
    try {
      const httpUrl = ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/')
      console.log('正在获取IPFS内容:', httpUrl)
      const response = await fetch(httpUrl)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const contentType = response.headers.get('content-type') || ''
      console.log('内容类型:', contentType)
      if (contentType.includes('image/')) {
        setIpfsContentType('image')
        setIpfsContent(httpUrl)
      } else if (
        contentType.includes('application/json') ||
        contentType.includes('text/plain')
      ) {
        const text = await response.text()
        try {
          const jsonData = JSON.parse(text)
          setIpfsContentType('json')
          setIpfsContent(jsonData)
        } catch {
          setIpfsContentType('text')
          setIpfsContent(text)
        }
      } else {
        const text = await response.text()
        setIpfsContentType('text')
        setIpfsContent(text)
      }
    } catch (error: any) {
      setIpfsContentType('error')
      setIpfsContent(`获取内容失败: ${error.message}`)
      console.error('获取IPFS内容失败:', error)
    }
    setIpfsContentLoading(false)
  }

  // 读取任意IPFS地址内容
  const handleReadIpfs = () => {
    console.log('handleReadIpfs called, ipfsReadUrl:', ipfsReadUrl)
    if (ipfsReadUrl) {
      displayIpfsContent(ipfsReadUrl)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <h1 className="text-2xl text-white mb-6 font-bold">
        Mint NFT & 查询NFT (cw721)
      </h1>
      {/* 钱包连接按钮 */}
      <Button
        onClick={async () => {
          if (!account?.bech32Address) await login()
        }}
        className="mb-6"
      >
        {account?.bech32Address ? account.bech32Address : '连接钱包'}
      </Button>

      {/* Mint NFT */}
      <div className="bg-gray-800 p-6 rounded mb-8 w-full max-w-xl flex flex-col gap-2">
        <h2 className="text-white font-bold mb-2">Mint NFT</h2>
        <input
          type="text"
          placeholder="接收者钱包地址（可选，留空则发给自己）"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white mb-2"
        />
        <input
          type="text"
          placeholder="token_id (唯一)"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white mb-2"
        />
        <input
          type="text"
          placeholder="token_uri (IPFS链接)"
          value={tokenUri}
          onChange={(e) => setTokenUri(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white mb-2"
        />
        <Button
          onClick={mintNFT}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? '铸造中...' : 'Mint NFT'}
        </Button>
        {mintResult && (
          <div className="text-gray-200 mt-2 whitespace-pre-wrap break-all bg-gray-900 p-3 rounded max-h-32 overflow-y-auto">
            {mintResult}
          </div>
        )}
      </div>

      {/* 查询NFT */}
      <div className="bg-gray-800 p-6 rounded w-full max-w-xl flex flex-col gap-2">
        <h2 className="text-white font-bold mb-2">查询某地址拥有的NFT</h2>
        <input
          type="text"
          placeholder="钱包地址 (xion1...)"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white mb-2"
        />
        <Button
          onClick={queryNFTs}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? '查询中...' : '查询NFT'}
        </Button>
        {queryResult && (
          <pre className="text-gray-200 mt-2 bg-gray-900 p-3 rounded max-h-32 overflow-y-auto break-all">
            {queryResult}
          </pre>
        )}
      </div>

      {/* 读取任意IPFS内容 */}
      <div className="bg-gray-800 p-6 rounded w-full max-w-xl flex flex-col gap-2 mt-8">
        <h2 className="text-white font-bold mb-2">读取任意IPFS内容</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="ipfs://..."
            value={ipfsReadUrl}
            onChange={(e) => setIpfsReadUrl(e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <Button
            onClick={() => handleReadIpfs()}
            disabled={!ipfsReadUrl}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            读取
          </Button>
        </div>
        <div className="text-gray-400 text-xs">
          输入任意ipfs://地址，点击读取即可预览内容
        </div>
      </div>

      {/* IPFS内容显示（全局唯一，始终渲染在页面底部） */}
      {(ipfsContentLoading || ipfsContent) && (
        <div className="mt-8 bg-gray-900 p-4 rounded w-full max-w-xl">
          <h3 className="text-white font-semibold mb-3">IPFS内容预览</h3>
          {ipfsContentLoading && (
            <div className="text-gray-300">正在加载IPFS内容...</div>
          )}
          {!ipfsContentLoading && ipfsContentType === 'image' && (
            <div className="flex flex-col items-center">
              <img
                src={typeof ipfsContent === 'string' ? ipfsContent : ''}
                alt="IPFS图片"
                className="max-w-full max-h-96 rounded border border-gray-700"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  setIpfsContentType('error')
                  setIpfsContent('图片加载失败')
                }}
              />
              <a
                href={typeof ipfsContent === 'string' ? ipfsContent : ''}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-2"
              >
                在新窗口打开
              </a>
            </div>
          )}
          {!ipfsContentLoading && ipfsContentType === 'json' && (
            <div>
              <pre className="text-gray-200 bg-gray-800 p-3 rounded overflow-x-auto text-sm">
                {JSON.stringify(ipfsContent, null, 2)}
              </pre>
              <div className="mt-2 text-sm text-gray-400">
                JSON格式，共 {ipfsContent && typeof ipfsContent === 'object' ? Object.keys(ipfsContent).length : 0} 个字段
              </div>
            </div>
          )}
          {!ipfsContentLoading && ipfsContentType === 'text' && (
            <div>
              <pre className="text-gray-200 bg-gray-800 p-3 rounded overflow-x-auto text-sm whitespace-pre-wrap">
                {typeof ipfsContent === 'string' ? ipfsContent : ''}
              </pre>
              <div className="mt-2 text-sm text-gray-400">
                文本内容，共 {typeof ipfsContent === 'string' ? ipfsContent.length : 0} 个字符
              </div>
            </div>
          )}
          {!ipfsContentLoading && ipfsContentType === 'error' && (
            <div className="text-red-400 bg-red-900/20 p-3 rounded">
              {typeof ipfsContent === 'string' ? ipfsContent : 'Unknown error'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/*
MINT_MSG='{
  "mint": {
    "token_id": "nftttttttttt",
    "owner": "xion1avvd2wayj4867ghw49dswa45a7rrnts5fejm9cyqnzqmfma30yhs2sgp8h",
    "token_uri": "ipfs://bafkreiar3k5vy66vwe3xlmaoeeyypixtcfzyuxa4qcadpwqixvv4lapm3i",
    "extension": null
  }
}'

xiond tx wasm execute xion1ds0u7pgc7g2qdscf2ak56ca0xxuywxwqa5e42nsee520jsuk3m7sw2tvg7 "$MINT_MSG" \
  --from  xion1avvd2wayj4867ghw49dswa45a7rrnts5fejm9cyqnzqmfma30yhs2sgp8h\
  --gas auto \
  --gas-adjustment 1.3 \
  --gas-prices 0.025uxion \
  --chain-id xion-testnet-2 \
  --node https://rpc.xion-testnet-2.burnt.com:443 \
  -y
  */
