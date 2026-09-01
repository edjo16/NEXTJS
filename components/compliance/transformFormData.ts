import {formatUTCDate} from "../../lib/utils";
export function transformFormData(rawData: any) {
  const result: any = {
    ...rawData.general_information,
    d_numero: rawData.d_numero.toString(),
    acc_numero: rawData.acc_numero.toString(),
    ubo_numero: (rawData.ubo_count ?? 0).toString(),
    ubo_type: rawData.ubo_type,
    detalle_fondos: rawData.detalle_fondos,
    ingresos_actividad_principal: rawData.ingresos_actividad_principal,
    ingresos_anuales_por_otras_activ: rawData.ingresos_anuales_por_otras_activ,
    Ragency_rating_name: rawData.Ragency_rating_name,
    Ragency_rating_date: formatUTCDate(rawData.Ragency_rating_date) || "",
    Ragency_rating: rawData.Ragency_rating,
    canal_de_ingreso: rawData.canal_de_ingreso,
    otro_canal_ingreso: rawData.otro_canal_ingreso,
    nombre_contacto: rawData.nombre_contacto,
    correo_electronico: rawData.correo_electronico,
  };

  rawData.directors.forEach((dirGroup: any, i: number) => {
    const director = dirGroup.director[0];
    const idx = i + 1;
    result[`d${idx}_entidad`] = dirGroup.d1_entidad;
    if (dirGroup.d1_entidad == "n") {
      result[`d${idx}_nombre_director_n`] = director.d1_nombre_director_n || "";
      result[`d${idx}_cedula_n`] = director.d1_cedula_n || "";
      result[`d${idx}_role`] = director.d1_role || "";
      result[`d${idx}_autoridad`] = director.d1_autoridad || "";
      result[`d${idx}_email`] = director.d1_email || "";
      result[`d${idx}_fec_nac_n`] = formatUTCDate(director.d1_fec_nac_n) || "";
      result[`d${idx}_pais_nac_n`] = director.d1_pais_nac_n || "";
      result[`d${idx}_nacionalidad_n`] = director.d1_nacionalidad_n || "";
      result[`d${idx}_pais_residencia_n`] = director.d1_pais_residencia_n || "";
      result[`d${idx}_pep_n`] = director.d1_pep_n || "";
    }
    else {
      result[`d${idx}_company_director_j`] = director.d1_company_director_j || "";
      result[`d${idx}_cedula_j`] = director.d1_cedula_j || "";
      result[`d${idx}_role`] = director.d1_role || "";
      result[`d${idx}_autoridad`] = director.d1_autoridad || "";
      result[`d${idx}_pais_reg_j`] = director.d1_pais_reg_j || "";
      result[`d${idx}_email`] = director.d1_email || "";
      result[`d${idx}_website_j`] = director.d1_website_j || "";
      result[`d${idx}_constitucion_j`] = director.d1_constitucion_j || "";
      result[`d${idx}_direccion_j`] = director.d1_direccion_j || "";
      result[`d${idx}_pep_j`] = director.d1_pep_j || "";
    }
  }
  );

  rawData.shareholders.forEach((accGroup: any, i: number) => {
    const acc = accGroup.shareholders[0];
    const idx = i + 1;
    result[`acc${idx}_entidad`] = accGroup.acc1_entidad;

    if (accGroup.acc1_entidad === "n") {
      result[`acc${idx}_nombre_n`] = acc.acc1_nombre_n || "";
      result[`acc${idx}_cedula_n`] = acc.acc1_cedula_n || "";
      result[`acc${idx}_email`] = acc.acc1_email || "";
      result[`acc${idx}_fec_nac_n`] =  formatUTCDate(acc.acc1_fec_nac_n) || "";
      result[`acc${idx}_pais_nac_n`] = acc.acc1_pais_nac_n || "";
      result[`acc${idx}_nacionalidad_n`] = acc.acc1_nacionalidad_n || "";
      result[`acc${idx}_pais_residencia_n`] = acc.acc1_pais_residencia_n || "";
      result[`acc${idx}_porc_part`] = acc.acc1_porc_part || "";
      result[`acc${idx}_pep_n`] = acc.acc1_pep_n || "";
    }
    else {
      result[`acc${idx}_nombre_j`] = acc.acc1_nombre_j || "";
      result[`acc${idx}_email`] = acc.acc1_email || "";
      result[`acc${idx}_website_j`] = acc.acc1_website_j || "";
      result[`acc${idx}_constitucion_j`] = acc.acc1_constitucion_j || "";
      result[`acc${idx}_pais_reg_j`] = acc.acc1_pais_reg_j || "";
      result[`acc${idx}_direccion_j`] = acc.acc1_direccion_j || "";
      result[`acc${idx}_porc_part`] = acc.acc1_porc_part || "";
      result[`acc${idx}_pep_j`] = acc.acc1_pep_j || "";
    }

  }
  );

  if (rawData.ubo_type === "gov") {
  result[`ubo_numero`] = "gov";
  result[`ubo_name_gov`] = rawData.ubos[0].ubo?.ubo_name_gov || "";
  result[`ubo_country_gov`] = rawData.ubos[0].ubo?.ubo_country_gov || "";
  }
  else if (rawData.ubo_type === "ex") {
    result[`ubo_numero`] = "ex";
    result[`ubo_name_ex`] = rawData.ubos[0].ubo?.ubo_name_ex || "";
    result[`ubo_location_ex`] = rawData.ubos[0].ubo?.ubo_location_ex || "";
  }
  else {
    rawData.ubos?.forEach((uboGroup: any, i: number) => {
      const idx = i + 1;
      if (!isNaN(Number(uboGroup.ubo_numero))) {
        const ubo = Array.isArray(uboGroup.ubo) ? uboGroup.ubo[0] : {};
        result[`ubo${idx}_nombre_n`] = ubo.ubo1_nombre_n || "";
        result[`ubo${idx}_cedula_n`] = ubo.ubo1_cedula_n || "";
        result[`ubo${idx}_email_n`] = ubo.ubo1_email_n || "";
        result[`ubo${idx}_fec_nac_n`] = formatUTCDate(ubo.ubo1_fec_nac_n) || "";
        result[`ubo${idx}_pais_nac_n`] = ubo.ubo1_pais_nac_n || "";
        result[`ubo${idx}_nacionalidad_n`] = ubo.ubo1_nacionalidad_n || "";
        result[`ubo${idx}_pais_residencia_n`] = ubo.ubo1_pais_residencia_n || "";
        result[`ubo${idx}_porc_part_n`] = ubo.ubo1_porc_part_n || "";
        result[`ubo${idx}_pep_n`] = ubo.ubo1_pep_n || "";
      }

    });
  }
  return result;
}
