import { clsx, type ClassValue } from "clsx"
import { stat } from "fs"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 export const complianceDefault=() => {
    const VITE_COMPLIANCE = process.env.VITE_COMPLIANCE
    return {
      general_information: {
        razon_social: "",
        nombre_comercial: "",
        pais_de_domicilio: "",
        "estructura-jur": "",
        "estructura-jur_otro": "",
        datos_folio: "",
        tax_id: "",
        actividad_a_que_se_dedica_la_soc: "",
        actividad_otra: "",
        telefono_fax: "",
        direccion_fisica: "",
        direccion_correspondencia: "",
        ano_de_constitucion: "",
        web_site: "",
        regulador_nombre: "",
        regulador_web: "",
        oficial_cump_nombre: "",
        oficial_cump_email: "",
        contacto_active: "",
      },
      d_numero: 0,
      directors: [
        {
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
        },
      ],
      acc_numero: 0,
      shareholders: [
        {
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
        },
      ],
      ubo_type: "",
      ubo_count: undefined,
      ubos: [],
      detalle_fondos: "",
      ingresos_actividad_principal: "",
      ingresos_anuales_por_otras_activ: "",
      Ragency_rating_name: "",
      Ragency_rating_date: "",
      Ragency_rating: "",
      canal_de_ingreso: "",
      otro_canal_ingreso: "",
      nombre_contacto: "",
      correo_electronico: "",
      documents: {
        uploaded_files: [],
      },
      statement: {
      statement_agreement: false,
      },
      env:VITE_COMPLIANCE || "desa"
  }
}

export  function formatUTCDate(dateStr: string | Date | null | undefined): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return (
    date.getUTCDate().toString().padStart(2, "0") +
    "/" +
    (date.getUTCMonth() + 1).toString().padStart(2, "0") +
    "/" +
    date.getUTCFullYear()
  );
}