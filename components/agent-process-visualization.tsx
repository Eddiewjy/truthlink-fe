'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Cpu,
  Database,
  Network,
  X
} from 'lucide-react'

interface ProcessStep {
  id: string
  name: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'error'
  progress: number
  duration?: number
  details?: string[]
}

interface AgentProcessVisualizationProps {
  isVisible: boolean
  agentName: string
  processType: 'interview-check' | 'interview-eval' | 'resume-check'
  onClose?: () => void
}

export const AgentProcessVisualization: React.FC<
  AgentProcessVisualizationProps
> = ({ isVisible, agentName, processType, onClose }) => {
  const [steps, setSteps] = useState<ProcessStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const getProcessSteps = (type: string): ProcessStep[] => {
    switch (type) {
      case 'interview-check':
        return [
          {
            id: '1',
            name: 'File Parsing',
            description:
              'Parse uploaded resume, interview records, JD and address information',
            status: 'pending',
            progress: 0,
            details: [
              'Extract resume key info',
              'Parse interview records',
              'Analyze JD requirements',
              'Verify address info'
            ]
          },
          {
            id: '2',
            name: 'Background Investigation',
            description: 'Verify candidate background information',
            status: 'pending',
            progress: 0,
            details: [
              'Identity verification',
              'Work history verification',
              'Education certification',
              'Contact confirmation'
            ]
          },
          {
            id: '3',
            name: 'Capability Assessment',
            description:
              'Analyze capability matching based on interview records and JD',
            status: 'pending',
            progress: 0,
            details: [
              'Technical skills assessment',
              'Soft skills analysis',
              'Experience matching',
              'Development potential'
            ]
          },
          {
            id: '4',
            name: 'Risk Analysis',
            description: 'Identify potential risks and concerns',
            status: 'pending',
            progress: 0,
            details: [
              'Resume authenticity',
              'Job-hopping frequency',
              'Salary expectation',
              'Stability assessment'
            ]
          },
          {
            id: '5',
            name: 'Generate Report',
            description:
              'Comprehensive analysis results and detailed assessment report',
            status: 'pending',
            progress: 0,
            details: [
              'Summarize results',
              'Generate scores',
              'Create visualizations',
              'Output recommendations'
            ]
          }
        ]
      case 'interview-eval':
        return [
          {
            id: '1',
            name: 'Material Analysis',
            description:
              'Analyze resume, interview records and job requirements',
            status: 'pending',
            progress: 0,
            details: [
              'Resume info extraction',
              'Interview performance analysis',
              'JD requirements parsing'
            ]
          },
          {
            id: '2',
            name: 'Matching Calculation',
            description: 'Calculate candidate-position matching degree',
            status: 'pending',
            progress: 0,
            details: [
              'Skills matching',
              'Experience matching',
              'Culture matching'
            ]
          },
          {
            id: '3',
            name: 'Interview Performance Assessment',
            description: 'Evaluate interview performance and answer quality',
            status: 'pending',
            progress: 0,
            details: [
              'Technical questions',
              'Logical thinking',
              'Communication skills'
            ]
          },
          {
            id: '4',
            name: 'Generate Evaluation',
            description:
              'Generate interview evaluation report and recommendations',
            status: 'pending',
            progress: 0,
            details: [
              'Overall score',
              'Strength analysis',
              'Improvement suggestions'
            ]
          }
        ]
      case 'resume-check':
        return [
          {
            id: '1',
            name: 'Information Extraction',
            description: 'Extract key data from resume and address information',
            status: 'pending',
            progress: 0,
            details: [
              'Personal info',
              'Work experience',
              'Education background',
              'Contact info'
            ]
          },
          {
            id: '2',
            name: 'Identity Verification',
            description:
              'Verify the authenticity of candidate identity information',
            status: 'pending',
            progress: 0,
            details: [
              'Name verification',
              'ID verification',
              'Contact confirmation'
            ]
          },
          {
            id: '3',
            name: 'Resume Verification',
            description: 'Verify work experience and educational background',
            status: 'pending',
            progress: 0,
            details: [
              'Company verification',
              'Position verification',
              'Education certification'
            ]
          },
          {
            id: '4',
            name: 'Generate Report',
            description: 'Generate background check report',
            status: 'pending',
            progress: 0,
            details: [
              'Authenticity assessment',
              'Risk alerts',
              'Verification summary'
            ]
          }
        ]
      default:
        return []
    }
  }

  useEffect(() => {
    if (isVisible) {
      const processSteps = getProcessSteps(processType)
      setSteps(processSteps)
      setCurrentStep(0)
      setIsProcessing(true)

      // 模拟处理过程
      let stepIndex = 0
      const processStep = () => {
        if (stepIndex < processSteps.length) {
          setSteps((prev) =>
            prev.map((step, index) => {
              if (index === stepIndex) {
                return { ...step, status: 'running' as const }
              }
              return step
            })
          )

          // 模拟进度更新
          let progress = 0
          const progressInterval = setInterval(() => {
            progress += Math.random() * 20 + 5
            if (progress >= 100) {
              progress = 100
              clearInterval(progressInterval)

              setSteps((prev) =>
                prev.map((step, index) => {
                  if (index === stepIndex) {
                    return {
                      ...step,
                      status: 'completed' as const,
                      progress: 100
                    }
                  }
                  return step
                })
              )

              stepIndex++
              setCurrentStep(stepIndex)

              if (stepIndex < processSteps.length) {
                setTimeout(processStep, 500)
              } else {
                setIsProcessing(false)
              }
            } else {
              setSteps((prev) =>
                prev.map((step, index) => {
                  if (index === stepIndex) {
                    return { ...step, progress }
                  }
                  return step
                })
              )
            }
          }, 300)
        }
      }

      setTimeout(processStep, 1000)
    }
  }, [isVisible, processType])

  if (!isVisible) return null

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'running':
        return (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        )
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'running':
        return 'bg-blue-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getProcessTypeTitle = (type: string) => {
    switch (type) {
      case 'interview-check':
        return 'Interview Background Check + Evaluation'
      case 'interview-eval':
        return 'Interview Evaluation'
      case 'resume-check':
        return 'Resume Background Check'
      default:
        return 'Process'
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[110] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#161b22] rounded-lg border border-gray-700 w-full max-w-4xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {agentName} - Process
                </h2>
                <p className="text-sm text-gray-400">
                  {getProcessTypeTitle(processType)} • Real-time Processing
                </p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {/* Overall Progress */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Network className="w-5 h-5" />
                <span>Overall Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    Completed {currentStep} / {steps.length} steps
                  </span>
                  <span className="text-gray-300">
                    {Math.round((currentStep / steps.length) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(currentStep / steps.length) * 100}
                  className="h-2 bg-gray-700"
                />
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Running</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span>Pending</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step Details */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card
                key={step.id}
                className={`border-gray-700 ${
                  step.status === 'running'
                    ? 'bg-blue-950 border-blue-500'
                    : step.status === 'completed'
                    ? 'bg-green-950 border-green-500'
                    : 'bg-gray-800'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStepIcon(step.status)}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-white font-medium">
                            {step.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(
                              step.status
                            )} text-white text-xs`}
                          >
                            {step.status === 'pending'
                              ? 'Pending'
                              : step.status === 'running'
                              ? 'Running'
                              : step.status === 'completed'
                              ? 'Completed'
                              : 'Error'}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          {step.description}
                        </p>
                      </div>

                      {step.status !== 'pending' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Progress</span>
                            <span className="text-gray-300">
                              {Math.round(step.progress)}%
                            </span>
                          </div>
                          <Progress
                            value={step.progress}
                            className="h-1 bg-gray-700"
                          />
                        </div>
                      )}

                      {step.details && step.status !== 'pending' && (
                        <div className="space-y-2">
                          <h4 className="text-gray-300 text-sm font-medium">
                            Processing Details:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {step.details.map((detail, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2 text-xs"
                              >
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    step.status === 'completed'
                                      ? 'bg-green-500'
                                      : step.status === 'running' &&
                                        idx <= Math.floor(step.progress / 25)
                                      ? 'bg-blue-500'
                                      : 'bg-gray-500'
                                  }`}
                                ></div>
                                <span className="text-gray-300">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* System Resources */}
          <Card className="bg-gray-800 border-gray-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>System Resource Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">87%</div>
                  <div className="text-xs text-gray-400">CPU Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">2.1GB</div>
                  <div className="text-xs text-gray-400">Memory Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">45ms</div>
                  <div className="text-xs text-gray-400">Response Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
