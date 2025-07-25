'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Plus, Upload, CheckCircle, AlertCircle } from 'lucide-react'

interface NFTFormData {
  image: File | null
  candidateAddress: string
  employmentType: string
  position: string
  startDate: string
  endDate: string
  department: string
  location: string
  description: string
  evaluation: string
}

export default function NFTMintDialog() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [formData, setFormData] = useState<NFTFormData>({
    image: null,
    candidateAddress: '',
    employmentType: '',
    position: '',
    startDate: '',
    endDate: '',
    department: '',
    location: '',
    description: '',
    evaluation: ''
  })

  const handleInputChange = (field: keyof NFTFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: event.target.files![0] }))
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate random success/failure for demo
      if (Math.random() > 0.3) {
        setSubmitStatus('success')
        // Reset form on success
        setTimeout(() => {
          setFormData({
            image: null,
            candidateAddress: '',
            employmentType: '',
            position: '',
            startDate: '',
            endDate: '',
            department: '',
            location: '',
            description: '',
            evaluation: ''
          })
          setOpen(false)
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.candidateAddress &&
      formData.employmentType &&
      formData.position &&
      formData.startDate &&
      formData.endDate &&
      formData.department &&
      formData.description &&
      formData.evaluation
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:from-purple-700 hover:via-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Mint Work NFT
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Create Work Experience NFT
          </DialogTitle>
          <DialogDescription>
            Issue a blockchain-verified work experience certificate for the
            candidate
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Certificate Image
            </label>
            <div className="border-2 border-dashed border-gray-600/50 rounded-lg p-4 text-center hover:border-gray-500/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">
                  {formData.image
                    ? formData.image.name
                    : 'Click to upload certificate image'}
                </p>
              </label>
            </div>
          </div>

          {/* Candidate Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Candidate Wallet Address *
            </label>
            <Input
              placeholder="0x..."
              value={formData.candidateAddress}
              onChange={(e) =>
                handleInputChange('candidateAddress', e.target.value)
              }
              className="bg-gray-800/50 border-gray-600/50 text-white"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Employment Type *
            </label>
            <Select
              value={formData.employmentType}
              onValueChange={(value) =>
                handleInputChange('employmentType', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Position Title *
            </label>
            <Input
              placeholder="e.g., Software Engineer"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Date *
              </label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="bg-gray-800/50 border-gray-600/50 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Date *
              </label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="bg-gray-800/50 border-gray-600/50 text-white"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Department/Team *
            </label>
            <Input
              placeholder="e.g., Engineering Team"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location (Optional)
            </label>
            <Input
              placeholder="e.g., San Francisco, CA"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Work Description * (Max 300 characters)
            </label>
            <Textarea
              placeholder="Describe the main responsibilities and achievements..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              maxLength={300}
              className="bg-gray-800/50 border-gray-600/50 text-white min-h-[100px]"
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.description.length}/300 characters
            </p>
          </div>

          {/* Evaluation */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Performance Evaluation *
            </label>
            <Textarea
              placeholder="Overall performance assessment and feedback..."
              value={formData.evaluation}
              onChange={(e) => handleInputChange('evaluation', e.target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white min-h-[80px]"
            />
          </div>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20"
          >
            <CheckCircle className="w-5 h-5" />
            <span>
              NFT minted successfully! Transaction recorded on blockchain.
            </span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
          >
            <AlertCircle className="w-5 h-5" />
            <span>
              Failed to mint NFT. Please check your inputs and try again.
            </span>
          </motion.div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
            className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Minting...</span>
              </div>
            ) : (
              'Mint NFT'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
