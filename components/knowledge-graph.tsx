'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as d3 from 'd3'
import { NodeDrawer } from '@/components/node-drawer'

export interface GraphNode {
  id: string
  label: string
  type: 'agent' | 'knowledge' | 'tool' | 'data'
  x?: number
  y?: number
  fx?: number | undefined
  fy?: number | undefined
  detail: string
  tags: string[]
  nfts: Array<{
    id: string
    name: string
    image: string
    rarity: string
  }>
}

export interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
  relationship: string
}

interface KnowledgeGraphProps {
  onNodeSelect: (node: GraphNode | null) => void
  selectedNode: GraphNode | null
}

// Mock data
const mockNodes: GraphNode[] = [
  {
    id: '1',
    label: 'AI Assistant Agent',
    type: 'agent',
    detail:
      'Intelligent assistant agent responsible for handling user queries and task allocation, with natural language understanding and multi-turn dialogue capabilities.',
    tags: ['NLP', 'Dialogue System', 'Task Scheduling'],
    nfts: [
      {
        id: 'n1',
        name: 'Agent Core NFT',
        image: '/api/placeholder/64/64',
        rarity: 'Epic'
      },
      {
        id: 'n2',
        name: 'Skill Token',
        image: '/api/placeholder/64/64',
        rarity: 'Rare'
      }
    ]
  },
  {
    id: '2',
    label: 'Knowledge Base',
    type: 'knowledge',
    detail:
      'Enterprise knowledge base containing product documentation, technical specifications, business processes and other structured and unstructured knowledge.',
    tags: ['Knowledge Management', 'Documentation', 'Search'],
    nfts: [
      {
        id: 'n3',
        name: 'Knowledge Gem',
        image: '/api/placeholder/64/64',
        rarity: 'Legendary'
      }
    ]
  },
  {
    id: '3',
    label: 'Data Analytics Tool',
    type: 'tool',
    detail:
      'Data analysis tool providing real-time data processing, visualization chart generation and statistical analysis functions.',
    tags: ['Data Analysis', 'Visualization', 'Statistics'],
    nfts: [
      {
        id: 'n4',
        name: 'Analytics Badge',
        image: '/api/placeholder/64/64',
        rarity: 'Common'
      }
    ]
  },
  {
    id: '4',
    label: 'User Profile Data',
    type: 'data',
    detail:
      'User profile dataset containing multi-dimensional information including user behavior, preferences, and interaction history.',
    tags: ['User Profiles', 'Behavior Analysis', 'Personalization'],
    nfts: []
  },
  {
    id: '5',
    label: 'Security Agent',
    type: 'agent',
    detail:
      'Security monitoring agent for real-time anomaly detection, threat identification and automated response handling.',
    tags: ['Security Monitoring', 'Threat Detection', 'Auto Response'],
    nfts: [
      {
        id: 'n5',
        name: 'Security Shield',
        image: '/api/placeholder/64/64',
        rarity: 'Epic'
      }
    ]
  },
  {
    id: '6',
    label: 'Workflow Engine',
    type: 'tool',
    detail:
      'Workflow engine supporting complex business process orchestration, automated execution and status monitoring.',
    tags: ['Workflow', 'Automation', 'Process Management'],
    nfts: [
      {
        id: 'n6',
        name: 'Flow Token',
        image: '/api/placeholder/64/64',
        rarity: 'Rare'
      }
    ]
  }
]

const mockLinks: GraphLink[] = [
  { source: '1', target: '2', relationship: 'queries' },
  { source: '1', target: '3', relationship: 'uses' },
  { source: '1', target: '4', relationship: 'accesses' },
  { source: '2', target: '4', relationship: 'contains' },
  { source: '3', target: '4', relationship: 'analyzes' },
  { source: '5', target: '1', relationship: 'monitors' },
  { source: '5', target: '4', relationship: 'protects' },
  { source: '6', target: '1', relationship: 'orchestrates' },
  { source: '6', target: '3', relationship: 'triggers' }
]

// Node type color mapping
const nodeColors = {
  agent: '#00D9FF', // Cyan - Agent
  knowledge: '#FFB800', // Orange - Knowledge
  tool: '#00FF88', // Green - Tool
  data: '#FF6B6B' // Red - Data
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  onNodeSelect,
  selectedNode
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null)

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      onNodeSelect(node)
    },
    [onNodeSelect]
  )

  const handleNodeHover = useCallback(
    (node: GraphNode | null, event?: MouseEvent) => {
      setHoveredNode(node)
      if (event) {
        setMousePosition({ x: event.clientX, y: event.clientY })
      }
    },
    []
  )

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Clear previous content
    svg.selectAll('*').remove()

    // Create zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Create container group
    const container = svg.append('g')

    // Create force-directed simulation
    const simulation = d3
      .forceSimulation<GraphNode>(mockNodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(mockLinks)
          .id((d) => d.id)
          .distance(150)
      )
      .force('charge', d3.forceManyBody().strength(-800))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40))

    simulationRef.current = simulation

    // Create links
    const links = container
      .append('g')
      .selectAll('line')
      .data(mockLinks)
      .join('line')
      .attr('stroke', '#30363d')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6)

    // Create node groups
    const nodes = container
      .append('g')
      .selectAll('g')
      .data(mockNodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(
        d3
          .drag<any, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on('drag', (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = undefined
            d.fy = undefined
          })
      )

    // Node circles
    nodes
      .append('circle')
      .attr('r', 25)
      .attr('fill', (d) => nodeColors[d.type])
      .attr('stroke', (d) => nodeColors[d.type])
      .attr('stroke-width', 3)
      .attr('fill-opacity', 0.8)
      .on('mouseenter', (event, d) => {
        handleNodeHover(d, event)
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', 30)
          .attr('fill-opacity', 1)
      })
      .on('mouseleave', (event, d) => {
        handleNodeHover(null)
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', 25)
          .attr('fill-opacity', 0.8)
      })
      .on('click', (event, d) => {
        event.stopPropagation()
        handleNodeClick(d)
      })

    // Node labels
    nodes
      .append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', 40)
      .attr('fill', '#ffffff')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 0 3px rgba(0,0,0,0.8)')

    // Node type icons
    nodes
      .append('text')
      .text((d) => {
        switch (d.type) {
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
      })
      .attr('text-anchor', 'middle')
      .attr('dy', 6)
      .attr('font-size', '16px')
      .style('pointer-events', 'none')

    // Simulation update
    simulation.on('tick', () => {
      links
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      nodes.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })

    // Cleanup function
    return () => {
      simulation.stop()
    }
  }, [handleNodeClick, handleNodeHover])

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full bg-[#0D1117]"
        style={{ cursor: 'grab' }}
      />

      {/* Tooltip */}
      {hoveredNode && (
        <div
          className="fixed z-10 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg border border-gray-700 pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="font-semibold">{hoveredNode.label}</div>
          <div className="text-gray-400 text-xs mt-1">
            Type: {hoveredNode.type} | Click to view details
          </div>
        </div>
      )}

      {/* Node Detail Drawer */}
      <NodeDrawer node={selectedNode} onClose={() => onNodeSelect(null)} />
    </div>
  )
}
