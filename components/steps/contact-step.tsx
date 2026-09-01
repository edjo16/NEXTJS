"use client"

import { useFormContext } from "react-hook-form"
import { FormField } from "../../components/ui/form"
import { FloatingLabelInput } from "../ui/floating-label-input"

export default function ContactStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-500">VIII. Point of Contact for This KYC Form-Related References and Communications</h2>
      <div className="space-y-6">
        <FormField
          control={control}
          name="nombre_contacto"
          render={({ field }) => (
              <FloatingLabelInput label="Name*"   {...field} />
          )}
        />
        <FormField
          control={control}
          name="correo_electronico"
          render={({ field }) => (
              <FloatingLabelInput label="Email address*" type="email"  {...field} />
          )}
        />
      </div>
    </div>
  )
}
