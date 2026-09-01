"use client"

import { useFormContext } from "react-hook-form"
import { FormField} from "../../components/ui/form"
import { FloatingLabelSelect } from "../../components/ui/floating-label-select"
import { FloatingLabelInput } from "../../components/ui/floating-label-input"
// import { canalIngresoOptions } from "../steps/options"
import {useKyc} from "../../context/KycContext";

export default function InterfaceStep() {
  const { control, watch } = useFormContext()
  const { fields_key } = useKyc();
  const canalIngreso = watch("canal_de_ingreso")
  const canalIngresoOptions = fields_key?.mcomporta
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-500">VII. Interface & Others</h2>

      <div className="space-y-6">
        <FormField
          control={control}
          name="canal_de_ingreso"
          render={({ field }) => (
               <FloatingLabelSelect
                label="Were you referred to us by an internal or external source?* *"
                 name="canal_de_ingreso"
                options={canalIngresoOptions || []}
                />
          )}
        />

        {canalIngreso === "47" && (
          <FormField
            control={control}
            name="otro_canal_ingreso"
            render={({ field }) => (
                <FloatingLabelInput label="Especify the source of your referral *" {...field} />
            )}
          />
        )}
      </div>
    </div>
  )
}
