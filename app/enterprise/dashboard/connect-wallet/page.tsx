"use client"
import { useState } from "react"
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion"
import { Button } from "@burnt-labs/ui"
import "@burnt-labs/ui/dist/index.css"

export default function ConnectWalletPage() {
  const { data: account, login } = useAbstraxionAccount()
  const { logout } = useAbstraxionSigningClient()
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <h1 className="text-2xl text-white mb-6 font-bold">Abstraxion 钱包连接演示</h1>
      <div className="flex flex-col gap-4 items-center">
        <Button
          onClick={async () => {
            setLoading(true)
            try {
              if (!account?.bech32Address) {
                await login()
              }
            } finally {
              setLoading(false)
            }
          }}
          disabled={loading}
        >
          {account?.bech32Address ? `已连接: ${account.bech32Address.slice(0, 10)}...${account.bech32Address.slice(-6)}` : "连接钱包"}
        </Button>
        {account?.bech32Address && (
          <Button
            onClick={async () => {
              setLoading(true)
              try {
                await logout?.()
              } finally {
                setLoading(false)
              }
            }}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            断开钱包
          </Button>
        )}
      </div>
    </div>
  )
} 