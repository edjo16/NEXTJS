'use client'

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import { X, Upload, FileText, ImageIcon, FileSpreadsheet } from "lucide-react"
import { cn } from "../../lib/utils"
import { useToast } from "../ui/use-toast"
interface FileUploadProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  maxSize?: number
  acceptedTypes?: string[]
  className?: string
}

export function FileUpload({
  files,
  onFilesChange,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "image/bmp",
    "image/tiff",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/gif",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const { toast } = useToast()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > maxSize) {
          return false
        }
        if (!acceptedTypes.includes(file.type)) {
          return false
        }
        return true
      })
      onFilesChange([...files, ...validFiles])
    },
    [files, onFilesChange, maxSize, acceptedTypes],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: (fileRejections) => {
    fileRejections.forEach(rejection => {
      rejection.errors.forEach(error => {
        if (error.code === "file-too-large") {
          toast({
            title: "File size exceeded",
            description: `The file ${rejection.file.name} exceeds the maximum size of ${maxSize / (1024 * 1024)}MB`,
            variant: "error"
          })
        } else if (error.code === "file-invalid-type") {
          toast({
            title: "File type not allowed",
            description: `The file type ${rejection.file.name} is not allowed`,
            variant: "error"
          })
        } else {
          toast({
            title: "File rejected",
            description: error.message,
            variant: "error"
          })
        }
      })
    })
  },
    accept: acceptedTypes.reduce(
      (acc, type) => {
        acc[type] = []
        return acc
      },
      {} as Record<string, string[]>,
    ),
    maxSize,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onFilesChange(newFiles)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />
    } else if (file.type.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" />
    } else if (file.type.includes("sheet") || file.type.includes("excel")) {
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />
    } else {
      return <FileText className="h-5 w-5 text-gray-500" />
    }
  }


  return (
    <>
    <div className={cn("grid grid-cols-1 gap-6", className)}>
      {/* Drag & Drop Area */}
      <div>
        <Card className="border-2 border-dashed border-gray-400 hover:border-primary-500 transition-colors">
          <CardContent className="p-2">
            <div
              {...getRootProps()}
              className={cn(
                "flex flex-col items-center justify-center min-h-[100px] cursor-pointer rounded-lg transition-colors",
                isDragActive || dragActive ? "bg-celeste-50 border-celeste-300" : "hover:bg-gray-50",
              )}
            >
              <input {...getInputProps()} />
              <Upload
                className={cn("h-8 w-8 mb-1", isDragActive || dragActive ? "text-primary-500" : "text-gray-400")}
              />
              <p className="text-sm font-medium text-gray-700 mb-2">
                {isDragActive ? "Drop files here" : "Drag files here"}
              </p>
              <p className="text-xs text-gray-500 text-center">or click to select files</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Files List */}
      <div>
        <h3 className="text-sm font-medium mb-4">Files uploaded ({files.length})</h3>
        <div className="space-y-2">
          {files.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-4">
                <p className="text-gray-500 text-center">No files selected</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-4">
            {files.map((file, index) => (
              <Card key={index} className="border">
                <CardContent className="p-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">
                          {file.name.length > 45 ? file.name.slice(0, 45) + "..." : file.name}
                          </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
