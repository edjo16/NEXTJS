"use client"

import { useFormContext } from "react-hook-form"
import { FormField} from "../../components/ui/form"
import { FloatingLabelInput } from "../../components/ui/floating-label-input"
export default function RiskInformationStep() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-500">VI. Risk Rating Information</h2>

      <div className="space-y-6">
        <FormField
          control={control}
          name="Ragency_rating_name"
          render={({ field }) => (
              <FloatingLabelInput  label="Rating Agency Name"  {...field} />
          )}
        />

        <FormField
          control={control}
          name="Ragency_rating_date"
          render={({ field }) => (
              <FloatingLabelInput
                label="Date of last risk rating"
                type="date"
                {...field}
              />
            )}
          />


        <FormField
          control={control}
          name="Ragency_rating"
          render={({ field }) => (
              <FloatingLabelInput
                label="Rating assigned by the rating agency"
                {...field}
              />
          )}
        />
      </div>
    </div>
  )
}
