'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  Image,
  Download,
  ExternalLink,
  AlertCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

export function IPFSReader() {
  const [ipfsUrl, setIpfsUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [contentType, setContentType] = useState<string>('')
  const [content, setContent] = useState<any>(null)
  const [error, setError] = useState('')

  // Display IPFS content
  const readIPFSContent = async () => {
    if (!ipfsUrl.trim()) {
      setError('Please enter an IPFS URL')
      return
    }

    if (!ipfsUrl.startsWith('ipfs://')) {
      setError('URL must start with ipfs://')
      return
    }

    setLoading(true)
    setError('')
    setContent(null)
    setContentType('')

    try {
      const httpUrl = ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/')
      const response = await fetch(httpUrl)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const responseContentType = response.headers.get('content-type') || ''

      if (responseContentType.includes('image/')) {
        setContentType('image')
        setContent(httpUrl)
      } else if (
        responseContentType.includes('application/json') ||
        responseContentType.includes('text/plain')
      ) {
        const text = await response.text()
        try {
          const jsonData = JSON.parse(text)
          setContentType('json')
          setContent(jsonData)
        } catch {
          setContentType('text')
          setContent(text)
        }
      } else {
        const text = await response.text()
        setContentType('text')
        setContent(text)
      }
    } catch (error: any) {
      setError(`Failed to fetch content: ${error.message}`)
      setContentType('error')
    }
    setLoading(false)
  }

  const getContentIcon = () => {
    switch (contentType) {
      case 'image':
        return <Image className="w-4 h-4" />
      case 'json':
      case 'text':
        return <FileText className="w-4 h-4" />
      case 'error':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getContentBadge = () => {
    switch (contentType) {
      case 'image':
        return (
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            Image
          </Badge>
        )
      case 'json':
        return (
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            JSON
          </Badge>
        )
      case 'text':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            Text
          </Badge>
        )
      case 'error':
        return (
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
            Error
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-purple-400" />
          <CardTitle className="text-white">IPFS Content Reader</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="ipfs://..."
            value={ipfsUrl}
            onChange={(e) => setIpfsUrl(e.target.value)}
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
          <Button
            onClick={readIPFSContent}
            disabled={loading || !ipfsUrl.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Reading...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Read</span>
              </div>
            )}
          </Button>
        </div>

        <div className="text-xs text-gray-400">
          Enter any IPFS address to preview its content
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 bg-red-900/20 p-3 rounded border border-red-500/20"
          >
            {error}
          </motion.div>
        )}

        {content && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getContentIcon()}
                <h3 className="text-white font-semibold">Content Preview</h3>
              </div>
              {getContentBadge()}
            </div>

            {contentType === 'image' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="max-w-full max-h-80 overflow-hidden rounded border border-gray-700">
                  <img
                    src={content}
                    alt="IPFS content"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      setError('Failed to load image')
                      setContentType('error')
                    }}
                  />
                </div>
                <Button
                  onClick={() => window.open(content, '_blank')}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Button>
              </div>
            )}

            {contentType === 'json' && (
              <div className="space-y-2">
                <pre className="text-gray-200 bg-gray-800 p-3 rounded overflow-x-auto text-sm max-h-64 overflow-y-auto border border-gray-700">
                  {JSON.stringify(content, null, 2)}
                </pre>
                <div className="text-sm text-gray-400">
                  JSON format, {Object.keys(content).length} fields
                </div>
              </div>
            )}

            {contentType === 'text' && (
              <div className="space-y-2">
                <pre className="text-gray-200 bg-gray-800 p-3 rounded overflow-x-auto text-sm max-h-64 overflow-y-auto whitespace-pre-wrap border border-gray-700">
                  {content}
                </pre>
                <div className="text-sm text-gray-400">
                  Text content, {content.length} characters
                </div>
              </div>
            )}

            {contentType === 'error' && (
              <div className="text-red-400 bg-red-900/20 p-3 rounded border border-red-500/20">
                {content}
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
