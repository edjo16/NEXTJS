// this component is not already in use, but it is designed to be used in a compliance form
import { Check, Lock } from "lucide-react"
import { cn } from "../../lib/utils"
import { STEPS, STEP_TITLES, type FormStep } from "../../types/compliance"

interface StepNavigationProps {
  currentStep: number
  onStepClick: (stepIndex: number) => void
  completedSteps: boolean[]
  validatedSteps: boolean[]
}

export function StepNavigation({ 
  currentStep, 
  onStepClick, 
  completedSteps, 
  validatedSteps 
}: StepNavigationProps) {
  
  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep && completedSteps[stepIndex]) {
      return 'completed'
    }
    if (stepIndex === currentStep) {
      return 'current'
    }
    if (stepIndex <= currentStep || validatedSteps[stepIndex]) {
      return 'accessible'
    }
    return 'locked'
  }

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white border-green-500'
      case 'current':
        return 'bg-primary-500 text-white border-primary-500'
      case 'accessible':
        return 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
      case 'locked':
        return 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
      default:
        return 'bg-white text-gray-700 border-gray-300'
    }
  }

  const canNavigateToStep = (stepIndex: number) => {
    const status = getStepStatus(stepIndex)
    return status !== 'locked'
  }

  return (
    <div className="w-full bg-white border-t border-gray-200 p-6 mt-8">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {STEPS.map((step, index) => {
            const status = getStepStatus(index)
            const canNavigate = canNavigateToStep(index)
            
            return (
              <button
                key={step}
                onClick={() => canNavigate && onStepClick(index)}
                disabled={!canNavigate}
                className={cn(
                  "relative flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 min-h-[100px]",
                  getStepColor(status),
                  canNavigate && "hover:shadow-md transform hover:-translate-y-1"
                )}
                title={canNavigate ? `Go to ${STEP_TITLES[step]}` : `Complete previous steps to unlock`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full mb-2">
                  {status === 'completed' ? (
                    <Check className="h-5 w-5" />
                  ) : status === 'locked' ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                
                <span className={cn(
                  "text-xs font-medium text-center leading-tight",
                  status === 'locked' && "text-gray-400"
                )}>
                  {STEP_TITLES[step]}
                </span>
                
                {status === 'current' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                )}
              </button>
            )
          })}
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border-2 border-gray-200 rounded-full"></div>
            <span>Locked</span>
          </div>
        </div>
      </div>
    </div>
  )
}