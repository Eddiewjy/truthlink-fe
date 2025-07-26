'use client'
import { useState } from 'react'
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient
} from '@burnt-labs/abstraxion'
import { Button } from '@/components/ui/button'
import '@burnt-labs/ui/dist/index.css'

interface AbstraxionConnectButtonProps {
  className?: string
  showBalance?: boolean
  connectText?: string
  disconnectText?: string
}

export function AbstraxionConnectButton({
  className = '',
  showBalance = false,
  connectText = 'Connect Abstraxion Wallet',
  disconnectText = 'Disconnect Abstraxion Wallet'
}: AbstraxionConnectButtonProps) {
  const { data: account, login } = useAbstraxionAccount()
  const { logout } = useAbstraxionSigningClient()
  const [loading, setLoading] = useState(false)

  const handleConnect = async () => {
    setLoading(true)
    try {
      if (!account?.bech32Address) {
        await login()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setLoading(true)
    try {
      await logout?.()
    } finally {
      setLoading(false)
    }
  }

  if (account?.bech32Address) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="text-sm text-white/80">
          {`${account.bech32Address.slice(
            0,
            6
          )}...${account.bech32Address.slice(-4)}`}
        </div>
        <Button
          onClick={handleDisconnect}
          disabled={loading}
          variant="outline"
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
        >
          {loading ? '断开中...' : disconnectText}
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={loading}
      className={`bg-blue-600 hover:bg-blue-700 text-white ${className}`}
    >
      {loading ? 'Connecting...' : connectText}
    </Button>
  )
}

// 兼容rainbowkit的ConnectButton接口的包装组件
export function ConnectButton() {
  return <AbstraxionConnectButton />
}
