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
  Users,
  Calendar,
  MapPin,
  Award,
  ExternalLink,
  Heart,
  Trophy
} from 'lucide-react'
import { UserNavigation } from '@/components/user-navigation'
import Link from 'next/link'

export default function CommunityExperience() {
  // Community experience data
  const communityExperiences = [
    {
      id: 1,
      type: 'Volunteer',
      organization: 'Local Food Bank',
      role: 'Food Distribution Volunteer',
      duration: 'January 2023 - Present',
      location: 'New York, NY',
      description:
        'Organizing food distribution events and helping families in need. Coordinated with team members to serve over 500 families monthly.',
      impact: 'Served 2000+ families',
      skills: ['Leadership', 'Community Service', 'Event Organization'],
      issuer: 'NYC Volunteer Network',
      issuerLogo: '/org-logo1.jpg',
      nftId: 'NFT-COMM-001',
      verified: true
    },
    {
      id: 2,
      type: 'Contributor',
      organization: 'Open Source Initiative',
      role: 'Code Contributor',
      duration: 'March 2023 - Present',
      location: 'Remote',
      description:
        'Contributing to open source projects and helping maintain community-driven software. Active participant in code reviews and feature development.',
      impact: '50+ commits, 15+ PRs merged',
      skills: ['Open Source', 'Collaboration', 'Code Review', 'Git'],
      issuer: 'GitHub Community',
      issuerLogo: '/org-logo2.jpg',
      nftId: 'NFT-COMM-002',
      verified: true
    },
    {
      id: 3,
      type: 'Organizer',
      organization: 'Tech Meetup NYC',
      role: 'Event Organizer',
      duration: 'June 2023 - December 2023',
      location: 'New York, NY',
      description:
        'Organized monthly tech meetups bringing together developers and tech enthusiasts. Managed speaker coordination and venue logistics.',
      impact: '12 events, 300+ attendees',
      skills: ['Event Management', 'Public Speaking', 'Networking'],
      issuer: 'Tech Meetup NYC',
      issuerLogo: '/org-logo3.jpg',
      nftId: 'NFT-COMM-003',
      verified: true
    },
    {
      id: 4,
      type: 'Mentor',
      organization: 'CodePath',
      role: 'Student Mentor',
      duration: 'September 2023 - Present',
      location: 'Remote',
      description:
        'Mentoring junior developers in their coding journey. Providing guidance on technical skills and career development.',
      impact: 'Mentored 15+ students',
      skills: ['Mentoring', 'Teaching', 'Technical Guidance'],
      issuer: 'CodePath.org',
      issuerLogo: '/org-logo4.jpg',
      nftId: 'NFT-COMM-004',
      verified: false
    },
    {
      id: 5,
      type: 'Activity',
      organization: 'Environmental Action Group',
      role: 'Beach Cleanup Participant',
      duration: 'July 2023 - August 2023',
      location: 'Long Island, NY',
      description:
        'Participated in beach cleanup activities to protect marine environment. Helped remove plastic waste and educate the public.',
      impact: 'Cleaned 5 beaches, 200lbs waste removed',
      skills: ['Environmental Awareness', 'Teamwork', 'Public Education'],
      issuer: 'Green Earth Foundation',
      issuerLogo: '/org-logo5.jpg',
      nftId: 'NFT-COMM-005',
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
            Community Experience
          </h1>
          <p className="text-gray-300">
            Your community contributions and social impact activities
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {communityExperiences.map((experience, index) => (
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
                      {/* Organization Logo */}
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={experience.issuerLogo} />
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white">
                          {experience.organization.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <CardTitle className="text-white text-xl">
                            {experience.role}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className={`${
                              experience.type === 'Volunteer'
                                ? 'bg-red-500/20 text-red-300 border-red-500/30'
                                : experience.type === 'Contributor'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : experience.type === 'Organizer'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                : experience.type === 'Mentor'
                                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                                : 'bg-green-500/20 text-green-300 border-green-500/30'
                            }`}
                          >
                            {experience.type === 'Volunteer' && (
                              <Heart className="w-3 h-3 mr-1" />
                            )}
                            {experience.type === 'Organizer' && (
                              <Users className="w-3 h-3 mr-1" />
                            )}
                            {experience.type === 'Mentor' && (
                              <Award className="w-3 h-3 mr-1" />
                            )}
                            {experience.type}
                          </Badge>
                          {experience.verified && (
                            <Badge
                              variant="secondary"
                              className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                            >
                              <Trophy className="w-3 h-3 mr-1" />
                              NFT Verified
                            </Badge>
                          )}
                        </div>

                        <CardDescription className="text-gray-300 mb-3">
                          <Users className="w-4 h-4 inline mr-2" />
                          {experience.organization}
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

                        {/* Impact Badge */}
                        <Badge
                          variant="secondary"
                          className="bg-green-500/20 text-green-300 border-green-500/30 mb-4"
                        >
                          Impact: {experience.impact}
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
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                Community Impact Summary
              </CardTitle>
              <CardDescription className="text-gray-300">
                Overview of your community contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-400">5</div>
                  <div className="text-sm text-gray-300">Activities</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-400">4</div>
                  <div className="text-sm text-gray-300">Verified NFTs</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-400">
                    2000+
                  </div>
                  <div className="text-sm text-gray-300">People Impacted</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-yellow-400">12</div>
                  <div className="text-sm text-gray-300">Months Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
