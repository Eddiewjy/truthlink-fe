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
    label: 'TrueLink CEO Agent',
    type: 'agent',
    detail:
      'TrueLink CEO Agent responsible for requirement confirmation, workload assessment, pricing, and work list generation. Coordinates A2A communication with other agents through JSON file mode.',
    tags: [
      'Requirement Confirmation',
      'Workload Assessment',
      'Pricing',
      'Work List Generation',
      'A2A Communication'
    ],
    nfts: [
      {
        id: 'n1',
        name: 'CEO Core NFT',
        image: '/api/placeholder/64/64',
        rarity: 'Legendary'
      },
      {
        id: 'n2',
        name: 'Leadership Token',
        image: '/api/placeholder/64/64',
        rarity: 'Epic'
      }
    ]
  },
  {
    id: '2',
    label: 'NFTMatch Agent',
    type: 'agent',
    detail:
      'NFTMatch Agent receives wallet addresses, fetches NFT data from XION blockchain, and generates JSON files containing NFT information for verification purposes.',
    tags: [
      'Wallet Address Processing',
      'XION Blockchain Integration',
      'NFT Data Fetching',
      'JSON File Generation'
    ],
    nfts: [
      {
        id: 'n3',
        name: 'NFT Matcher NFT',
        image: '/api/placeholder/64/64',
        rarity: 'Epic'
      }
    ]
  },
  {
    id: '3',
    label: 'Transfer Agent',
    type: 'agent',
    detail:
      'Transfer Agent converts Word documents and PDF files into structured JSON format for processing by other agents in the TrueLink system.',
    tags: [
      'Document Conversion',
      'Word Processing',
      'PDF Processing',
      'JSON Transformation'
    ],
    nfts: [
      {
        id: 'n4',
        name: 'Transfer Badge',
        image: '/api/placeholder/64/64',
        rarity: 'Rare'
      }
    ]
  },
  {
    id: '4',
    label: 'ResumeCheck Agent',
    type: 'agent',
    detail:
      'ResumeCheck Agent obtains NFT experience information and resume JSON files, compares content for fraud detection, and generates authenticity evaluation reports.',
    tags: [
      'NFT Experience Verification',
      'Resume Validation',
      'Fraud Detection',
      'Authenticity Evaluation'
    ],
    nfts: [
      {
        id: 'n5',
        name: 'Verification Shield',
        image: '/api/placeholder/64/64',
        rarity: 'Epic'
      }
    ]
  },
  {
    id: '5',
    label: 'InterviewCheck Agent',
    type: 'agent',
    detail:
      'InterviewCheck Agent processes job descriptions, interview record JSON files, and resume JSON files to generate comprehensive interview evaluations and assessments.',
    tags: [
      'Job Description Analysis',
      'Interview Record Processing',
      'Resume Analysis',
      'Interview Evaluation'
    ],
    nfts: [
      {
        id: 'n6',
        name: 'Interview Evaluator NFT',
        image: '/api/placeholder/64/64',
        rarity: 'Legendary'
      }
    ]
  },
  {
    id: '6',
    label: 'Audit Agent',
    type: 'agent',
    detail:
      'Audit Agent provides neutral review of all AI actions, audits the entire process, and determines whether users can successfully complete payment based on service quality.',
    tags: [
      'Neutral Review',
      'AI Action Auditing',
      'Process Validation',
      'Payment Authorization'
    ],
    nfts: [
      {
        id: 'n7',
        name: 'Audit Core',
        image: '/api/placeholder/64/64',
        rarity: 'Rare'
      }
    ]
  }
]

const mockLinks: GraphLink[] = [
  // TrueLink CEO Agent data transmission to key agents
  { source: '1', target: '2', relationship: 'sends_wallet_requirements' },
  { source: '1', target: '3', relationship: 'sends_documents' },
  { source: '1', target: '5', relationship: 'sends_interview_tasks' },

  // Other workflow connections
  { source: '1', target: '4', relationship: 'oversees' },
  { source: '1', target: '6', relationship: 'coordinates_audit' },

  // NFTMatch Agent data flow
  { source: '2', target: '4', relationship: 'provides_nft_data' },

  // Transfer Agent document processing
  { source: '3', target: '4', relationship: 'provides_resume_json' },
  { source: '3', target: '5', relationship: 'provides_documents' },

  // ResumeCheck Agent verification process
  { source: '4', target: '5', relationship: 'shares_validation' },
  { source: '4', target: '6', relationship: 'reports_to' },

  // InterviewCheck Agent evaluation
  { source: '5', target: '6', relationship: 'submits_evaluation' },

  // Audit Agent final review
  { source: '6', target: '1', relationship: 'reports_audit' }
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
          .distance((d) => {
            // Special longer distance for audit agent connections
            if (
              (d.source === '6' && d.target === '1') ||
              (d.source === '1' && d.target === '6') ||
              d.target === '6' ||
              d.source === '6'
            ) {
              return 400
            }
            return 300
          })
      )
      .force('charge', d3.forceManyBody().strength(-1200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collision',
        d3.forceCollide().radius((d: any) => {
          // CEO Agent needs more collision space
          return d.id === '1' ? 70 : 60
        })
      )

    simulationRef.current = simulation

    // Create arrow markers
    const defs = svg.append('defs')

    // CEO Agent arrow marker (special color)
    defs
      .append('marker')
      .attr('id', 'ceo-arrow')
      .attr('viewBox', '0 -3 8 6')
      .attr('refX', 20) // Adjust this value to change arrow distance from node
      .attr('refY', 0) // Adjust this value to change arrow vertical offset
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-3L8,0L0,3')
      .attr('fill', '#FFD700')
      .attr('stroke', '#FFD700')

    // Regular arrow marker
    defs
      .append('marker')
      .attr('id', 'regular-arrow')
      .attr('viewBox', '0 -3 8 6')
      .attr('refX', 30) // Adjust this value to change arrow distance from node
      .attr('refY', 0) // Adjust this value to change arrow vertical offset
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-3L8,0L0,3')
      .attr('fill', '#00FF88')
      .attr('stroke', '#00FF88')

    // Create links with different styles
    const links = container
      .append('g')
      .selectAll('line')
      .data(mockLinks)
      .join('line')
      .attr('stroke', (d) => {
        // CEO Agent outgoing links get special color
        if (d.source === '1' && ['2', '3', '5'].includes(d.target as string)) {
          return '#FFD700'
        }
        return '#00FF88'
      })
      .attr('stroke-width', (d) => {
        // CEO Agent outgoing links get thicker stroke
        if (d.source === '1' && ['2', '3', '5'].includes(d.target as string)) {
          return 3
        }
        // Special distance for audit agent
        if (
          (d.source === '6' && d.target === '1') ||
          (d.source === '1' && d.target === '6')
        ) {
          return 2
        }
        return 2
      })
      .attr('stroke-opacity', 0.8)
      .attr('marker-end', (d) => {
        // CEO Agent outgoing links get special arrow
        if (d.source === '1' && ['2', '3', '5'].includes(d.target as string)) {
          return 'url(#ceo-arrow)'
        }
        return 'url(#regular-arrow)'
      })

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
      .attr('r', (d) => {
        // CEO Agent gets larger radius
        return d.id === '1' ? 35 : 25
      })
      .attr('fill', (d) => {
        // Different colors for different agents
        switch (d.id) {
          case '1':
            return '#1a1a2e' // CEO - Dark navy background for better emoji contrast
          case '2':
            return '#FF6B6B' // NFTMatch - Red
          case '3':
            return '#4ECDC4' // Transfer - Teal
          case '4':
            return '#45B7D1' // ResumeCheck - Blue
          case '5':
            return '#96CEB4' // InterviewCheck - Green
          case '6':
            return '#FFEAA7' // Audit - Light Yellow
          default:
            return '#00D9FF'
        }
      })
      .attr('stroke', (d) => {
        // Matching stroke colors
        switch (d.id) {
          case '1':
            return '#FFD700' // CEO - Gold stroke for contrast
          case '2':
            return '#FF6B6B'
          case '3':
            return '#4ECDC4'
          case '4':
            return '#45B7D1'
          case '5':
            return '#96CEB4'
          case '6':
            return '#FFEAA7'
          default:
            return '#00D9FF'
        }
      })
      .attr('stroke-width', (d) => {
        // CEO Agent gets thicker stroke
        return d.id === '1' ? 4 : 3
      })
      .attr('fill-opacity', 0.8)
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
        // Different emojis for different agents
        switch (d.id) {
          case '1':
            return '👑' // CEO - Crown
          case '2':
            return '🔗' // NFTMatch - Link
          case '3':
            return '📄' // Transfer - Document
          case '4':
            return '🔍' // ResumeCheck - Magnifying glass
          case '5':
            return '💬' // InterviewCheck - Speech bubble
          case '6':
            return '⚖️' // Audit - Balance scale
          default:
            return '🤖'
        }
      })
      .attr('text-anchor', 'middle')
      .attr('dy', 6)
      .attr('font-size', (d) => {
        // CEO Agent gets larger emoji
        return d.id === '1' ? '20px' : '16px'
      })
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
