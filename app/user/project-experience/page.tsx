'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ArrowLeft,
  FolderOpen,
  Calendar,
  MapPin,
  Award,
  ExternalLink,
  Trophy,
  Zap,
  BookOpen
} from 'lucide-react'
import { UserNavigation } from '@/components/user-navigation'
import Link from 'next/link'

export default function ProjectExperience() {
  // Project experience data
  const projectExperiences = [
    {
      id: 1,
      type: 'Competition',
      title: 'AI Innovation Challenge 2023',
      role: 'Team Lead & Frontend Developer',
      duration: 'May 2023 - June 2023',
      location: 'MIT, Cambridge',
      description:
        'Led a team of 4 developers to create an AI-powered healthcare diagnostic tool. Implemented machine learning algorithms for medical image analysis.',
      achievement: '1st Place Winner',
      technologies: ['Python', 'TensorFlow', 'React', 'AWS'],
      teamSize: 4,
      issuer: 'MIT Innovation Lab',
      issuerLogo: '/mit-logo.jpg',
      nftId: 'NFT-PROJ-001',
      verified: true
    },
    {
      id: 2,
      type: 'Research',
      title: 'Blockchain Security Research',
      role: 'Research Assistant',
      duration: 'September 2023 - December 2023',
      location: 'NYU, New York',
      description:
        'Conducted research on blockchain security vulnerabilities and proposed novel consensus mechanisms. Published findings in academic conference.',
      achievement: 'Paper Published in ICBC 2024',
      technologies: ['Solidity', 'Web3.js', 'Node.js', 'Ethereum'],
      teamSize: 3,
      issuer: 'NYU Computer Science Dept',
      issuerLogo: '/nyu-logo.jpg',
      nftId: 'NFT-PROJ-002',
      verified: true
    },
    {
      id: 3,
      type: 'Hackathon',
      title: 'HackNY Spring 2023',
      role: 'Full-Stack Developer',
      duration: 'April 2023',
      location: 'Columbia University, NY',
      description:
        'Built a social impact platform connecting volunteers with local nonprofits. Developed real-time matching algorithms and mobile-responsive interface.',
      achievement: 'Best Social Impact Award',
      technologies: ['React Native', 'Firebase', 'Express.js', 'MongoDB'],
      teamSize: 5,
      issuer: 'HackNY Organization',
      issuerLogo: '/hackny-logo.jpg',
      nftId: 'NFT-PROJ-003',
      verified: true
    },
    {
      id: 4,
      type: 'Competition',
      title: 'NASA Space Apps Challenge',
      role: 'Data Scientist',
      duration: 'October 2023',
      location: 'Remote',
      description:
        'Analyzed satellite data to predict climate change impacts on agriculture. Created visualization dashboard for farmers and researchers.',
      achievement: 'Global Finalist',
      technologies: ['Python', 'Pandas', 'D3.js', 'NASA APIs'],
      teamSize: 4,
      issuer: 'NASA',
      issuerLogo: '/nasa-logo.jpg',
      nftId: 'NFT-PROJ-004',
      verified: true
    },
    {
      id: 5,
      type: 'Research',
      title: 'Quantum Computing Algorithms',
      role: 'Undergraduate Researcher',
      duration: 'January 2024 - Present',
      location: 'Princeton, NJ',
      description:
        'Developing quantum algorithms for optimization problems. Collaborating with PhD students on quantum circuit design and error correction.',
      achievement: 'Research Grant Recipient',
      technologies: ['Qiskit', 'Python', 'MATLAB', 'Quantum Circuits'],
      teamSize: 2,
      issuer: 'Princeton Quantum Institute',
      issuerLogo: '/princeton-logo.jpg',
      nftId: 'NFT-PROJ-005',
      verified: false
    },
    {
      id: 6,
      type: 'Hackathon',
      title: 'TechCrunch Disrupt 2023',
      role: 'Backend Developer',
      duration: 'September 2023',
      location: 'San Francisco, CA',
      description:
        'Created a decentralized identity verification system using blockchain technology. Implemented zero-knowledge proof protocols for privacy.',
      achievement: 'Top 10 Finalist',
      technologies: ['Solidity', 'IPFS', 'Zero-Knowledge Proofs', 'React'],
      teamSize: 3,
      issuer: 'TechCrunch',
      issuerLogo: '/techcrunch-logo.jpg',
      nftId: 'NFT-PROJ-006',
      verified: true
    },
    {
      id: 7,
      type: 'Competition',
      title: 'Google Code Jam 2023',
      role: 'Individual Participant',
      duration: 'March 2023 - May 2023',
      location: 'Online',
      description:
        "Competed in Google's annual programming competition, solving complex algorithmic problems under time constraints. Advanced through multiple rounds.",
      achievement: 'Round 3 Qualifier',
      technologies: [
        'C++',
        'Algorithms',
        'Data Structures',
        'Competitive Programming'
      ],
      teamSize: 1,
      issuer: 'Google',
      issuerLogo: '/google-logo.jpg',
      nftId: 'NFT-PROJ-007',
      verified: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <UserNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Link href="/user/dashboard">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Project Experience
          </h1>
          <p className="text-gray-300">
            Your competition, research, and hackathon achievements
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {projectExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Issuer Logo */}
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={experience.issuerLogo} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                          {experience.issuer.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <CardTitle className="text-white text-xl">
                            {experience.title}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className={`${
                              experience.type === 'Competition'
                                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                                : experience.type === 'Research'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                            }`}
                          >
                            {experience.type === 'Competition' && (
                              <Trophy className="w-3 h-3 mr-1" />
                            )}
                            {experience.type === 'Research' && (
                              <BookOpen className="w-3 h-3 mr-1" />
                            )}
                            {experience.type === 'Hackathon' && (
                              <Zap className="w-3 h-3 mr-1" />
                            )}
                            {experience.type}
                          </Badge>
                          {experience.verified && (
                            <Badge
                              variant="secondary"
                              className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                            >
                              <Award className="w-3 h-3 mr-1" />
                              NFT Verified
                            </Badge>
                          )}
                        </div>

                        <CardDescription className="text-gray-300 mb-3">
                          <FolderOpen className="w-4 h-4 inline mr-2" />
                          {experience.role}
                        </CardDescription>

                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {experience.duration}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {experience.location}
                          </div>
                          <div className="flex items-center">
                            Team Size: {experience.teamSize}
                          </div>
                        </div>

                        {/* Achievement Badge */}
                        <Badge
                          variant="secondary"
                          className="bg-green-500/20 text-green-300 border-green-500/30 mb-4"
                        >
                          <Trophy className="w-3 h-3 mr-1" />
                          {experience.achievement}
                        </Badge>
                      </div>
                    </div>

                    {/* NFT Info */}
                    <div className="text-right">
                      <div className="text-sm text-gray-400 mb-2">
                        Issued by
                      </div>
                      <div className="text-white font-medium">
                        {experience.issuer}
                      </div>
                      <div className="text-xs text-purple-400 mt-1">
                        {experience.nftId}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View NFT
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-300 mb-4">{experience.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-gray-700/50 text-gray-300 border-gray-600/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                Project Portfolio Summary
              </CardTitle>
              <CardDescription className="text-gray-300">
                Overview of your academic and competitive achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-400">7</div>
                  <div className="text-sm text-gray-300">Total Projects</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-400">6</div>
                  <div className="text-sm text-gray-300">Verified NFTs</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-400">5</div>
                  <div className="text-sm text-gray-300">Awards Won</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-yellow-400">20+</div>
                  <div className="text-sm text-gray-300">Technologies Used</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
