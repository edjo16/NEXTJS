"use client";

// this component is not already in use, but it is designed to be used in a compliance form
import { useCallback, useState, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { STEPS } from '../types/compliance'

export function useStepValidation(methods: UseFormReturn<any>) {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(STEPS.length).fill(false))
  const [validatedSteps, setValidatedSteps] = useState<boolean[]>(new Array(STEPS.length).fill(false))

  const touchFields = useCallback((fieldNames: string[]) => {
    fieldNames.forEach((field) => {
      methods.trigger(field as any)
    })
  }, [methods])

  const validateStep = useCallback(async (stepIndex: number): Promise<boolean> => {
    const currentStepName = STEPS[stepIndex]
    let isValid = false

    switch (currentStepName) {
      case "general-information":
        isValid = await methods.trigger("general_information")
        break
      case "directors":
        isValid = await methods.trigger("directors")
        break
      case "shareholders":
        isValid = await methods.trigger("shareholders")
        break
      case "ubos":
        const uboType = methods.getValues("ubo_type")
        const ubos = methods.getValues("ubos")
        touchFields(["ubo_type"])
        let uboTypeValid = await methods.trigger("ubo_type")
        if (uboType === "regular") {
          touchFields(["ubo_count"])
          const uboCountValid = await methods.trigger("ubo_count")
          uboTypeValid = uboTypeValid && uboCountValid
        }
        touchFields(["ubos"])
        const ubosValid = await methods.trigger("ubos")
        if (ubos && ubos.length > 0) {
          for (let i = 0; i < ubos.length; i++) {
            const ubo = ubos[i]
            if (ubo.ubo_numero === "gov") {
              touchFields([`ubos.${i}.ubo.ubo_name_gov`, `ubos.${i}.ubo.ubo_country_gov`])
              await methods.trigger([`ubos.${i}.ubo.ubo_name_gov`, `ubos.${i}.ubo.ubo_country_gov`])
            } else if (ubo.ubo_numero === "ex") {
              touchFields([`ubos.${i}.ubo.ubo_name_ex`, `ubos.${i}.ubo.ubo_location_ex`])
              await methods.trigger([`ubos.${i}.ubo.ubo_name_ex`, `ubos.${i}.ubo.ubo_location_ex`])
            } else {
              if (Array.isArray(ubo.ubo) && ubo.ubo.length > 0) {
                touchFields([
                  `ubos.${i}.ubo.0.ubo1_nacionalidad_n`,
                  `ubos.${i}.ubo.0.ubo1_pais_residencia_n`,
                  `ubos.${i}.ubo.0.ubo1_porc_part_n`,
                  `ubos.${i}.ubo.0.ubo1_pep_n`,
                ])
                await methods.trigger([
                  `ubos.${i}.ubo.0.ubo1_nacionalidad_n`,
                  `ubos.${i}.ubo.0.ubo1_pais_residencia_n`,
                  `ubos.${i}.ubo.0.ubo1_porc_part_n`,
                  `ubos.${i}.ubo.0.ubo1_pep_n`,
                ])
              }
            }
          }
        }
        isValid = uboTypeValid && ubosValid
        break
      case "financial-information":
        isValid = await methods.trigger([
          "detalle_fondos",
          "ingresos_actividad_principal",
          "ingresos_anuales_por_otras_activ",
        ])
        break
      case "risk-information":
        isValid = await methods.trigger(["Ragency_rating_name", "Ragency_rating_date", "Ragency_rating"])
        break
      case "interface":
        isValid = await methods.trigger(["canal_de_ingreso", "otro_canal_ingreso"])
        break
      case "contact":
        isValid = await methods.trigger(["nombre_contacto", "correo_electronico"])
        break
      case "documents":
        touchFields(["documents.uploaded_files"])
        isValid = await methods.trigger("documents.uploaded_files")
        break
      case "statement":
        isValid = true
        break
      default:
        isValid = true
    }

    return isValid
  }, [methods, touchFields])

  const updateStepValidation = useCallback(async (currentStep: number) => {
    const newValidatedSteps = [...validatedSteps]
    const newCompletedSteps = [...completedSteps]

    // Validate current step
    const isCurrentStepValid = await validateStep(currentStep)
    newValidatedSteps[currentStep] = isCurrentStepValid
    
    // Mark previous steps as completed if they were valid
    for (let i = 0; i < currentStep; i++) {
      if (newValidatedSteps[i]) {
        newCompletedSteps[i] = true
      }
    }

    setValidatedSteps(newValidatedSteps)
    setCompletedSteps(newCompletedSteps)

    return isCurrentStepValid
  }, [validateStep, validatedSteps, completedSteps])

  const canNavigateToStep = useCallback((targetStep: number, currentStep: number): boolean => {
    // Can always go to current step or previous completed steps
    if (targetStep <= currentStep) {
      return true
    }
    
    // Can go to next step if current step is valid
    if (targetStep === currentStep + 1 && validatedSteps[currentStep]) {
      return true
    }
    
    // Can go to any step if all previous steps are completed
    for (let i = 0; i < targetStep; i++) {
      if (!completedSteps[i] && i < currentStep) {
        return false
      }
    }
    
    return true
  }, [validatedSteps, completedSteps])

  // Update validation when form data changes
  useEffect(() => {
    const subscription = methods.watch(() => {
      // Debounce validation updates
      const timeoutId = setTimeout(() => {
        // This will be called when form data changes
      }, 500)

      return () => clearTimeout(timeoutId)
    })

    return subscription.unsubscribe
  }, [methods])

  return {
    completedSteps,
    validatedSteps,
    validateStep,
    updateStepValidation,
    canNavigateToStep,
  }
}