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
          <Tabs defaultValue="search" className="space-y-6">
            <TabsList className="bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90 border-gray-700/50 backdrop-blur-sm">
              <TabsTrigger
                value="search"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Search className="w-4 h-4 mr-2" />
                Search & Verify
              </TabsTrigger>
              <TabsTrigger
                value="requests"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Clock className="w-4 h-4 mr-2" />
                Pending Requests
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/70 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent">
                  <CardTitle className="text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Background Verification Search
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Search for candidates and request background verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search by wallet address, name, or email..."
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <Button className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-700 hover:via-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-700/50 bg-gradient-to-r from-gray-800/40 via-gray-800/30 to-gray-800/40 rounded-lg p-4 hover:from-gray-700/50 hover:via-gray-700/40 hover:to-gray-700/50 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">John Doe</h3>
                          <p className="text-gray-300 text-sm">
                            0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4
                          </p>
                          <p className="text-gray-300 text-sm">
                            Software Engineer • 5 years experience
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-green-500/50 text-green-300 bg-gradient-to-r from-green-500/10 to-green-400/20"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified Profile
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md transition-all duration-300"
                        >
                          Request Verification
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600/50 text-gray-300 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 bg-transparent transition-all duration-300"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                      </div>
                    </div>

                    <div className="border border-gray-700/50 bg-gradient-to-r from-gray-800/40 via-gray-800/30 to-gray-800/40 rounded-lg p-4 hover:from-gray-700/50 hover:via-gray-700/40 hover:to-gray-700/50 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">
                            Jane Smith
                          </h3>
                          <p className="text-gray-300 text-sm">
                            0x8ba1f109551bD432803012645Hac136c22C501e
                          </p>
                          <p className="text-gray-300 text-sm">
                            Product Manager • 7 years experience
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-purple-500/50 text-purple-300 bg-gradient-to-r from-purple-500/10 to-purple-400/20"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          Partial Profile
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md transition-all duration-300"
                        >
                          Request Verification
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600/50 text-gray-300 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 bg-transparent transition-all duration-300"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/70 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent">
                  <CardTitle className="text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Pending Verification Requests
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Track the status of your background verification requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-gray-700/50 bg-gray-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">
                          John Doe - Employment Verification
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Requested 2 hours ago
                        </p>
                        <p className="text-gray-300 text-sm">
                          Verifying: Work experience at TechCorp Inc.
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-green-500/50 text-green-300 bg-green-500/10"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        Awaiting Response
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>

                  <div className="border border-gray-700/50 bg-gray-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">
                          Jane Smith - Education Verification
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Requested 1 day ago
                        </p>
                        <p className="text-gray-300 text-sm">
                          Verifying: MBA from Stanford University
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-purple-500/50 text-purple-300 bg-purple-500/10"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        In Progress
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/70 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent">
                  <CardTitle className="text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Completed Verifications
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    View and download completed background verification reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-gray-700/50 bg-gray-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">
                          Alice Johnson - Full Background Check
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Completed 3 days ago
                        </p>
                        <p className="text-gray-300 text-sm">
                          Employment, Education, and Reference verification
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-green-500/50 text-green-300 bg-green-500/10"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Report
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="border border-gray-700/50 bg-gray-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">
                          Bob Wilson - Employment Verification
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Completed 1 week ago
                        </p>
                        <p className="text-gray-300 text-sm">
                          Work experience verification
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-red-500/50 text-red-300 bg-red-500/10"
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Issues Found
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Report
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
