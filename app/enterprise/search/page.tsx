'use client'

import { KnowledgeGraph } from '@/components/knowledge-graph'
import { useState } from 'react'
import { EnterpriseNavigation } from '@/components/enterprise-navigation'

export default function EnterpriseSearchPage() {
  const [selectedNode, setSelectedNode] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <EnterpriseNavigation />
      <div className="h-[calc(100vh-80px)] w-full bg-[#0D1117] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-800 bg-[#161b22] px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            Knowledge Graph - Agent Network
          </h1>
          <p className="text-gray-400 mt-1">
            Explore multi-agent collaboration networks and knowledge
            associations
          </p>
        </div>

        {/* Knowledge Graph Canvas */}
        <div className="h-[calc(100%-88px)] relative">
          <KnowledgeGraph
            onNodeSelect={setSelectedNode}
            selectedNode={selectedNode}
          />
        </div>
      </div>
    </div>
  )
}
