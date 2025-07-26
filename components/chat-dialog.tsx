'use client'

import React, { useState } from 'react'
import {
  X,
  Send,
  Upload,
  FileText,
  MapPin,
  User,
  Briefcase,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { FileUpload } from '@/components/ui/file-upload'

interface ChatDialogProps {
  isOpen: boolean
  onClose: () => void
  agentName: string
  agentType: string
}

interface Message {
  id: string
  type: 'user' | 'agent'
  content: string
  timestamp: Date
  attachments?: Array<{
    type: 'resume' | 'interview' | 'jd' | 'address' | 'evaluation'
    name: string
    content?: string
  }>
}

interface UploadedFile {
  type: 'resume' | 'interview' | 'jd' | 'address' | 'evaluation'
  name: string
  content: string
}

export const ChatDialog: React.FC<ChatDialogProps> = ({
  isOpen,
  onClose,
  agentName,
  agentType
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: `Hello! I'm ${agentName}. I can help you with the following services:\n\n🔍 Interview Background Check + Evaluation: Upload address, resume, interview records, and JD for comprehensive assessment\n📝 Interview Evaluation: Professional evaluation based on resume, interview records, and JD\n👤 Resume Background Check: Provide address and resume for background investigation\n\nPlease select the service type you need and upload relevant materials.`,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isOpen) return null

  const handleSendMessage = () => {
    if (!inputMessage.trim() && uploadedFiles.length === 0) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      attachments: uploadedFiles.map((file) => ({
        type: file.type,
        name: file.name,
        content: file.content
      }))
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')
    setUploadedFiles([])

    // 模拟Agent处理过程
    setIsProcessing(true)
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: generateAgentResponse(newMessage),
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, agentResponse])
      setIsProcessing(false)
    }, 2000)
  }

  const generateAgentResponse = (userMessage: Message): string => {
    const hasResume = userMessage.attachments?.some(
      (att) => att.type === 'resume'
    )
    const hasInterview = userMessage.attachments?.some(
      (att) => att.type === 'interview'
    )
    const hasJD = userMessage.attachments?.some((att) => att.type === 'jd')
    const hasAddress = userMessage.attachments?.some(
      (att) => att.type === 'address'
    )

    if (hasResume && hasInterview && hasJD && hasAddress) {
      return `📋 **Comprehensive Interview Background Check + Evaluation Report**\n\n✅ Complete materials received: Resume, Interview Record, JD, Address Information\n\n**Background Check Results:**\n• Identity Information: Verified ✓\n• Work History: 92% match with resume\n• Skills Assessment: Meets job requirements\n\n**Interview Evaluation:**\n• Technical Skills: Excellent (8/10)\n• Communication: Good (7/10)\n• Teamwork: Excellent (9/10)\n\n**Recommendation Score: ⭐⭐⭐⭐⭐**\nRecommend for hire - candidate's overall capabilities match job requirements.`
    } else if (hasResume && hasInterview && hasJD) {
      return `📝 **Interview Evaluation Report**\n\nBased on provided resume, interview record, and JD:\n\n**Capability Match: 85%**\n• Tech Stack Match: React, TypeScript, Node.js ✓\n• Project Experience: 3+ years relevant experience ✓\n• Learning Ability: Strong ✓\n\n**Interview Performance:**\n• Clear logical reasoning\n• Accurate technical problem solving\n• Good understanding of company business\n\n**Recommendation:** Can proceed to next interview round`
    } else if (hasResume && hasAddress) {
      return `🔍 **Resume Background Check Report**\n\n**Basic Information Verification:**\n• Name: Verified ✓\n• Contact Info: Valid ✓\n• Address: Confirmed ✓\n\n**Work History Verification:**\n• Company A: Verified, 2 years 3 months ✓\n• Company B: Verified, 1 year 8 months ✓\n• Job Description: Consistent with resume ✓\n\n**Education Verification:**\n• Degree: Bachelor's Degree ✓\n• Institution: Verified ✓\n\n**Overall Assessment:** Resume information is authentic and reliable`
    } else {
      return `Message received. Please upload relevant materials for accurate service:\n\n📄 Resume Background Check requires: Address + Resume\n📝 Interview Evaluation requires: Resume + Interview Record + JD\n🔍 Comprehensive Check requires: Address + Resume + Interview Record + JD`
    }
  }

  const handleFileUpload = (
    type: UploadedFile['type'],
    file: File,
    content: string
  ) => {
    const newFile: UploadedFile = {
      type,
      name: file.name,
      content
    }
    setUploadedFiles((prev) => [
      ...prev.filter((f) => f.type !== type),
      newFile
    ])
  }

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'resume':
        return <User className="w-4 h-4" />
      case 'interview':
        return <FileText className="w-4 h-4" />
      case 'jd':
        return <Briefcase className="w-4 h-4" />
      case 'address':
        return <MapPin className="w-4 h-4" />
      case 'evaluation':
        return <Clock className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getFileTypeName = (type: string) => {
    switch (type) {
      case 'resume':
        return 'Resume'
      case 'interview':
        return 'Interview Record'
      case 'jd':
        return 'Job Description'
      case 'address':
        return 'Address Info'
      case 'evaluation':
        return 'Interview Evaluation'
      default:
        return 'File'
    }
  }

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div
          className="bg-[#161b22] rounded-lg border border-gray-700 w-full max-w-4xl h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
          translate="no"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
                🤖
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{agentName}</h2>
                <p className="text-sm text-gray-400">AI Assistant • Online</p>
              </div>
            </div>
            <Button size="sm" onClick={onClose}>
              <X className="w-5 h-5 text-white" />
            </Button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                      {message.attachments &&
                        message.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((att, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2 text-sm opacity-80"
                              >
                                {getFileTypeIcon(att.type)}
                                <span>
                                  {getFileTypeName(att.type)}: {att.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      <div className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-500"></div>
                        <span>Processing your request...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-700 p-4">
                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {uploadedFiles.map((file, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-gray-700"
                      >
                        {getFileTypeIcon(file.type)}
                        <span className="ml-1">
                          {getFileTypeName(file.type)}
                        </span>
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-end space-x-2">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 min-h-[60px] max-h-[120px] bg-gray-800 border-gray-700 text-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={
                      !inputMessage.trim() && uploadedFiles.length === 0
                    }
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* File Upload Panel */}
            <div className="w-80 border-l border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">
                  Upload Materials
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <Tabs defaultValue="interview-check" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800  top-0 z-10">
                    <TabsTrigger value="interview-check" className="text-xs">
                      Check+Eval
                    </TabsTrigger>
                    <TabsTrigger value="interview-eval" className="text-xs">
                      Interview
                    </TabsTrigger>
                    <TabsTrigger value="resume-check" className="text-xs">
                      Resume
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="interview-check"
                    className="space-y-3 mt-4"
                  >
                    <p className="text-sm text-gray-400">
                      Interview background check + evaluation requires:
                    </p>
                    {[
                      {
                        type: 'address' as const,
                        label: 'Address Info',
                        required: true
                      },
                      {
                        type: 'resume' as const,
                        label: 'Resume',
                        required: true
                      },
                      {
                        type: 'interview' as const,
                        label: 'Interview Record',
                        required: true
                      },
                      {
                        type: 'jd' as const,
                        label: 'Job Description',
                        required: true
                      }
                    ].map(({ type, label, required }) => (
                      <FileUpload
                        key={type}
                        label={label}
                        required={required}
                        onFileSelect={(file, content) =>
                          handleFileUpload(type, file, content)
                        }
                        currentFile={
                          uploadedFiles.find((f) => f.type === type)?.name
                        }
                      />
                    ))}
                  </TabsContent>

                  <TabsContent
                    value="interview-eval"
                    className="space-y-3 mt-4"
                  >
                    <p className="text-sm text-gray-400">
                      Interview evaluation requires:
                    </p>
                    {[
                      {
                        type: 'resume' as const,
                        label: 'Resume',
                        required: true
                      },
                      {
                        type: 'interview' as const,
                        label: 'Interview Record',
                        required: true
                      },
                      {
                        type: 'jd' as const,
                        label: 'Job Description',
                        required: true
                      }
                    ].map(({ type, label, required }) => (
                      <FileUpload
                        key={type}
                        label={label}
                        required={required}
                        onFileSelect={(file, content) =>
                          handleFileUpload(type, file, content)
                        }
                        currentFile={
                          uploadedFiles.find((f) => f.type === type)?.name
                        }
                      />
                    ))}
                  </TabsContent>

                  <TabsContent value="resume-check" className="space-y-3 mt-4">
                    <p className="text-sm text-gray-400">
                      Resume background check requires:
                    </p>
                    {[
                      {
                        type: 'address' as const,
                        label: 'Address Info',
                        required: true
                      },
                      {
                        type: 'resume' as const,
                        label: 'Resume',
                        required: true
                      }
                    ].map(({ type, label, required }) => (
                      <FileUpload
                        key={type}
                        label={label}
                        required={required}
                        onFileSelect={(file, content) =>
                          handleFileUpload(type, file, content)
                        }
                        currentFile={
                          uploadedFiles.find((f) => f.type === type)?.name
                        }
                      />
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
