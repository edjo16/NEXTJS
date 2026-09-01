"use client"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "../ui/button"
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../components/ui/form"
import { Card, CardContent, CardHeader, CardTitle }from "../ui/card"
import { MessageCircleWarningIcon, PlusCircle, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { FloatingLabelInput } from "../../components/ui/floating-label-input"
import { FloatingLabelSelect } from "../../components/ui/floating-label-select"
import { paisesOptions, pepOptions, governmentalentityOptions,constitutionOptions } from "./options" // objects in case we need them
import { cn } from "../../lib/utils"
import {useKyc} from "../../context/KycContext";
export default function ShareholdersStep() {
  const { control, watch, setValue, formState: { errors } } = useFormContext()
  const { fields_key } = useKyc();
  
  const acc_numero = watch("acc_numero")
  const shareholders = watch("shareholders") || []
  const pepOptions = fields_key?.mpep
  const governmentalentityOptions = fields_key?.mpepj
  const constitutionOptions = fields_key?.manoconst
  const countries = fields_key?.countries || []

  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})

  const isShareholderComplete = (index: number): boolean => {
    const shareholder = shareholders[index]
    if (!shareholder || !shareholder.acc1_entidad) return false

    const shareholderData = shareholder.shareholders[0]
    if (!shareholderData) return false

    if (shareholder.acc1_entidad === "n") {
      const requiredFields = [
        "acc1_nombre_n",
        "acc1_nacionalidad_n",
        "acc1_pais_residencia_n",
        "acc1_porc_part",
        "acc1_pep_n",
      ]

      for (const field of requiredFields) {
        const value = shareholderData[field]
        if (!value || value.trim() === "") {
          return false
        }
      }

      return true
    } else if (shareholder.acc1_entidad === "j") {
      const requiredFields = [
        "acc1_nombre_j", 
        "acc1_constitucion_j", 
        "acc1_pais_reg_j",
        "acc1_porc_part",
        "acc1_pep_j",
      ]

      for (const field of requiredFields) {
        const value = shareholderData[field]
        if (!value || value.trim() === "") {
          return false
        }
      }
      return true
    }

    return false
  }
  useEffect(() => {
    if (!Array.isArray(shareholders)) {
      setValue("shareholders", [])
    }

    const currentLength = shareholders.length
    if (currentLength < acc_numero) {
      for (let i = currentLength; i < acc_numero; i++) {
        append({
          acc1_entidad: "n", 
          shareholders: [
            {
              acc1_nombre_n: "",
              acc1_cedula_n: "",
              acc1_email: "",
              acc1_fec_nac_n: "",
              acc1_pais_nac_n: "",
              acc1_nacionalidad_n: "",
              acc1_pais_residencia_n: "",
              acc1_porc_part: "",
              acc1_pep_n: "",
            },
          ],
        })
        setExpandedCards((prev) => ({ ...prev, [i]: false }))
      }
    } else if (currentLength > acc_numero) {
      for (let i = currentLength - 1; i >= acc_numero; i--) {
        remove(i)
        setExpandedCards((prev) => {
          const newState = { ...prev }
          delete newState[i]
          return newState
        })
      }
    }
  }, [acc_numero])

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "shareholders",
  })

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleTypeChange = (index: number, type: "n" | "j") => {
    const currentShareholder = shareholders[index]

    if (currentShareholder.acc1_entidad === type) return

    if (type === "n") {
      update(index, {
        acc1_entidad: "n",
        shareholders: [
          {
            acc1_nombre_n: "",
            acc1_fec_nac_n: "",
            acc1_pais_nac_n: "",
            acc1_nacionalidad_n: "",
            acc1_pais_residencia_n: "",
            acc1_porc_part: "",
            acc1_pep_n: "",
          },
        ],
      })
    } else {
      update(index, {
        acc1_entidad: "j",
        shareholders: [
            {
              acc1_nombre_j: "",
              acc1_cedula_j: "",
              acc1_constitucion_j: "",
              acc1_pais_reg_j: "",
              acc1_direccion_j: "",
              acc1_porc_part: "",
              acc1_pep_j: "",
            },
        ],
      })
    }
  }

 const renderShareholderFields = (index: number, type: "n" | "j") => {
  if (type === "n") {
    // Individual Shareholder
    return (
      <div className="space-y-4">
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_nombre_n`}
          render={({ field }) => (
            <FloatingLabelInput label="Full Legal Name (as in passport) *" {...field} />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_cedula_n`}
          render={({ field }) => (
              <FloatingLabelInput label="Official resident goverment-issued ID or Passport Number"  {...field} />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_email`}
          render={({ field }) => (
              <FloatingLabelInput label="Email Address"   {...field} type="email" />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_fec_nac_n`}
          render={({ field }) => (
              <FloatingLabelInput label="Date of Birth"   {...field} type="date" max={new Date().toISOString().split('T')[0]} />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_pais_nac_n`}
          render={({ field }) => (
              <FloatingLabelSelect
                label="Country of Birth"
                name={`shareholders.${index}.shareholders.0.acc1_pais_nac_n`}
                options={countries}
              />
            )}
          />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_nacionalidad_n`}
          render={({ field }) => (
              <FloatingLabelSelect
                label="Nationality *"
                name={`shareholders.${index}.shareholders.0.acc1_nacionalidad_n`}
                options={countries}
              />
            )}
          />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_pais_residencia_n`}
          render={({ field }) => (
              <FloatingLabelSelect
                label="Country of Residence*"
                name={`shareholders.${index}.shareholders.0.acc1_pais_residencia_n`}
                options={countries}
              />
            )}
          />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_porc_part`}
          render={({ field }) => (
          <FloatingLabelInput label="Shareholding Percentage %*"   {...field} type="number"/>
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_pep_n`}
          render={({ field }) => (
              <FloatingLabelSelect
              label="Politically Exposed Person*"
              name={`shareholders.${index}.shareholders.0.acc1_pep_n`}
              options={pepOptions || []}
            />
            )}
          />
        <Label>* A PEP is an individual who is, or has been, entrusted with a prominent public function by a foreign or domestic government, or international organization. Persons related to or closely associated with such an individual are also considered PEPs.</Label>
      </div>
    )
  } else {
    // Company Shareholder
    return (
      <div className="space-y-4">
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_nombre_j`}
          render={({ field }) => (
             <FloatingLabelInput label="Company Name*"  {...field}  />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_cedula_j`}
          render={({ field }) => (
            <FloatingLabelInput label="Registration Number"   {...field}  />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_email`}
          render={({ field }) => (
            <FloatingLabelInput label="Email Address"   {...field} type="email" />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_website_j`}
          render={({ field }) => (
            <FloatingLabelInput label="Website"   {...field}  />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_constitucion_j`}
          render={({ field }) => (
            <FloatingLabelSelect
              label="Years of Established*"
              name={`shareholders.${index}.shareholders.0.acc1_constitucion_j`}
              options={constitutionOptions || []}
            />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_pais_reg_j`}
          render={({ field }) => (
              <FloatingLabelSelect
                label="Country of Registration*"
                name={`shareholders.${index}.shareholders.0.acc1_pais_reg_j`}
                options={countries}
              />
            )}
          />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_direccion_j`}
          render={({ field }) => (
              <FloatingLabelInput label="Registered Address"   {...field} />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_porc_part`}
          render={({ field }) => (
              <FloatingLabelInput label="Shareholding Percentage %*"   {...field} type="number" />
          )}
        />
        <FormField
          control={control}
          name={`shareholders.${index}.shareholders.0.acc1_pep_j`}
          render={({ field }) => (
              <FloatingLabelSelect
              label="State/ governmental or Semi-State/ governmental entity?*"
              name={`shareholders.${index}.shareholders.0.acc1_pep_j`}
              options={governmentalentityOptions || []}
            />
            )}
          />
      </div>
    )
  }
}
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-500">III. Shareholders</h2>
      {errors?.shareholders && errors?.shareholders && (
            <div className="flex text-red-500 text-sm mb-2 border-red-500 border-b-2">
              <MessageCircleWarningIcon className="h-5 w-5 mr-1" />
              <span>{typeof errors.shareholders?.message === "string" ? errors.shareholders.message : null}</span>
            </div>
          )}
      <FormField
        control={control}
        name="acc_numero"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many shareholders does the company have holding 20% or more of the shares? *</FormLabel>
            <FormControl>
              <Select onValueChange={(value) => field.onChange(Number.parseInt(value))} value={field.value.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecct a number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0" disabled>Select the number of shareholders</SelectItem>
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

      <div className="space-y-4">
        {fields.map((field, index) => {
          const shareholderType = shareholders[index]?.acc1_entidad as "j" | "n"
          const isExpanded = expandedCards[index]
          const isComplete = isShareholderComplete(index)
          const shareholderName =
            shareholderType === "n"
              ? `ShareHolder #${index+1} - ${watch(`shareholders.${index}.shareholders.0.acc1_nombre_n`)}`
              : `ShareHolder #${index+1} - ${watch(`shareholders.${index}.shareholders.0.acc1_nombre_j`)}`

          return (
            <Card key={field.id}
              className={cn(
                "relative transition-all duration-200",
                isComplete ? "border-green-500 shadow-md" : "border-gray-200 hover:border-gray-300",
              )}
            >
              <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleCard(index)}>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{shareholderName}</CardTitle>
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
                   {isComplete? 
                  <p className="text-xs text-green-700 font-medium">✓ Every Required field is complete</p>
                  :
                  <p className="text-xs text-red-500 font-medium">✗ You must fill in all required fields</p>
                }
              </CardHeader>

              {isExpanded && (
                <CardContent>
                  <div className="mb-4">
                    <FormField
                      control={control}
                      name={`shareholders.${index}.acc1_entidad`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>shareholder Type *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => handleTypeChange(index, value as "n" | "j")}
                              value={field.value}
                              className="flex flex-row space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="n" id={`tipo-acc-n-${index}`} />
                                <Label htmlFor={`tipo-acc-n-${index}`}>Individual </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="j" id={`tipo-acc-j-${index}`} />
                                <Label htmlFor={`tipo-acc-j-${index}`}>Company </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {renderShareholderFields(index, shareholderType)}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

