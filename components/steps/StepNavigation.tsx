"use client"

import { Button } from "../../components/ui/button"
import { ChevronRight } from "lucide-react"

interface StepNavigationProps {
  onNext: () => void
  isLastStep: boolean
  isSubmitting?: boolean
}

export function StepNavigation({ onNext, isLastStep, isSubmitting }: StepNavigationProps) {
  return (
    <div className="flex justify-end mt-8">
      <Button onClick={onNext} disabled={isSubmitting} className="flex items-center gap-2">
        {isLastStep ? (
          <>
            <span>Enviar formulario</span>
            {isSubmitting && <span className="ml-2 animate-spin">⟳</span>}
          </>
        ) : (
          <>
            <span>Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  )
}