"use client"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../..//components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChevronUp,ChevronDown, MessageCircleWarningIcon } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { FloatingLabelInput } from "../../components/ui/floating-label-input"
import { FloatingLabelSelect } from "../../components/ui/floating-label-select"
import { pepOptions, paisesOptions } from "./options"
import { cn } from "../../lib/utils"
import { Label } from "../ui/label"
import { useKyc } from "../../context/KycContext";

export default function UBOsStep() {
  const { control, watch, setValue, formState: { errors } } = useFormContext()
  const { fields_key } = useKyc();
  const ubos = watch("ubos") || []
  const uboType = watch("ubo_type") || "regular"
  const uboCount = watch("ubo_count") ?? ""
  const pepOptions = fields_key?.mpep
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})
  const countries = fields_key?.countries || []

  const isUBOComplete = (index: number): boolean => {
    const ubo = ubos[index]
    if (!ubo || !ubo.ubo_numero) return false

    if (ubo.ubo_numero === "gov") {
      const requiredFields = ["ubo_name_gov", "ubo_country_gov"]
      for (const field of requiredFields) {
        const value = ubo.ubo[field]
        if (!value || value.trim() === "") {
          return false
        }
      }
      return true
    } else if (ubo.ubo_numero === "ex") {
      const requiredFields = ["ubo_name_ex", "ubo_location_ex"]
      for (const field of requiredFields) {
        const value = ubo.ubo[field]
        if (!value || value.trim() === "") {
          return false
        }
      }
      return true
    } else {
      const uboData = ubo.ubo[0]
      if (!uboData) return false

      const requiredFields = ["ubo1_nombre_n", "ubo1_nacionalidad_n", "ubo1_pais_residencia_n", "ubo1_porc_part_n", "ubo1_pep_n"]

      for (const field of requiredFields) {
        const value = uboData[field]
        if (!value || value.trim() === "") {
          return false
        }
      }

      return true
    }
  }
  // references to track previous values
  const prevUboType = useRef(uboType)
  const prevUboCount = useRef(uboCount)
  const isInitialized = useRef(false)

  // Inicialize values if they don't exist
  useEffect(() => {
    if (!uboType) {
      setValue("ubo_type", "")
    }
    if (!Array.isArray(ubos)) {
      setValue("ubos", [])
    }

    // expand existing cards
    if (ubos.length > 0) {
      const newExpandedCards: Record<number, boolean> = {}
      ubos.forEach((_: any, index: number) => {
        newExpandedCards[index] = true
      })
      setExpandedCards(newExpandedCards)
    }

    isInitialized.current = true
  }, [])

  useEffect(() => {
    // do nothing if it's not initialized or if the values haven't changed really
    if (!isInitialized.current) return

    const typeChanged = prevUboType.current !== uboType
    const countChanged = prevUboCount.current !== uboCount

    // only regenerate if el tipo cambió o si el número cambió para regular
    if (!typeChanged && (!countChanged || uboType !== "regular")) return

    // update the references
    prevUboType.current = uboType
    prevUboCount.current = uboCount

    // clear all existing cards si el tipo cambió
    if (typeChanged && fields.length > 0) {
      for (let i = fields.length - 1; i >= 0; i--) {
        remove(i)
      }
    }

    // generate new cards según el tipo seleccionado
    if (uboType === "gov") {
      if (typeChanged) {
        setValue("ubo_count", undefined)
        append({
          ubo_numero: "gov",
          ubo: {
            ubo_name_gov: "",
            ubo_country_gov: "",
          },
        })
        setExpandedCards({ 0: true })
      }
    } else if (uboType === "ex") {
      if (typeChanged) {
        setValue("ubo_count", undefined)
        append({
          ubo_numero: "ex",
          ubo: {
            ubo_name_ex: "",
            ubo_location_ex: "",
          },
        })
        setExpandedCards({ 0: true })
      }
    } else if (uboType === "regular") {
      // Si el tipo cambió a regular, reiniciar ubo_count a ''
      if (typeChanged) {
        setValue("ubo_count", "")
      }
      // Solo crear UBOs si el usuario ya seleccionó una cantidad válida
      if (!uboCount || isNaN(Number(uboCount)) || Number(uboCount) < 1) return;
      const count = Number(uboCount);
      const currentLength = fields.length;
      if (currentLength < count) {
        for (let i = currentLength; i < count; i++) {
          append({
            ubo_numero: (i + 1).toString(),
            ubo: [
              {
                ubo1_nombre_n: "",
                ubo1_cedula_n: "",
                ubo1_email_n: "",
                ubo1_fec_nac_n: "",
                ubo1_pais_nac_n: "",
                ubo1_nacionalidad_n: "",
                ubo1_pais_residencia_n: "",
                ubo1_porc_part_n: "",
                ubo1_pep_n: "",
              },
            ],
          })
          setExpandedCards((prev) => ({ ...prev, [i]: false }))
        }
      } else if (currentLength > count) {
        for (let i = currentLength - 1; i >= count; i--) {
          remove(i)
          setExpandedCards((prev) => {
            const newState = { ...prev }
            delete newState[i]
            return newState
          })
        }
      }
    }
  }, [uboType, uboCount])

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ubos",
  })

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }


  const handleUboCountChange = (newCount: number) => {
    setValue("ubo_count", newCount)
  }

  const renderUBOFields = (index: number, type: "gov" | "ex" | "regular") => {
    if (!expandedCards[index]) return null

    if (type === "gov") {
      return (
        <div className="space-y-4 mt-4">
          <FormField
            control={control}
            name={`ubos.${index}.ubo.ubo_name_gov`}
            render={({ field }) => (
              <FloatingLabelInput label="What is the name of the state/governmental controller entity?*" {...field} />
            )}
          />

          <FormField
            control={control}
            name={`ubos.${index}.ubo.ubo_country_gov`}
            render={({ field }) => (
              <FloatingLabelSelect
                label="Which country is the state/governmental controller entity located in?*"
                name={`ubos.${index}.ubo.ubo_country_gov`}
                options={countries}
              />
            )}
          />
        </div>
      )
    } else if (type === "ex") {
      return (
        <div className="space-y-4 mt-4">
          <FormField
            control={control}
            name={`ubos.${index}.ubo.ubo_name_ex`}
            render={({ field }) => (
              <FloatingLabelInput label="What is the name of the Stock Exchange?*" {...field} />
            )}
          />

          <FormField
            control={control}
            name={`ubos.${index}.ubo.ubo_location_ex`}
            render={({ field }) => (
                <FloatingLabelSelect
                label="Which country is the exchange entity located in?*"
                name={`ubos.${index}.ubo.ubo_location_ex`}
                options={countries}
              />
            )}
          />
        </div>
      )
    } else {
      return (
        <div className="space-y-4 mt-4">
          <FormField
            control={control}
            name={`ubos.${index}.ubo.0.ubo1_nombre_n`}
            render={({ field }) => (
              <FloatingLabelInput label="Legal Name (as shown in your passport)*" {...field} />
            )}
          />

          <FormField
            control={control}
            name={`ubos.${index}.ubo.0.ubo1_cedula_n`}
            render={({ field }) => (
              <FloatingLabelInput label="Official resident goverment-issued ID or Passport Number" {...field} />
            )}
          />

          <FormField
            control={control}
            name={`ubos.${index}.ubo.0.ubo1_email_n`}
            render={({ field }) => (
              <FloatingLabelInput label="Email Address"  type="email" {...field} />
            )}
          />

          <FormField
            control={control}
            name={`ubos.${index}.ubo.0.ubo1_fec_nac_n`}
            render={({ field }) => (
              <FloatingLabelInput
                label="Date of Birth"
                type="date"
                {...field}
                max={new Date().toISOString().split('T')[0]} 
              />
            )}
          />

          <FormField
            control={control}
            name={`ubos.${index}.ubo.0.ubo1_pais_nac_n`}
            render={({ field }) => (
              <FloatingLabelSelect
                label="Country of Birth"
                name={`ubos.${index}.ubo.0.ubo1_pais_nac_n`}
                options={countries}
              />
            )}
          />

          <FormField
            control={control}
            name={`ubos.${index}.ubo.0.ubo1_nacionalidad_n`}
            render={({ field }) => (
              <FloatingLabelSelect
                label="Nationality *"
                name={`ubos.${index}.ubo.0.ubo1_nacionalidad_n`}
                options={countries}
              />
            )}
          />

          <FormField
            control={control}
            name={`ubos.${index}.ubo.0.ubo1_pais_residencia_n`}
            render={({ field }) => (
              <FloatingLabelSelect
                label="Country of Residence *"
                name={`ubos.${index}.ubo.0.ubo1_pais_residencia_n`}
                options={countries}
              />
            )}
          />

          <FormField
            control={control}
            name={`ubos.${index}.ubo.0.ubo1_porc_part_n`}
            render={({ field }) => (
              <FloatingLabelInput
                label="Share Percentage %*"
                type="number"
                {...field}
              />
            )}
          />

          <FormField
            control={control}
            name={`ubos.${index}.ubo.0.ubo1_pep_n`}
            render={({ field }) => (
              <FloatingLabelSelect
              label="Politically Exposed Person*"
              name={`ubos.${index}.ubo.0.ubo1_pep_n`}
              options={pepOptions || []}
            />
            )}
          />
           <Label>* A PEP is an individual who is, or has been, entrusted with a prominent public function by a foreign or domestic government, or international organization. Persons related to or closely associated with such an individual are also considered PEPs.</Label>
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-500">IV. UBOs (Ultimate Beneficial Owners)</h2>
      {errors?.ubos && errors?.ubos && (
            <div className="flex text-red-500 text-sm mb-2 border-red-500 border-b-2">
              <MessageCircleWarningIcon className="h-5 w-5 mr-1" />
              <span>{typeof errors.ubos?.message === "string" ? errors.ubos.message : null}</span>
            </div>
          )}
      <div className="space-y-4">
        <FormField
          control={control}
          name="ubo_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select The Ultimate Beneficial Owners Type*</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select UBO Type" />
                  </SelectTrigger>
                  <SelectContent>
                   <SelectItem value="0" disabled>Select the UBO Type</SelectItem>
                    <SelectItem value="regular">Individuals</SelectItem>
                    <SelectItem value="gov">State/Governmental Company</SelectItem>
                    <SelectItem value="ex">Company listed on Stock Exchange</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {uboType === "regular" && (
          <FormField
            control={control}
            name="ubo_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many Ultimate Beneficial Owners (UBOs) does the company have holding 20% or more of the shares?*</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => handleUboCountChange(Number.parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select UBO Number" />
                    </SelectTrigger>
                    <SelectContent>
                  <SelectItem value="0" disabled>Select the number of UBOs *</SelectItem>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>

      <div className="space-y-4">
        {fields.map((field: any, index: number) => {
          const currentUboType = field.ubo_numero === "gov" || field.ubo_numero === "ex" ? field.ubo_numero : "regular"
          const isExpanded = expandedCards[index]
          const isComplete = isUBOComplete(index)
          let uboName = `UBO #${index + 1}`
          if (currentUboType === "gov") {
            uboName = `UBO [Government] #${index+1} - ${watch(`ubos.${index}.ubo.ubo_name_gov`)}`
          } else if (currentUboType === "ex") {
            uboName = `UBO [Exchange] #${index+1} - ${watch(`ubos.${index}.ubo.ubo_name_ex`)}`
          } else {
            uboName = `UBO #${index+1} - ${watch(`ubos.${index}.ubo.0.ubo1_nombre_n`)}`
          }

          return (
            <Card key={field.id}
              className={cn(
                "relative transition-all duration-200",
                isComplete ? "border-green-500 shadow-md" : "border-gray-200 hover:border-gray-300",
              )}
            >
              <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleCard(index)}>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{uboName}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleCard(index)
                    }}
                  >
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </Button>
                </div>
                {isComplete ? (
                  <p className="text-sm text-green-700 font-medium">✓ Every Required field is complete</p>
                ):
                  <p className="text-sm text-red-500 font-medium">✗ You must fill in all required fields</p>
                }
              </CardHeader>

              {isExpanded && (
                <CardContent>{renderUBOFields(index, currentUboType as "gov" | "ex" | "regular")}</CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
