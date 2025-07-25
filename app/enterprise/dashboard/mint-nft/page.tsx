"use client"
import { useState } from "react"
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useAbstraxionClient,
} from "@burnt-labs/abstraxion"
import { Button } from "@burnt-labs/ui"
import "@burnt-labs/ui/dist/index.css"
import { StdFee } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";


const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "xion1ds0u7pgc7g2qdscf2ak56ca0xxuywxwqa5e42nsee520jsuk3m7sw2tvg7"

const PRIV_HEX =
  "91d1dda5fb6449948afd7f282d9f61a7000abd0dac677ce3e7a25c4a8064b878";

const RPC = "https://rpc.xion-testnet-2.burnt.com:443"


async function getOwnerClient() {
  const wallet = await DirectSecp256k1Wallet.fromKey(
    Buffer.from(PRIV_HEX, "hex"),
    "xion"
  );
  const [acct] = await wallet.getAccounts();       // ownerAddr
  const client = await SigningCosmWasmClient.connectWithSigner(RPC, wallet);
  return { client, ownerAddr: acct.address };
}



export default function MintNFTPage() {
  const { data: account, login } = useAbstraxionAccount()
  const { client } = useAbstraxionSigningClient()
  const { client: queryClient } = useAbstraxionClient()

  const [mintResult, setMintResult] = useState<string>("")
  const [queryResult, setQueryResult] = useState<string>("")
  const [owner, setOwner] = useState<string>("")
  const [receiver, setReceiver] = useState<string>("")
  const [tokenId, setTokenId] = useState<string>("")
  const [tokenUri, setTokenUri] = useState<string>("")
  const [loading, setLoading] = useState(false)

  // mintNFT
  // mintNFT
  const mintNFT = async () => {
    setLoading(true)
    setMintResult("")
    try {
      if (!tokenId || !tokenUri)
        throw new Error("请填写 token_id 和 token_uri")

      // 1. 拿到 owner 钱包的 signer / 地址
      const { client: ownerClient, ownerAddr } = await getOwnerClient()

      // 2. 组装执行消息
      const msg = {
        mint: {
          token_id: tokenId,
          owner: receiver || ownerAddr, // 接收者
          token_uri: tokenUri,
        },
      }

      // 3. 设定费率（千万别写 payer / granter）
      const fee: StdFee = {
        amount: [{ denom: "uxion", amount: "6000" }], // 0.006 XION
        gas: "230000",
      }

      // 4. 由 ownerAddr 执行
      const res = await ownerClient.execute(
        ownerAddr,
        contractAddress,
        msg,
        fee
      )

      setMintResult(`Mint 成功！TxHash: ${res.transactionHash}`)
    } catch (e: any) {
      setMintResult("mint 失败: " + (e.message || e.toString()))
    }
    setLoading(false)
  }

  // 查询NFT
  const queryNFTs = async () => {
    setLoading(true)
    setQueryResult("")
    try {
      if (!queryClient) throw new Error("query client 未初始化")
      if (!owner) throw new Error("请填写钱包地址")
      const res = await queryClient.queryContractSmart(contractAddress, {
        tokens: { owner },
      })
      setQueryResult(JSON.stringify(res.tokens || [], null, 2))
    } catch (e: any) {
      setQueryResult("查询失败: " + (e.message || e.toString()))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <h1 className="text-2xl text-white mb-6 font-bold">Mint NFT & 查询NFT (cw721)</h1>
      {/* 钱包连接按钮 */}
      <Button
        onClick={async () => {
          if (!account?.bech32Address) await login()
        }}
        className="mb-6"
      >
        {account?.bech32Address ? account.bech32Address : "连接钱包"}
      </Button>

      {/* Mint NFT */}
      <div className="bg-gray-800 p-6 rounded mb-8 w-full max-w-xl flex flex-col gap-2">
        <h2 className="text-white font-bold mb-2">Mint NFT</h2>
        <input
          type="text"
          placeholder="接收者钱包地址（可选，留空则发给自己）"
          value={receiver}
          onChange={e => setReceiver(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white mb-2"
        />
        <input
          type="text"
          placeholder="token_id (唯一)"
          value={tokenId}
          onChange={e => setTokenId(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white mb-2"
        />
        <input
          type="text"
          placeholder="token_uri (IPFS链接)"
          value={tokenUri}
          onChange={e => setTokenUri(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white mb-2"
        />
        <Button onClick={mintNFT} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
          {loading ? "铸造中..." : "Mint NFT"}
        </Button>
        {mintResult && <div className="text-gray-200 mt-2 whitespace-pre-wrap">{mintResult}</div>}
      </div>

      {/* 查询NFT */}
      <div className="bg-gray-800 p-6 rounded w-full max-w-xl flex flex-col gap-2">
        <h2 className="text-white font-bold mb-2">查询某地址拥有的NFT</h2>
        <input
          type="text"
          placeholder="钱包地址 (xion1...)"
          value={owner}
          onChange={e => setOwner(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white mb-2"
        />
        <Button onClick={queryNFTs} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? "查询中..." : "查询NFT"}
        </Button>
        {queryResult && <pre className="text-gray-200 mt-2 bg-gray-900 p-2 rounded max-w-2xl overflow-x-auto">{queryResult}</pre>}
      </div>
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