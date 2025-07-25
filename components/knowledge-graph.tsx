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
    label: 'CEO Agent',
    type: 'agent',
    detail:
      'CEO-level AI assistant responsible for executive decision support, talent strategy planning, and enterprise management consulting. Equipped with comprehensive business insights and leadership analysis capabilities.',
    tags: [
      'Strategic Decision',
      'Talent Management',
      'Business Insights',
      'Leadership Assessment'
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
    label: 'HR Agent',
    type: 'agent',
    detail:
      'HR professional AI assistant specializing in recruitment evaluation, interview analysis, background checks, and talent assessment. Equipped with deep talent identification and evaluation capabilities.',
    tags: [
      'Recruitment Evaluation',
      'Interview Analysis',
      'Background Check',
      'Talent Assessment'
    ],
    nfts: [
      {
        id: 'n3',
        name: 'HR Expert NFT',
        image: '/api/placeholder/64/64',
        rarity: 'Epic'
      }
    ]
  },
  {
    id: '3',
    label: 'Tech Lead Agent',
    type: 'agent',
    detail:
      'Technical leadership AI assistant responsible for technical capability assessment, code review, architecture design evaluation, and technical interview guidance.',
    tags: [
      'Technical Assessment',
      'Code Review',
      'Architecture Design',
      'Technical Interview'
    ],
    nfts: [
      {
        id: 'n4',
        name: 'Tech Lead Badge',
        image: '/api/placeholder/64/64',
        rarity: 'Rare'
      }
    ]
  },
  {
    id: '4',
    label: 'Background Check Agent',
    type: 'agent',
    detail:
      'Background check specialist AI assistant responsible for candidate identity verification, resume validation, credit checks, and risk assessment.',
    tags: [
      'Identity Verification',
      'Resume Validation',
      'Credit Check',
      'Risk Assessment'
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
    label: 'Knowledge Base',
    type: 'knowledge',
    detail:
      'Enterprise knowledge base containing structured and unstructured knowledge including job descriptions, interview standards, evaluation frameworks, industry standards, and best practices.',
    tags: [
      'Job Knowledge',
      'Interview Standards',
      'Evaluation Framework',
      'Industry Standards'
    ],
    nfts: [
      {
        id: 'n6',
        name: 'Knowledge Gem',
        image: '/api/placeholder/64/64',
        rarity: 'Legendary'
      }
    ]
  },
  {
    id: '6',
    label: 'Analytics Engine',
    type: 'tool',
    detail:
      'Data analytics engine providing real-time data processing, visualization chart generation, statistical analysis, and predictive modeling capabilities.',
    tags: [
      'Data Analysis',
      'Visualization',
      'Statistical Modeling',
      'Predictive Algorithms'
    ],
    nfts: [
      {
        id: 'n7',
        name: 'Analytics Core',
        image: '/api/placeholder/64/64',
        rarity: 'Rare'
      }
    ]
  },
  {
    id: '7',
    label: 'Candidate Database',
    type: 'data',
    detail:
      'Candidate database containing multi-dimensional candidate data including resume information, interview records, assessment results, and background check reports.',
    tags: [
      'Resume Data',
      'Interview Records',
      'Assessment Results',
      'Background Reports'
    ],
    nfts: []
  },
  {
    id: '8',
    label: 'Interview System',
    type: 'tool',
    detail:
      'Intelligent interview system supporting online interviews, audio/video recording, real-time assessment, question recommendations, and interview process management.',
    tags: [
      'Online Interview',
      'Real-time Assessment',
      'Process Management',
      'Question Bank'
    ],
    nfts: [
      {
        id: 'n8',
        name: 'Interview Token',
        image: '/api/placeholder/64/64',
        rarity: 'Common'
      }
    ]
  },
  {
    id: '9',
    label: 'Security Agent',
    type: 'agent',
    detail:
      'Security monitoring AI assistant responsible for real-time anomaly detection, threat identification, data security, and automated response handling.',
    tags: [
      'Security Monitoring',
      'Threat Detection',
      'Data Protection',
      'Automated Response'
    ],
    nfts: [
      {
        id: 'n9',
        name: 'Security Shield',
        image: '/api/placeholder/64/64',
        rarity: 'Epic'
      }
    ]
  }
]

const mockLinks: GraphLink[] = [
  // CEO Agent as core node with management relationships to other Agents
  { source: '1', target: '2', relationship: 'manages' },
  { source: '1', target: '3', relationship: 'coordinates' },
  { source: '1', target: '4', relationship: 'oversees' },

  // HR Agent collaboration relationships
  { source: '2', target: '5', relationship: 'queries' },
  { source: '2', target: '7', relationship: 'accesses' },
  { source: '2', target: '8', relationship: 'uses' },
  { source: '2', target: '4', relationship: 'collaborates' },

  // Tech Lead Agent technical assessment relationships
  { source: '3', target: '5', relationship: 'references' },
  { source: '3', target: '7', relationship: 'evaluates' },
  { source: '3', target: '8', relationship: 'conducts' },
  { source: '3', target: '6', relationship: 'utilizes' },

  // Background Check Agent investigation relationships
  { source: '4', target: '7', relationship: 'investigates' },
  { source: '4', target: '6', relationship: 'analyzes' },

  // Knowledge base and database support relationships
  { source: '5', target: '6', relationship: 'feeds' },
  { source: '5', target: '7', relationship: 'enriches' },

  // Interview system and data relationships
  { source: '8', target: '7', relationship: 'records' },
  { source: '8', target: '6', relationship: 'generates' },

  // Security Agent monitoring relationships
  { source: '9', target: '1', relationship: 'protects' },
  { source: '9', target: '7', relationship: 'secures' },
  { source: '9', target: '8', relationship: 'monitors' }
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
