"use client"
import { useState } from "react"
import { Button } from "./button"
import { RefreshCcw, Plus, X, FileUpIcon, FileDown, Menu } from "lucide-react"
import { cn } from "../../lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"

interface SpeedDialProps {
  onDownload: () => void
  onUpload: () => void
  setcurrentStep: (step: number) => void
  methods: any
}

export function SpeedDial({ onDownload, onUpload, setcurrentStep, methods }: SpeedDialProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(!isMobile)

  const toggleDial = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <div
        className={cn(
          "flex flex-col-reverse items-end gap-2 transition-all duration-300 mt-2",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        )}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {isOpen && (
          <>
        <Button
          onClick={() => {
            setcurrentStep(0)
            methods.reset()
            setIsOpen(false)
          }}
          size="lg"
          className="flex items-center gap-3 px-6 py-3 rounded-lg bg-primary-500 hover:bg-celeste-700 shadow-lg mb-4"
          title="Reset form"
        >
          <RefreshCcw className="h-10 w-10 text-white" />
          <span className="text-white font-semibold text-lg">Reset Form</span>
        </Button>
        <Button
          onClick={() => {
            onUpload()
            setIsOpen(false)
          }}
          size="lg"
          className="flex items-center gap-3 px-6 py-3 rounded-lg bg-primary-500 hover:bg-celeste-700 shadow-lg mb-2"
          title="Upload progress"
        >
          <FileUpIcon className="h-10 w-10 text-white" />
          <span className="text-white font-semibold text-lg">Upload Progress</span>
        </Button>
        <Button
          onClick={() => {
            onDownload()
            setIsOpen(false)
          }}
          size="lg"
          className="flex items-center gap-3 px-6 py-3 rounded-lg bg-primary-500 hover:bg-celeste-700 shadow-lg mb-4"
          title="Download progress"
        >
          <FileDown className="h-10 w-10 text-white" />
          <span className="text-white font-semibold text-lg">Download Progress</span>
        </Button>
          </>
        )}
      </div>
      <Button
        onClick={toggleDial}
        size="icon"
        className={cn(
          "rounded-full shadow-lg transition-all duration-300 transform",
          isOpen ? "bg-primary-500 hover:bg-celeste-700 rotate-45" : "bg-secondary-600 hover:bg-secondary-500",
        )}
        style={{ width: "60px", height: "60px", marginTop: isOpen ? "8px" : "0" }}
      >
        <div className="m-auto text-center p-5 ">
          <Menu className="text-white text-center" />
        </div>
      </Button>

    </div>
  )
}
