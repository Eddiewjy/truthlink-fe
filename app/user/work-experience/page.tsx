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
  Building,
  Calendar,
  MapPin,
  Award,
  ExternalLink
} from 'lucide-react'
import { UserNavigation } from '@/components/user-navigation'
import Link from 'next/link'

export default function WorkExperience() {
  // Work experience data
  const workExperiences = [
    {
      id: 1,
      type: 'Internship',
      company: 'Tech Solutions Inc.',
      position: 'Software Development Intern',
      duration: 'June 2023 - August 2023',
      location: 'San Francisco, CA',
      description:
        'Developed and maintained web applications using React and Node.js. Collaborated with senior developers on multiple projects.',
      skills: ['React', 'Node.js', 'JavaScript', 'Git'],
      issuer: 'Tech Solutions Inc.',
      issuerLogo: '/company-logo1.jpg',
      nftId: 'NFT-WORK-001',
      verified: true
    },
    {
      id: 2,
      type: 'Full-time',
      company: 'Digital Innovations LLC',
      position: 'Junior Frontend Developer',
      duration: 'September 2023 - Present',
      location: 'New York, NY',
      description:
        'Building responsive user interfaces and implementing new features for client projects. Working with modern frontend technologies.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      issuer: 'Digital Innovations LLC',
      issuerLogo: '/company-logo2.jpg',
      nftId: 'NFT-WORK-002',
      verified: true
    },
    {
      id: 3,
      type: 'Part-time',
      company: 'StartupX',
      position: 'Web Developer',
      duration: 'January 2023 - May 2023',
      location: 'Remote',
      description:
        'Contributed to the development of a fintech application. Implemented payment processing features and user authentication.',
      skills: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
      issuer: 'StartupX',
      issuerLogo: '/company-logo3.jpg',
      nftId: 'NFT-WORK-003',
      verified: false
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
            Work Experience
          </h1>
          <p className="text-gray-300">
            Your professional work history and NFT certificates
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {workExperiences.map((experience, index) => (
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
                      {/* Company Logo */}
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={experience.issuerLogo} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {experience.company.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <CardTitle className="text-white text-xl">
                            {experience.position}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className={`${
                              experience.type === 'Full-time'
                                ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                : experience.type === 'Internship'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                            }`}
                          >
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
                          <Building className="w-4 h-4 inline mr-2" />
                          {experience.company}
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
                        </div>
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
                    {experience.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-gray-700/50 text-gray-300 border-gray-600/30"
                      >
                        {skill}
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
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                Work Experience Summary
              </CardTitle>
              <CardDescription className="text-gray-300">
                Overview of your professional journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-400">3</div>
                  <div className="text-sm text-gray-300">Total Positions</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-400">2</div>
                  <div className="text-sm text-gray-300">Verified NFTs</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-400">12</div>
                  <div className="text-sm text-gray-300">Skills Acquired</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-yellow-400">1.5</div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
