"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, FileCheck, Clock, CheckCircle, AlertCircle, Filter, Download, Eye } from "lucide-react"
import { EnterpriseNavigation } from "@/components/enterprise-navigation"

export default function EnterpriseDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <EnterpriseNavigation />

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Enterprise Dashboard</h1>
          <p className="text-gray-400">Conduct secure background verifications</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Verifications</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                </div>
                <FileCheck className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Requests</p>
                  <p className="text-2xl font-bold text-white">23</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed Today</p>
                  <p className="text-2xl font-bold text-white">18</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-white">94.2%</p>
                </div>
                <Users className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs defaultValue="search" className="space-y-6">
            <TabsList className="bg-white/5 border-white/10">
              <TabsTrigger value="search" className="data-[state=active]:bg-purple-600">
                <Search className="w-4 h-4 mr-2" />
                Search & Verify
              </TabsTrigger>
              <TabsTrigger value="requests" className="data-[state=active]:bg-purple-600">
                <Clock className="w-4 h-4 mr-2" />
                Pending Requests
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-purple-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Background Verification Search</CardTitle>
                  <CardDescription className="text-gray-400">
                    Search for candidates and request background verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search by wallet address, name, or email..."
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">John Doe</h3>
                          <p className="text-gray-400 text-sm">0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4</p>
                          <p className="text-gray-400 text-sm">Software Engineer • 5 years experience</p>
                        </div>
                        <Badge variant="outline" className="border-green-500/30 text-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified Profile
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Request Verification
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                      </div>
                    </div>

                    <div className="border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">Jane Smith</h3>
                          <p className="text-gray-400 text-sm">0x8ba1f109551bD432803012645Hac136c22C501e</p>
                          <p className="text-gray-400 text-sm">Product Manager • 7 years experience</p>
                        </div>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                          <Clock className="w-3 h-3 mr-1" />
                          Partial Profile
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Request Verification
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
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
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Pending Verification Requests</CardTitle>
                  <CardDescription className="text-gray-400">
                    Track the status of your background verification requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">John Doe - Employment Verification</h3>
                        <p className="text-gray-400 text-sm">Requested 2 hours ago</p>
                        <p className="text-gray-400 text-sm">Verifying: Work experience at TechCorp Inc.</p>
                      </div>
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-300">
                        <Clock className="w-3 h-3 mr-1" />
                        Awaiting Response
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>

                  <div className="border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">Jane Smith - Education Verification</h3>
                        <p className="text-gray-400 text-sm">Requested 1 day ago</p>
                        <p className="text-gray-400 text-sm">Verifying: MBA from Stanford University</p>
                      </div>
                      <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                        <Clock className="w-3 h-3 mr-1" />
                        In Progress
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Completed Verifications</CardTitle>
                  <CardDescription className="text-gray-400">
                    View and download completed background verification reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">Alice Johnson - Full Background Check</h3>
                        <p className="text-gray-400 text-sm">Completed 3 days ago</p>
                        <p className="text-gray-400 text-sm">Employment, Education, and Reference verification</p>
                      </div>
                      <Badge variant="outline" className="border-green-500/30 text-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Report
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">Bob Wilson - Employment Verification</h3>
                        <p className="text-gray-400 text-sm">Completed 1 week ago</p>
                        <p className="text-gray-400 text-sm">Work experience verification</p>
                      </div>
                      <Badge variant="outline" className="border-red-500/30 text-red-300">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Issues Found
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Report
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
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
