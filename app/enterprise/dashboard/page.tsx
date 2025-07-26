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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Users,
  FileCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Download,
  Eye
} from 'lucide-react'
import { EnterpriseNavigation } from '@/components/enterprise-navigation'
import MintWorkNFT from '@/components/mint-work-nft'

export default function EnterpriseDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <EnterpriseNavigation />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Enterprise Dashboard
              </h1>
              <p className="text-gray-400">
                Conduct secure background verifications
              </p>
            </div>
            <MintWorkNFT />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="enterprise" className="space-y-6">
            <TabsList className="bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90 border-gray-700/50 backdrop-blur-sm">
              <TabsTrigger
                value="enterprise"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Users className="w-4 h-4 mr-2" />
                Enterprise Experience
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300"
              >
                <FileCheck className="w-4 h-4 mr-2" />
                Activity Experience
              </TabsTrigger>
              <TabsTrigger
                value="contribution"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Contribution Experience
              </TabsTrigger>
              <TabsTrigger
                value="competition"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Clock className="w-4 h-4 mr-2" />
                Competition Experience
              </TabsTrigger>
              <TabsTrigger
                value="research"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Research Experience
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enterprise" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/70 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent">
                  <CardTitle className="text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Enterprise Experience Verification
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the enterprise work experience details for
                    verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Enterprise Name
                      </label>
                      <Input
                        placeholder="Enter enterprise name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Job Seeker Address (Wallet Address)
                      </label>
                      <Input
                        placeholder="0x742d35Cc6634C0532925a3b8D4..."
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Employment Type
                      </label>
                      <select className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 text-white rounded-md">
                        <option value="">Select type</option>
                        <option value="internship">Internship</option>
                        <option value="full-time">Full-time</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Position Title
                      </label>
                      <Input
                        placeholder="Enter position title"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Start Date
                      </label>
                      <Input
                        type="date"
                        className="bg-gray-800/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        End Date
                      </label>
                      <Input
                        type="date"
                        className="bg-gray-800/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Department/Team
                      </label>
                      <Input
                        placeholder="Enter department or team name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Location (Optional)
                      </label>
                      <Input
                        placeholder="Enter work location"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Job Description (300 characters max)
                    </label>
                    <Textarea
                      placeholder="Describe the work responsibilities and tasks..."
                      maxLength={300}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Performance Evaluation
                    </label>
                    <Textarea
                      placeholder="Enter performance evaluation and results..."
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 resize-none h-20"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                    Submit Enterprise Experience
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/70 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent">
                  <CardTitle className="text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Activity Experience Verification
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the community activity experience details for
                    verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Activity Image
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Job Seeker Address
                      </label>
                      <Input
                        placeholder="0x742d35Cc6634C0532925a3b8D4..."
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Community Name
                      </label>
                      <Input
                        placeholder="Enter community name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Activity Name
                      </label>
                      <Input
                        placeholder="Enter activity name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Activity Time
                      </label>
                      <Input
                        type="datetime-local"
                        className="bg-gray-800/50 border-gray-600/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Activity Role
                      </label>
                      <Input
                        placeholder="Enter your role in the activity"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Activity Description (300 characters max)
                    </label>
                    <Textarea
                      placeholder="Describe the activity content and your participation..."
                      maxLength={300}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 resize-none h-24"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                    Submit Activity Experience
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contribution" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/70 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent">
                  <CardTitle className="text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Contribution Experience Verification
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the community contribution experience details for
                    verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Contribution Image
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Job Seeker Address
                      </label>
                      <Input
                        placeholder="0x742d35Cc6634C0532925a3b8D4..."
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Community Name
                      </label>
                      <Input
                        placeholder="Enter community name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Contribution Content
                      </label>
                      <Input
                        placeholder="Enter contribution type/content"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Contribution Period
                      </label>
                      <Input
                        placeholder="e.g., 2023.01 - 2023.12"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Specific Project/Topic Name
                      </label>
                      <Input
                        placeholder="Enter project or topic name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Achievement Link
                      </label>
                      <Input
                        placeholder="https://..."
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-300">
                        Certifier
                      </label>
                      <Input
                        placeholder="Enter certifier name and contact"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Contribution Evaluation
                    </label>
                    <Textarea
                      placeholder="Describe the contribution impact and evaluation..."
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 resize-none h-20"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                    Submit Contribution Experience
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competition" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/70 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent">
                  <CardTitle className="text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Competition Experience Verification
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the competition experience details for verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Competition Image
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Job Seeker Address
                      </label>
                      <Input
                        placeholder="0x742d35Cc6634C0532925a3b8D4..."
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Competition Name
                      </label>
                      <Input
                        placeholder="e.g., ETHGlobal Hackathon"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Event Time & Location
                      </label>
                      <Input
                        placeholder="Enter event time and location"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Project Name & Link
                      </label>
                      <Input
                        placeholder="Project name and repository/demo link"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Participation Role
                      </label>
                      <select className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 text-white rounded-md">
                        <option value="">Select role</option>
                        <option value="project-lead">Project Lead</option>
                        <option value="developer">Technical Developer</option>
                        <option value="designer">Designer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Award Status (if any)
                      </label>
                      <Input
                        placeholder="Enter award details or N/A"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-300">
                        Project Certifier
                      </label>
                      <Input
                        placeholder="Organizer representative or judge name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                    Submit Competition Experience
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="research" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/70 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent">
                  <CardTitle className="text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Research Experience Verification
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the research experience details for verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Research Image
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Job Seeker Address
                      </label>
                      <Input
                        placeholder="0x742d35Cc6634C0532925a3b8D4..."
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Project/Topic Name
                      </label>
                      <Input
                        placeholder="Enter research project or topic name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Lab/Supervisor Name
                      </label>
                      <Input
                        placeholder="Enter laboratory or supervisor name"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Research Period
                      </label>
                      <Input
                        placeholder="e.g., 2023.01 - 2023.12"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Participation Role & Tasks
                      </label>
                      <Input
                        placeholder="Enter your role and specific tasks"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Research Results Link
                      </label>
                      <Input
                        placeholder="Papers, demos, datasets links"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-300">
                        Project Certifier
                      </label>
                      <Input
                        placeholder="Enter certifier name and contact"
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Project Overview
                    </label>
                    <Textarea
                      placeholder="Brief description of the research project content..."
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 resize-none h-24"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                    Submit Research Experience
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
