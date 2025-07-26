'use client'

import { KnowledgeGraph, GraphNode } from '@/components/knowledge-graph'
import { useState } from 'react'
import { EnterpriseNavigation } from '@/components/enterprise-navigation'

export default function EnterpriseSearchPage() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <EnterpriseNavigation />
      <div className="h-[calc(100vh-80px)] w-full bg-[#0D1117] overflow-hidden">
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
