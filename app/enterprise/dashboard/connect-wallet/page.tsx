'use client'
import { AbstraxionConnectButton } from '@/components/abstraxion-connect-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function ConnectWalletPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-800/50 border border-white/10 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white font-bold">
              钱包连接中心
            </CardTitle>
            <CardDescription className="text-gray-400">
              使用 Abstraxion 钱包安全连接您的账户
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                钱包连接组件演示
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                这个页面展示了 Abstraxion 钱包连接组件的功能
              </p>
            </div>

            <AbstraxionConnectButton
              className="w-full"
              connectText="连接 Abstraxion 钱包"
              disconnectText="断开钱包连接"
            />

            <div className="text-center">
              <p className="text-xs text-gray-500 mt-4">
                该组件已集成到导航栏中，可在整个应用中使用
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
