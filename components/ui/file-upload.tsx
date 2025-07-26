'use client'

import React, { useCallback, useState } from 'react'
import { Upload, FileText, X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFileSelect: (file: File, content: string) => void
  accept?: string
  label: string
  required?: boolean
  currentFile?: string
  className?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '.txt,.pdf,.doc,.docx',
  label,
  required = false,
  currentFile,
  className
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string>(currentFile || '')

  const processFile = useCallback(
    async (file: File) => {
      setIsUploading(true)
      try {
        // 使用 Promise 包装文件读取
        const fileContent = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.onerror = reject
          reader.readAsText(file)
        })

        setUploadedFile(file.name)
        onFileSelect(file, fileContent)
      } catch (error) {
        console.error('File upload error:', error)
      } finally {
        setIsUploading(false)
      }
    },
    [onFileSelect]
  )

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        processFile(file)
      }
    },
    [processFile]
  )

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      setIsDragOver(false)

      const file = event.dataTransfer.files[0]
      if (file) {
        processFile(file)
      }
    },
    [processFile]
  )

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }, [])

  const clearFile = useCallback(() => {
    setUploadedFile('')
  }, [])

  return (
    <Card className={cn('bg-gray-800 border-gray-700', className)}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white">{label}</span>
          {required && (
            <Badge variant="destructive" className="text-xs">
              Required
            </Badge>
          )}
        </div>

        {uploadedFile ? (
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md border border-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <FileText className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-white truncate">
                {uploadedFile}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFile}
              className="h-6 w-6 p-0 hover:bg-gray-600"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              'relative border-2 border-dashed rounded-md p-4 transition-colors cursor-pointer',
              isDragOver
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-600 hover:border-gray-500',
              isUploading && 'pointer-events-none opacity-50'
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              disabled={isUploading}
            />

            <div className="flex flex-col items-center justify-center space-y-2">
              {isUploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
              ) : (
                <Upload className="w-6 h-6 text-gray-400" />
              )}

              <div className="text-center">
                <p className="text-xs text-gray-300">
                  {isUploading
                    ? 'Processing...'
                    : 'Click to upload or drag & drop'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports: TXT, PDF, DOC, DOCX
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
