"use client"
import { useEffect, useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "../ui/button"
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { FloatingLabelInput } from "../../components/ui/floating-label-input"
import { FloatingLabelSelect } from "../../components/ui/floating-label-select"
import { pepOptions, governmentalentityOptions, paisesOptions, roleOptions, yesNoOptions } from "./options"
import { constitutionOptions } from "./options"
import { cn } from "../../lib/utils"
import {useKyc} from "../../context/KycContext";

export default function DirectorsStep() {
  const { control, watch, setValue } = useFormContext()
  const { fields_key } = useKyc();
  const pepOptions = fields_key?.mpep
  const governmentalentityOptions = fields_key?.mpepj
  const countries = fields_key?.countries || []

  const d_numero = watch("d_numero")
  const directors = watch("directors") || []
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})

 const isDirectorComplete = (index: number): boolean => {
    const director = directors[index]
    if (!director || !director.d1_entidad) return false

    if (director.d1_entidad === "n") {
      const directorData = director.director[0]
      if (!directorData) return false

      const requiredFields = [
        "d1_nombre_director_n",
        "d1_role",
        "d1_autoridad",
        "d1_nacionalidad_n",
        "d1_pais_residencia_n",
        "d1_pep_n",
      ]

      for (const field of requiredFields) {
        const value = directorData[field]
        if (!value || value.trim() === "") {
          return false
        }
      }

      return true
    } else if (director.d1_entidad === "j") {
      const directorData = director.director[0]
      if (!directorData) return false

      const requiredFields = [
        "d1_company_director_j",
        "d1_role",
        "d1_autoridad",
        "d1_pais_reg_j",
        "d1_constitucion_j",
        "d1_pep_j",
      ]

      for (const field of requiredFields) {
        const value = directorData[field]
        if (!value || value.trim() === "") {
          return false
        }
      }

      return true
    }

    return false
  }
  useEffect(() => {
    if (!Array.isArray(directors)) {
      setValue("directors", [])
    }

    const currentLength = directors.length
    if (currentLength < d_numero) {
      for (let i = currentLength; i < d_numero; i++) {
        append({
          d1_entidad: "n",
          director: [
            {
              d1_nombre_director_n: "",
              d1_cedula_n: "",
              d1_role: "",
              d1_autoridad: "",
              d1_email: "",
              d1_fec_nac_n: "",
              d1_pais_nac_n: "",
              d1_nacionalidad_n: "",
              d1_pais_residencia_n: "",
              d1_pep_n: "",
            },
          ],
        })
        setExpandedCards((prev) => ({ ...prev, [i]: false }))
      }
    } else if (currentLength > d_numero) {
      for (let i = currentLength - 1; i >= d_numero; i--) {
        remove(i)
        setExpandedCards((prev) => {
          const newState = { ...prev }
          delete newState[i]
          return newState
        })
      }
    }
  }, [d_numero])

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "directors",
  })

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleTypeChange = (index: number, type: "n" | "j") => {
    const currentDirector = directors[index]

    if (currentDirector.d1_entidad === type) return

    if (type === "n") {
      update(index, {
        d1_entidad: "n",
        director: [
          {
            d1_nombre_director_n: "",
            d1_cedula_n: "",
            d1_role: "",
            d1_autoridad: "",
            d1_email: "",
            d1_fec_nac_n: "",
            d1_pais_nac_n: "",
            d1_nacionalidad_n: "",
            d1_pais_residencia_n: "",
            d1_pep_n: "",
          },
        ],
      })
    } else {
      update(index, {
        d1_entidad: "j",
        director: [
          {
            d1_company_director_j: "",
            d1_cedula_j: "",
            d1_role: "",
            d1_autoridad: "",
            d1_pais_reg_j: "",
            d1_constitucion_j: "",
            d1_email: "",
            d1_website_j: "",
            d1_direccion_j: "",
            d1_pep_j: "",
          },
        ],
      })
    }
  }

  const renderDirectorFields = (index: number, type: "n" | "j") => {
    if (!expandedCards[index]) return null

    if (type === "n") {
      return (
        <div className="mt-4">
          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_nombre_director_n`}
            render={({ field }) => (
              <FloatingLabelInput
                label="Legal Name (as shown in your passport)*"
                {...field}
              />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_cedula_n`}
            render={({ field }) => (
              <FloatingLabelInput label="ID or Passport Number"  {...field} />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_role`}
            render={({ field }) => (
              <FloatingLabelSelect label="What is your role in the Board of Directors?*" name={`directors.${index}.director.0.d1_role`} options={roleOptions} />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_autoridad`}
            render={({ field }) => (
              <FloatingLabelSelect
                label="Authorized to sign on behalf of Company?*"
                name={`directors.${index}.director.0.d1_autoridad`}
                options={yesNoOptions}
              />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_email`}
            render={({ field }) => (
              <FloatingLabelInput
                label="Email"
                type="email"
                {...field}
              />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_fec_nac_n`}
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
            name={`directors.${index}.director.0.d1_pais_nac_n`}
            render={({ field }) => (
              <FloatingLabelSelect
                label="Country of Birth"
                name={`directors.${index}.director.0.d1_pais_nac_n`}
                options={countries}
              />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_nacionalidad_n`}
            render={({ field }) => (
              <FloatingLabelSelect
                label="Nationality *"
                name={`directors.${index}.director.0.d1_nacionalidad_n`}
                options={countries}
              />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_pais_residencia_n`}
            render={({ field }) => (
              <FloatingLabelSelect
                label="Country of Residence *"
                name={`directors.${index}.director.0.d1_pais_residencia_n`}
                options={countries}
              />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_pep_n`}
            render={({ field }) => (
              <FloatingLabelSelect
              label="Politically Exposed Person*"
              name={`directors.${index}.director.0.d1_pep_n`}
              options={pepOptions || []}
            />
            )}
          />
          <Label>* A PEP is an individual who is, or has been, entrusted with a prominent public function by a foreign or domestic government, or international organization. Persons related to or closely associated with such an individual are also considered PEPs.</Label>
        </div>
      )
    } else {
      return (
        <div className="space-y-4 mt-4">
          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_company_director_j`}
            render={({ field }) => (
              <FloatingLabelInput
                label="Company Name*"
                {...field}
              />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_cedula_j`}
            render={({ field }) => (
              <FloatingLabelInput label="Registration Number"  {...field} />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_role`}
            render={({ field }) => (
              <FloatingLabelSelect label="What is your role in the Board of Directors?*" name={`directors.${index}.director.0.d1_role`} options={roleOptions} />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_autoridad`}
            render={({ field }) => (
                <FloatingLabelSelect
                label="Authorized to sign on behalf of Company?*"
                name={`directors.${index}.director.0.d1_autoridad`}
                options={yesNoOptions}
              />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_pais_reg_j`}
            render={({ field }) => (
              <FloatingLabelSelect
                label="Country of Registration*"
                name={`directors.${index}.director.0.d1_pais_reg_j`}
                options={countries}
              />
            )}
          />

          <FloatingLabelSelect
              label="Years of Established*"
              name={`directors.${index}.director.0.d1_constitucion_j`}
              options={constitutionOptions}
            />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_email`}
            render={({ field }) => (
              <FloatingLabelInput
                label="Email Address"
                type="email"
                {...field}
              />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_website_j`}
            render={({ field }) => (
              <FloatingLabelInput label="Website"  {...field} />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_direccion_j`}
            render={({ field }) => (
              <FloatingLabelInput
                label="Registered Address"
                {...field}
              />
            )}
          />

          <FormField
            control={control}
            name={`directors.${index}.director.0.d1_pep_j`}
            render={({ field }) => (
              <FloatingLabelSelect
              label="State/ governmental or Semi-State/ governmental entity?*"
              name={`directors.${index}.director.0.d1_pep_j`}
              options={governmentalentityOptions || []}
            />
            )}
          />
        </div>
      )
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary-500">II. Directores</h2>

      <FormField
        control={control}
        name="d_numero"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Directors *</FormLabel>
            <FormControl>
              <Select onValueChange={(value) => field.onChange(Number.parseInt(value))} value={field.value.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Seclet a director" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0" disabled>Select the number of directors</SelectItem>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num === 10? '10 or more': num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {d_numero === 10 && (
        <p className="text-xs text-gray-500">
          Please complete the registration for the 10 most relevant ones
        </p>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => {
          const directorType = (directors[index]?.d1_entidad ?? "n") as "j" | "n"
          const isExpanded = expandedCards[index]
          const isComplete = isDirectorComplete(index)
          const directorName =
            directorType === "n"
              ? `Director #${index+1} - ${watch(`.directors.${index}.director.0.d1_nombre_director_n`)}`
              : `Director #${index+1} - ${watch(`.directors.${index}.director.0.d1_company_director_j`)}`

          return (
            <Card key={field.id} 
              className={cn(
                "relative transition-all duration-200 space-y-0 pb-2",
                isComplete ? "border-green-500 shadow-md" : "border-gray-200 hover:border-gray-300",
              )}
            >
              <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleCard(index)}>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{directorName}</CardTitle>
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
                      name={`directors.${index}.d1_entidad`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Director Type *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => handleTypeChange(index, value as "n" | "j")}
                              value={field.value}
                              className="flex flex-row space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="n" id={`tipo-n-${index}`} />
                                <Label htmlFor={`tipo-n-${index}`}>Individual </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="j" id={`tipo-j-${index}`} />
                                <Label htmlFor={`tipo-j-${index}`}>Company</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {renderDirectorFields(index, directorType)}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
