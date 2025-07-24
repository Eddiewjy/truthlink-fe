"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Shield, Eye, EyeOff, CheckCircle, Clock, Plus } from "lucide-react"
import { useAuthStore } from "@/lib/store"
import { UserNavigation } from "@/components/user-navigation"

export default function UserDashboard() {
  const { walletAddress } = useAuthStore()

  const profileCompleteness = 75

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <UserNavigation />

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your professional profile and privacy settings</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-blue-600 text-white text-2xl">
                    {walletAddress?.slice(2, 4).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">John Doe</CardTitle>
                <CardDescription className="text-gray-400">Software Engineer</CardDescription>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Profile Completeness</span>
                      <span className="text-white">{profileCompleteness}%</span>
                    </div>
                    <Progress value={profileCompleteness} className="h-2" />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="resume" className="space-y-6">
              <TabsList className="bg-white/5 border-white/10">
                <TabsTrigger value="resume" className="data-[state=active]:bg-blue-600">
                  <FileText className="w-4 h-4 mr-2" />
                  Resume
                </TabsTrigger>
                <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="requests" className="data-[state=active]:bg-blue-600">
                  <Eye className="w-4 h-4 mr-2" />
                  Requests
                </TabsTrigger>
              </TabsList>

              <TabsContent value="resume" className="space-y-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Professional Experience</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your work history and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-semibold">Senior Software Engineer</h3>
                          <p className="text-gray-400">TechCorp Inc.</p>
                        </div>
                        <Badge variant="outline" className="border-green-500/30 text-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">2021 - Present</p>
                    </div>

                    <div className="border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-semibold">Software Engineer</h3>
                          <p className="text-gray-400">StartupXYZ</p>
                        </div>
                        <Badge variant="outline" className="border-yellow-500/30 text-yellow-300">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">2019 - 2021</p>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Privacy Controls</CardTitle>
                    <CardDescription className="text-gray-400">Control who can access your information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">Work Experience</h3>
                        <p className="text-sm text-gray-400">Allow enterprises to view your work history</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-green-500/30 text-green-300 bg-transparent">
                        <Eye className="w-4 h-4 mr-1" />
                        Public
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">Education</h3>
                        <p className="text-sm text-gray-400">Share your educational background</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-yellow-500/30 text-yellow-300 bg-transparent"
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Restricted
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">Personal Details</h3>
                        <p className="text-sm text-gray-400">Contact information and personal data</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-red-500/30 text-red-300 bg-transparent">
                        <EyeOff className="w-4 h-4 mr-1" />
                        Private
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requests" className="space-y-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Verification Requests</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage incoming background check requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">Microsoft Corporation</h3>
                          <p className="text-gray-400 text-sm">Requesting employment verification</p>
                        </div>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500/30 text-red-300 bg-transparent">
                          Decline
                        </Button>
                      </div>
                    </div>

                    <div className="border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">Google LLC</h3>
                          <p className="text-gray-400 text-sm">Requesting education verification</p>
                        </div>
                        <Badge variant="outline" className="border-green-500/30 text-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approved
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">Approved 2 days ago</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
