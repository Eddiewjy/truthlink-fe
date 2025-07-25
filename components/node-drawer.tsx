'use client'

import React, { useState } from 'react'
import { X, MessageCircle, Eye, Edit } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraphNode } from './knowledge-graph'
import { ChatDialog } from './chat-dialog'
import { AgentProcessVisualization } from './agent-process-visualization'

interface NodeDrawerProps {
  node: GraphNode | null
  onClose: () => void
}

// Node type icon mapping
const getNodeIcon = (type: string) => {
  switch (type) {
    case 'agent':
      return '🤖'
    case 'knowledge':
      return '📚'
    case 'tool':
      return '🔧'
    case 'data':
      return '💾'
    default:
      return '⭕'
  }
}

// Node type color mapping
const getNodeColor = (type: string) => {
  switch (type) {
    case 'agent':
      return 'bg-cyan-500'
    case 'knowledge':
      return 'bg-amber-500'
    case 'tool':
      return 'bg-emerald-500'
    case 'data':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

// NFT rarity color mapping
const getRarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'common':
      return 'bg-gray-500'
    case 'rare':
      return 'bg-blue-500'
    case 'epic':
      return 'bg-purple-500'
    case 'legendary':
      return 'bg-yellow-500'
    default:
      return 'bg-gray-500'
  }
}

export const NodeDrawer: React.FC<NodeDrawerProps> = ({ node, onClose }) => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isProcessVisible, setIsProcessVisible] = useState(false)

  if (!node) return null

  const isAgent = node.type === 'agent'

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="fixed right-0 top-0 h-full w-96 bg-[#161b22] border-l border-gray-700 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-full ${getNodeColor(
                node.type
              )} flex items-center justify-center text-2xl`}
            >
              {getNodeIcon(node.type)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{node.label}</h2>
              <p className="text-sm text-gray-400 capitalize">{node.type}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 space-y-6 overflow-y-auto h-full pb-20">
          {/* Tags */}
          {node.tags && node.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {node.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-700 text-gray-200 hover:bg-gray-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Detailed description */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Details
            </h3>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <p className="text-gray-200 text-sm leading-relaxed">
                  {node.detail}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* NFT List */}
          {node.nfts && node.nfts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                Related NFTs ({node.nfts.length})
              </h3>
              <div className="space-y-3">
                {node.nfts.map((nft) => (
                  <Card
                    key={nft.id}
                    className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                            💎
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium truncate">
                            {nft.name}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              className={`${getRarityColor(
                                nft.rarity
                              )} text-white text-xs`}
                            >
                              {nft.rarity}
                            </Badge>
                            <span className="text-gray-400 text-xs">
                              #{nft.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {(!node.nfts || node.nfts.length === 0) && (
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                Related NFTs
              </h3>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-3">📦</div>
                  <p className="text-gray-400 text-sm">No related NFTs</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-700">
            {isAgent && (
              <>
                <Button
                  onClick={() => setIsChatOpen(true)}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start Chat</span>
                </Button>
                <Button
                  onClick={() => setIsProcessVisible(true)}
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-700 flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Process</span>
                </Button>
              </>
            )}
            <Button
              variant="outline"
              className="w-full border-gray-600 text-white hover:bg-gray-700 flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-600 text-white hover:bg-gray-700 flex items-center justify-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Node</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Dialog */}
      {isAgent && (
        <ChatDialog
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          agentName={node.label}
          agentType={node.type}
        />
      )}

      {/* Agent Process Visualization */}
      {isAgent && (
        <AgentProcessVisualization
          isVisible={isProcessVisible}
          agentName={node.label}
          processType="interview-check"
          onClose={() => setIsProcessVisible(false)}
        />
      )}
    </>
  )
}
