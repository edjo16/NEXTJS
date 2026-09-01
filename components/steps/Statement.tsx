"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormControl, FormMessage } from "../../components/ui/form"
import { Checkbox } from "../../components/ui/checkbox"

export default function DocumentsStep() {
  const { control } = useFormContext()

  const requiredDocuments = [
    "We have not been involved in, convicted of, or under investigation anywhere in the world for offences related to the production, trafficking, or consumption of drugs, or any other offence associated with drugs, money laundering or terrorism.",
    "We confirm having and verifying the due diligence evidence of all beneficial owners, attorneys, beneficiaries, directors, officers, and signatories of the services required by Active Re, and agree to provide any information and/or documentation requested by Active Re.",
    "We declare under penalty of perjury that this statement is true, correct, and complete to the best of our knowledge and belief.",
    "We provide informed consent to Active Re to process the information provided in this form in accordance with the relevant data protection legislation applicable to its business activities.",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-500 mb-4">X. Statement</h2>
        <h4 className="text-gray-700 mb-6">
          We declare that the information contained in this form is true, complete, proportionate, and based on reliable
          and up-to-date information regarding all aspects addressed in the questions.
        </h4>
        <p className="text-gray-700 mb-6">We also declare that:</p>
        <div className="mb-6">
          <ul className="space-y-2">
            {requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span className="text-gray-700 font-size">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ml-4 flex gap-2">
          <FormField
            control={control}
            name="statement.statement_agreement"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    hasError={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="text-sm text-gray-600">
            By clicking this Check box, you confirm that this action is equivalent to electronically signing
            this form on behalf of the company whose information has been provided to Active Re. Please ensure that all
            information is correct before submitting. A copy of the form will be promptly sent to the contact person
            specified in Section VIII.
          </span>
          <span className="text-red-500">*</span>
        </div>
      </div>
    </div>
  )
}
