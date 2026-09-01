"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Stepper } from "./Stepperr"
import { STEPS, type FormStep } from "../../types/compliance"
import GeneralInformationStep from "../../components/steps/general-information-step"
import DirectorsStep from "../../components/steps/directors-step"
import ShareholdersStep from "../../components/steps/shareholders-step"
import UBOsStep from "../../components/steps/ubos-step"
import FinancialInformationStep from "../../components/steps/financial-information-step"
import RiskInformationStep from "../../components/steps/risk-information-step"
import InterfaceStep from "../../components/steps/interface-step"
import ContactStep from "../../components/steps/contact-step"
import { dueDiligenceSchema } from "../compliance/schema"
import { ChevronLeft, ChevronRight, Loader, SendIcon, RefreshCcw, FileUpIcon, FileDown } from "lucide-react"
import { transformFormData } from "../compliance/transformFormData"
import { toast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
import DocumentsStep from "../../components/steps/DocumentsStep"
import IntroductionStep from "../../components/steps/introduction-step"
import { Toaster } from "../../components/ui/toaster"
import Statement from "../../components/steps/Statement"
import { complianceDefault } from "../../lib/utils"
import Link from "next/link"
import { useFormProgress } from "../../hooks/useFormProgress"
import { ProgressPopup } from "../ui/ProgressPopup"

type FormData = z.infer<typeof dueDiligenceSchema>

export default function DueDiligenceForm() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [showProgressPopup, setShowProgressPopup] = useState(false)
  const [hasCheckedProgress, setHasCheckedProgress] = useState(false)
  const [hasAcknowledged, setHasAcknowledged] = useState(false)

  const sendingMessages = [
    "Sending form, please wait...",
    "Processing your information securely...",
    "Processing files securely...",
    "¡Almost done! Don't close this window...",
  ]

  const VITE_COMPLIANCE = process.env.VITE_COMPLIANCE

  const touchFields = (fieldNames: string[]) => {
    fieldNames.forEach((field) => {
      methods.trigger(field as keyof FormData)
    })
  }

  const methods = useForm<FormData>({
    resolver: zodResolver(dueDiligenceSchema),
    defaultValues: complianceDefault() as Partial<FormData>,
    mode: "onChange",
  })

  const { saveProgress, hasSavedProgress, restoreProgress, clearProgress, loadProgress } = useFormProgress(
    methods,
    currentStep,
  )

  // Check for saved progress on component mount
  useEffect(() => {
    if (!hasCheckedProgress) {
      if (hasSavedProgress()) {
        setShowProgressPopup(true)
      }
      setHasCheckedProgress(true)
    }
  }, [hasSavedProgress, hasCheckedProgress])

  // Auto-save progress when form data changes
  //@ts-ignore
  useEffect(() => {
    if (hasCheckedProgress && !showProgressPopup) {
      let timeoutId: NodeJS.Timeout

      const subscription = methods.watch(() => {
        // Debounce the save operation
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          saveProgress()
        }, 1000) // Save after 1 second of inactivity
      })

      return () => {
        clearTimeout(timeoutId)
        subscription.unsubscribe()
      }
    }
  }, [methods, saveProgress, hasCheckedProgress, showProgressPopup])

  // Save progress when step changes
  useEffect(() => {
    if (hasCheckedProgress && !showProgressPopup) {
      saveProgress()
    }
  }, [currentStep, saveProgress, hasCheckedProgress, showProgressPopup])

  const handleAcceptProgress = () => {
    const restoredStep = restoreProgress()
    setCurrentStep(restoredStep)
    setShowProgressPopup(false)
    toast({
      title: "Progress Restored",
      description: "Your form has been restored to where you left off.",
      variant: "success",
    })
  }

  const handleCancelProgress = () => {
    clearProgress()
    setShowProgressPopup(false)
    methods.reset(complianceDefault() as Partial<FormData>)
    setCurrentStep(0)
  }

  const nextStep = async () => {
    const currentStepName = STEPS[currentStep]

    // Trigger validation to show field errors in red, but navigation is never blocked
    switch (currentStepName) {
      case "introduction":
        break
      case "general-information":
        methods.trigger("general_information")
        break
      case "directors":
        methods.trigger("directors")
        break
      case "shareholders":
        methods.trigger("shareholders")
        break
      case "ubos": {
        const uboType = methods.getValues("ubo_type")
        const ubos = methods.getValues("ubos")
        touchFields(["ubo_type"])
        methods.trigger("ubo_type")
        if (uboType === "regular") {
          touchFields(["ubo_count"])
          methods.trigger("ubo_count")
        }
        touchFields(["ubos"])
        methods.trigger("ubos")
        if (ubos && ubos.length > 0) {
          for (let i = 0; i < ubos.length; i++) {
            const ubo = ubos[i]
            if (ubo.ubo_numero === "gov") {
              touchFields([`ubos.${i}.ubo.ubo_name_gov`, `ubos.${i}.ubo.ubo_country_gov`])
              methods.trigger([`ubos.${i}.ubo.ubo_name_gov`, `ubos.${i}.ubo.ubo_country_gov`])
            } else if (ubo.ubo_numero === "ex") {
              touchFields([`ubos.${i}.ubo.ubo_name_ex`, `ubos.${i}.ubo.ubo_location_ex`])
              methods.trigger([`ubos.${i}.ubo.ubo_name_ex`, `ubos.${i}.ubo.ubo_location_ex`])
            } else {
              if (Array.isArray(ubo.ubo) && ubo.ubo.length > 0) {
                touchFields([
                  `ubos.${i}.ubo.0.ubo1_nacionalidad_n`,
                  `ubos.${i}.ubo.0.ubo1_pais_residencia_n`,
                  `ubos.${i}.ubo.0.ubo1_porc_part_n`,
                  `ubos.${i}.ubo.0.ubo1_pep_n`,
                ])
                methods.trigger([
                  `ubos.${i}.ubo.0.ubo1_nacionalidad_n`,
                  `ubos.${i}.ubo.0.ubo1_pais_residencia_n`,
                  `ubos.${i}.ubo.0.ubo1_porc_part_n`,
                  `ubos.${i}.ubo.0.ubo1_pep_n`,
                ])
              }
            }
          }
        }
        break
      }
      case "financial-information":
        methods.trigger(["detalle_fondos", "ingresos_actividad_principal", "ingresos_anuales_por_otras_activ"])
        break
      case "risk-information":
        methods.trigger(["Ragency_rating_name", "Ragency_rating_date", "Ragency_rating"])
        break
      case "interface":
        methods.trigger(["canal_de_ingreso", "otro_canal_ingreso"])
        break
      case "contact":
        methods.trigger(["nombre_contacto", "correo_electronico"])
        break
      case "documents":
        touchFields(["documents.uploaded_files"])
        methods.trigger("documents.uploaded_files")
        break
      case "statement":
        touchFields(["statement.statement_agreement"])
        methods.trigger("statement.statement_agreement")
        break
      default:
        break
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    if (currentStep === STEPS.length - 1) {
      setHasAcknowledged(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true)
    setHasAcknowledged(false)

    // Validate all form fields across all steps before submitting
    const isFormValid = await methods.trigger()
    if (!isFormValid) {
      const errors = methods.formState.errors
      const stepErrorMap: { stepName: FormStep; label: string; fields: string[] }[] = [
        { stepName: "general-information", label: "General Information", fields: ["general_information"] },
        { stepName: "directors", label: "Directors", fields: ["directors", "d_numero"] },
        { stepName: "shareholders", label: "Shareholders", fields: ["shareholders", "acc_numero"] },
        { stepName: "ubos", label: "UBOs", fields: ["ubos", "ubo_type", "ubo_count"] },
        { stepName: "financial-information", label: "Financial Information", fields: ["detalle_fondos", "ingresos_actividad_principal", "ingresos_anuales_por_otras_activ"] },
        { stepName: "risk-information", label: "Risk Information", fields: ["Ragency_rating_name", "Ragency_rating_date", "Ragency_rating"] },
        { stepName: "interface", label: "Interface", fields: ["canal_de_ingreso", "otro_canal_ingreso"] },
        { stepName: "contact", label: "Contact", fields: ["nombre_contacto", "correo_electronico"] },
        { stepName: "documents", label: "Documents", fields: ["documents"] },
        { stepName: "statement", label: "Statement", fields: ["statement"] },
      ]
      const failingSteps = stepErrorMap.filter(({ fields }) => fields.some((f) => f in errors))
      if (failingSteps.length > 0) {
        const firstFailingIndex = STEPS.indexOf(failingSteps[0].stepName)
        if (firstFailingIndex !== -1) {
          setCurrentStep(firstFailingIndex)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      }
      toast({
        title: "Required fields missing",
        description: failingSteps.length > 0
          ? `Please review the following sections: ${failingSteps.map((s) => s.label).join(", ")}.`
          : "Please review all steps and complete the required fields before submitting.",
        variant: "error",
      })
      setIsSubmitting(false)
      return
    }

    const data = methods.getValues()
    const { documents, ...dataWithoutDocuments } = data
    const dataTransformed = transformFormData(dataWithoutDocuments)

    try {
      const response = await fetch("https://prod-174.westus.logic.azure.com:443/workflows/3ee8d52748de4aaea30efb1f6abdfd62/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UPr0Z_0QqbjITnk2Kn5B-T2uS48P5yfTzfo23Bj5cSY", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataTransformed)
      })
      const text = await response.text()
      let result = null
      try {
        result = text ? JSON.parse(text) : null
      } catch (err) {
        result = null
      }
      const file1 = documents?.uploaded_files || []
      if (file1.length > 0) {
        for (const item of file1) {
          const fileAsBase64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              const result = reader.result as string
              const base64 = result.includes(",") ? result.split(",")[1] : result
              resolve(base64)
            }
            reader.onerror = reject
            reader.readAsDataURL(item)
          })
          await fetch("https://prod-09.westus.logic.azure.com:443/workflows/bde3c571373d4b098e80e2d4ca847f68/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_MKPe_fsAFcAjMPv4VD60I98h6Us6wblwUFXQUHAokE", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              company: dataTransformed?.razon_social || "",
              name: item.name,
              type: item.type,
              data: fileAsBase64,
              env: VITE_COMPLIANCE
            }),
          })
        }
        toast({ title: "Form sent successfully!", description: "The form has been sent successfully.", variant: "success", })

        // Clear progress after successful submission
        clearProgress()

        // Reset form and state only on success
        methods.reset()
        setCurrentStep(0)
      } else {
        toast({ title: "Warning", description: "You must add files before sending.", variant: "error", })
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while sending the form.", variant: "error", })
    }

    setIsSubmitting(false)
  }

  const handleDownloadProgress = () => {
    try {
      // Get current form data
      const formData = methods.getValues()

      // Upload files to server
      const serializableData = {
        ...formData,
        documents: {
          // to do: include files in JSON
          // uploaded_files: formData.documents.uploaded_files.map((file) => ({
          //   name: file.name,
          //   type: file.type,
          //   size: file.size,
          //   lastModified: file.lastModified,
          // })),
        },
      }
      const jsonData = JSON.stringify(serializableData, null, 2)
      const blob = new Blob([jsonData], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url

      const date = new Date()
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      const formattedTime = `${String(date.getHours()).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}`
      a.download = `${formData?.general_information?.razon_social}-due-diligence-progress_${formattedDate}_${formattedTime}.json`

      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      console.log("Progress saved")
      toast({
        title: "Progress saved",
        description: "The progress form has been downloaded successfully.",
        variant: "success",
      })
    } catch (error) {
      console.error("Error al guardar el progreso:", error)
      toast({ title: "Error", description: "Could not save the progress form.", variant: "error" })
    }
  }

  const handleUploadProgress = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const parsedData = JSON.parse(content)

        if (!parsedData.general_information) {
          toast({ title: "Error", description: "The file does not contain valid form data.", variant: "error" })
        }
        methods.reset({
          ...parsedData,
          documents: {
            uploaded_files: [],
          },
        })

        toast({
          title: "Progress loaded",
          description: "The form has been restored with the saved data.",
          variant: "success",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "The selected file is not valid.",
          variant: "error",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }
    reader.readAsText(file)
    event.target.value = ""
  }

  const renderStep = () => {
    const currentStepName = STEPS[currentStep]

    switch (currentStepName) {
      case "introduction":
        return <IntroductionStep />
      case "general-information":
        return <GeneralInformationStep />
      case "directors":
        return <DirectorsStep />
      case "shareholders":
        return <ShareholdersStep />
      case "ubos":
        return <UBOsStep />
      case "financial-information":
        return <FinancialInformationStep />
      case "risk-information":
        return <RiskInformationStep />
      case "interface":
        return <InterfaceStep />
      case "contact":
        return <ContactStep />
      case "documents":
        return <DocumentsStep />
      case "statement":
        return <Statement />
      default:
        return null
    }
  }
  //@ts-ignore
  useEffect(() => {
    if (isSubmitting) {
      setMessageIndex(0)
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % sendingMessages.length)
      }, 20000)
      return () => clearInterval(interval)
    }
  }, [isSubmitting])

  const statementAgreement = methods.watch("statement.statement_agreement")
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(e)
  }

  // Get last saved timestamp for popup
  const progressData = loadProgress()
  const lastSaved = progressData ? new Date(progressData.timestamp) : undefined

  return (
    <FormProvider {...methods}>
      <ProgressPopup
        isOpen={showProgressPopup}
        onAccept={handleAcceptProgress}
        onCancel={handleCancelProgress}
        lastSaved={lastSaved}
      />

      {isSubmitting && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
          <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-8 shadow-lg">
            <Loader className="animate-spin h-8 w-8 text-primary-500" />
            <p>{sendingMessages[messageIndex]}</p>
            <p className="text-sm text-gray-600 text-center max-w-md">
              Please do not close this window until the form has been submitted successfully.
            </p>
          </div>
        </div>
      )}
      <Toaster />
      <form autoComplete="off" onSubmit={onFormSubmit}>
        <Stepper
          steps={STEPS}
          currentStep={currentStep}
          onPrevious={prevStep}
          onNext={nextStep}
          isLastStep={currentStep === STEPS.length - 1}
          isSubmitting={isSubmitting}
          statementAgreement={statementAgreement}
          onDownload={handleDownloadProgress}
          onUpload={handleUploadProgress}
          onClear={() => { setCurrentStep(0); methods.reset() }}
        />
        <section className="pb-24 px-4 md:px-8 xl:pb-12 max-w-4xl md:max-w-3xl mx-auto min-h-screen">
          <Link href="/compliance">
            <span className="text-secondary-500 hover:text-primary-500 cursor-pointer font-semibold text-lg">
              <ChevronLeft className="inline-block h-6 w-6" />
              Compliance
            </span>
          </Link>
          <div className="mt-8 p-6 bg-white rounded-lg shadow">
            {renderStep()}
            <div className="flex justify-between mt-6">
              <div
                className="flex items-center cursor-pointer gap-2 bg-primary-500 text-white p-2 rounded-md"
                onClick={prevStep}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </div>

              {currentStep === STEPS.length - 1 ? (
                <div className="flex items-center gap-2 bg-primary-500 text-white p-2 rounded-md">
                  <button type="submit" className="pl-2" disabled={isSubmitting || !statementAgreement}>
                    Send Form
                  </button>
                  <SendIcon className="h-4 w-4" />
                </div>
              ) : (
                <div
                  className="flex items-center cursor-pointer gap-2 bg-primary-500 text-white p-2 rounded-md"
                  onClick={nextStep}
                >
                  <span>Next Step</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        </section>
      </form>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
    </FormProvider>
  )
}
