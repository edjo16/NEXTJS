"use client"

import { useFormContext } from "react-hook-form"
import { FormField} from "../../components/ui/form"
import { FloatingLabelInput } from "../../components/ui/floating-label-input"
import { FloatingLabelSelect } from "../../components/ui/floating-label-select"
import {FloatingLabelPhoneInput} from "../../components/ui/floating-label-phone-input"
import {useKyc} from "../../context/KycContext";

export default function GeneralInformationStep() {

  const { fields_key } = useKyc();
  const estructuraJurOptions = fields_key?.mestruct 
  const actividadOptions = fields_key?.mactivieco
  const constitutionOptions = fields_key?.manoconst
  const contactsActive = fields_key?.businessdevelopers
  const countries = fields_key?.countries || []
  const { control, watch } = useFormContext()
  const estructuraJur = watch("general_information.estructura-jur")
  const actividad = watch("general_information.actividad_a_que_se_dedica_la_soc")
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-500">I. General Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control} name="general_information.razon_social"
         render={({ field }) => (
            <FloatingLabelInput label="Legal Company Name *"  {...field} />
          )}
        />
        <FormField control={control} name="general_information.nombre_comercial"
         render={({ field }) => (
            <FloatingLabelInput label="Brand or Trade Name (If applicable)"  {...field} />
          )}
        />
        <FormField control={control} name="general_information.pais_de_domicilio"
          render={({ field }) => (
            <FloatingLabelSelect
              label="Country of Registration *"
              name="general_information.pais_de_domicilio"
              options={countries}
            />
          )}
        />

        <FormField control={control} name="general_information.estructura-jur"
          render={({ field }) => (
            <FloatingLabelSelect
              label="Legal Structure *"
              name="general_information.estructura-jur"
              options={estructuraJurOptions || []}
            />
          )}
        />

        {estructuraJur == "45" && (
          <FormField control={control} name="general_information.estructura-jur_otro"
            render={({ field }) => (
            <FloatingLabelInput label="Especify Legal Structure *"  {...field} />
            )}
          />
        )}

        <FormField control={control} name="general_information.datos_folio"
          render={({ field }) => (
          <FloatingLabelInput label="Registration Number*"  {...field} />
          )}
        />

        <FormField control={control} name="general_information.tax_id"
          render={({ field }) => (
            <FloatingLabelInput label="Tax ID"  {...field} />
          )}
        />

        <FormField control={control} name="general_information.actividad_a_que_se_dedica_la_soc"
          render={({ field }) => (
            <FloatingLabelSelect
              label="Main Business Activity *"
              name="general_information.actividad_a_que_se_dedica_la_soc"
              options={actividadOptions || []}
            />
          )}
        />

        {actividad === "51" && (
          <FormField control={control} name="general_information.actividad_otra"
            render={({ field }) => (
            <FloatingLabelInput label="Specify Main Business Activity *"  {...field} />
            )}
          />
        )}

        <FormField control={control} name="general_information.telefono_fax"
          render={({ field }) => (
            <FloatingLabelPhoneInput label="Company Main Phone*"  {...field} />
          )}
        />
        </div>

        <FormField control={control} name="general_information.direccion_fisica"
          render={({ field }) => (
            <FloatingLabelInput label="Registered Address*"  {...field} />
          )}
        />

        <FormField control={control} name="general_information.direccion_correspondencia"
          render={({ field }) => (
          <FloatingLabelInput label="Business Address(If different from Registered)" {...field} />

          )}
        />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <FormField control={control} name="general_information.ano_de_constitucion"
          render={({ field }) => (
            <FloatingLabelSelect
              label="Years of Established*"
              name="general_information.ano_de_constitucion"
              options={constitutionOptions || []}
            />
          )}
        />

        <FormField control={control} name="general_information.web_site"
          render={({ field }) => (
           <FloatingLabelInput label="Company Website"  {...field} />
          )}
        />

        <FormField control={control} name="general_information.regulador_nombre"
          render={({ field }) => (
            <FloatingLabelInput label="Regulatory Body"  {...field} />
          )}
        />

        <FormField
          control={control}
          name="general_information.regulador_web"
          render={({ field }) => (
              <FloatingLabelInput label="Regulatory Body Website"  {...field} />
          )}
        />

        <FormField
          control={control}
          name="general_information.oficial_cump_nombre"
          render={({ field }) => (
            <FloatingLabelInput label="Name Compliance Officer (or equivalent)"  {...field} />
          )}
        />

        <FormField
          control={control}
          name="general_information.oficial_cump_email"
          render={({ field }) => (
              <FloatingLabelInput label="Email Compliance Officer (or equivalent)"  {...field} type="email" />
          )}
        />

        <FormField
          control={control}
          name="general_information.contacto_active"
          render={({ field }) => (
            <FloatingLabelSelect
              label="Name of ACTIVE RE account manager *"
              name="general_information.contacto_active"
              options={contactsActive || []}
            />
          )}
        />
      </div>
    </div>
  )
}
