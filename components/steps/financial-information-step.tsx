"use client"
import { useFormContext } from "react-hook-form"
import {FormField} from "../../components/ui/form"
// import { sourceFundsOptions, annualIncomeOptions } from "../steps/options"
import { FloatingLabelSelect } from "../ui/floating-label-select"
import {useKyc} from "../../context/KycContext";

export default function FinancialInformationStep() {
  const { control } = useFormContext()
  const { fields_key } = useKyc();
  const annualIncomeOptions = fields_key?.mingreso
  const sourceFundsOptions = fields_key?.morigen
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-500">V. Financial Profile</h2>

      <div className="space-y-6">
        <FormField
          control={control}
          name="detalle_fondos"
          render={({ field }) => (
            <FloatingLabelSelect
            label="Source of Funds *"
            name={`detalle_fondos`}
            options={sourceFundsOptions || []}
          />
          )}
        />

        <FormField
          control={control}
          name="ingresos_actividad_principal"
          render={({ field }) => (
              <FloatingLabelSelect
              label="Annual Income - Main Business Activities (USD)*"
              name={`ingresos_actividad_principal`}
              options={annualIncomeOptions || []}
              />
          )}
        />

        <FormField
          control={control}
          name="ingresos_anuales_por_otras_activ"
          render={({ field }) => (
             <FloatingLabelSelect
              label="Annual Income - Other Business Activities (USD)*"
              name="ingresos_anuales_por_otras_activ"
              options={annualIncomeOptions || []}
              />
          )}
        />
      </div>
    </div>
  )
}
