
import { Check, ChevronLeft, ChevronRight, FileDown, FileUpIcon, RefreshCcw, SendIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { type FormStep, STEP_TITLES } from "../../types/compliance"
import { Button } from "../ui/button"

import { useMediaQuery } from "../../hooks/useMediaQuery"
import Link  from "next/link"
import Image from "next/image"

interface StepperProps {
  steps: FormStep[]
  currentStep: number
  onPrevious: () => void
  onNext: () => void
  isLastStep: boolean
  isSubmitting?: boolean
  statementAgreement?: boolean
  onDownload: () => void
  onUpload: () => void
  onClear: () => void
}

export function Stepper({ steps, currentStep, onPrevious, onNext, isLastStep, isSubmitting, statementAgreement, onDownload, onUpload, onClear }: StepperProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const currentStepName = steps[currentStep]
  const nextStepName = currentStep < steps.length - 1 ? steps[currentStep + 1] : null
  return (
    <div className="sticky top-0 z-30 w-full shadow-sm">
    <div className="w-full bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-2 min-w-0">
        <Button variant="ghost" disabled={currentStep === 0} className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            onPrevious();
          }}>
          {currentStep > 0 && <ChevronLeft className="h-4 w-4" />}
          {currentStep > 0 && <span className="hidden sm:inline">Previous</span>}
        </Button>
        <div className="flex items-center gap-2">
          <div className={cn("flex items-center justify-center w-8 h-8 rounded-full shrink-0", "bg-primary-500 text-white")}>
            {currentStep + 1}
          </div>
          <div className="font-medium">step {currentStep + 1}/{steps.length}</div>
        </div>
      </div>
      <div className="flex-1 flex justify-end place-items-end gap-2">
        {!isMobile && (
          <>
            <Link href="/" className={isMobile ? "self-start" : ""}>
              <Image src="/images/logo4.png" alt="Active RE" width={100} height={48} className="w-auto" />
            </Link>
          </>
        )}
      </div>

      <div className="flex flex-1 justify-end">
        <Button
          variant="ghost"
          onClick={isLastStep && statementAgreement ? undefined : onNext}
          disabled={isSubmitting}
          className="flex items-center gap-2"
          type={isLastStep && statementAgreement ? "submit" : "button"}
        >
          {isLastStep ? (
            <>
              <div className="flex items-center gap-2 bg-primary-500 text-white p-2 rounded-md">
                <span>Send Form</span>
                <SendIcon className="h-4 w-4" />
              </div>
              {isSubmitting && <span className="ml-2 animate-spin">⟳</span>}
            </>
          ) : (
            <>
              <span className="flex items-center gap-2 bg-primary-500 text-white p-2 rounded-md">
                <span className="hidden sm:inline">Next: {nextStepName && STEP_TITLES[nextStepName]}</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="h-4 w-4" />
              </span>
            </>
          )}
        </Button>
      </div>
    </div>
    <div className="w-full bg-gray-50 border-b py-2 px-6 flex items-center justify-center gap-6">
      <button
        type="button"
        onClick={onDownload}
        className="flex items-center gap-2 text-xl text-primary-500 hover:text-gray-600 transition-colors"
      >
        <FileDown className="h-4 w-4" />
        <span>Download</span>
      </button>
      <button
        type="button"
        onClick={onUpload}
        className="flex items-center gap-2 text-xl text-primary-500 hover:text-gray-600 transition-colors"
      >
        <FileUpIcon className="h-4 w-4" />
        <span>Upload</span>
      </button>
      <button
        type="button"
        onClick={onClear}
        className="flex items-center gap-2 text-xl text-primary-500 hover:text-gray-600 transition-colors"
      >
        <RefreshCcw className="h-4 w-4" />
        <span>Clear Form</span>
      </button>
    </div>
  </div>
  )

}