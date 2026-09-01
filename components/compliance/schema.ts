import { z } from "zod"

// General Information Schema
const min = new Date(new Date().getFullYear() - 100, 0, 1) 
const max = new Date()
export const generalInformationSchema = z.object({
  razon_social: z.string().min(3, "Legal name is required").max(100, "Legal name is too long"),
  nombre_comercial: z.string().max(80, "Brand name is too long").optional(),
  pais_de_domicilio: z.string().min(3, "Country of registration is required").max(60, "Country name is too long"),
  "estructura-jur": z.string().min(1, "Legal structure is required"),
  "estructura-jur_otro": z.string().optional(),
  datos_folio: z.string().min(3, "Registration number data is required").max(30, "Registration number data is too long"),
  tax_id: z.string().max(30, "Tax ID is too long").optional(),
  actividad_a_que_se_dedica_la_soc: z.string().min(1, "Activity is required"),
  actividad_otra: z.string().max(20, "Activity is too long").optional(),
  telefono_fax: z.string().min(1, "Phone is required").max(15, "Phone number is too long"),
  direccion_fisica: z.string().min(5, "Registered address is required").max(95, "Registered address is too long"),
  direccion_correspondencia: z.string().max(95, "Business address is too long").optional(),
  ano_de_constitucion: z.string().min(1, "Year of establishment is required"),
  web_site: z.string().max(70, "Website is too long").optional().refine(
    (val) => !val || val === "" || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(\/[\w-]*)*\/?$/.test(val),
    { message: "Invalid Website: http://example.com" }
  ),
  regulador_nombre: z.string().max(100, "Regulator name is too long").optional(),
  regulador_web: z.string().max(40, "Regulator website is too long").optional().refine(
    (val) => !val || val === "" || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(\/[\w-]*)*\/?$/.test(val),
    { message: "Invalid Website: http://example.com" }
  ),
  oficial_cump_nombre: z.string().max(30, "Name is too long").optional(),
  oficial_cump_email: z.string().max(40, "Email is too long").optional().refine(
    (val) => !val || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: "Invalid email" }
  ),
  contacto_active: z.string().min(1, "Active account manager is required").max(70, "Name is too long"),
}).refine(
  (data) => data["estructura-jur"] !== "45" || (data["estructura-jur_otro"] && data["estructura-jur_otro"].trim().length > 0),
  {
    message: 'If the legal structure is "Other", please specify it',
    path: ["estructura-jur_otro"],
  }
).refine(
  (data) => data.actividad_a_que_se_dedica_la_soc !== "51" || (data.actividad_otra && data.actividad_otra.trim().length > 0),
  {
    message: 'If the activity is "Other", please specify it',
    path: ["actividad_otra"],
  }
)

// Natural Person Directors Schema
export const directorNaturalSchema = z.object({
  d1_nombre_director_n: z.string().min(3, "Director name is required").max(50, "Director name is too long"),
  d1_cedula_n: z.string().max(15, "ID number is too long").optional(),
  d1_role: z.string().min(3, "Role is required").max(30, "Role is too long"),
  d1_autoridad: z.string().min(1, "Authority is required"),
  d1_email: z.string().max(40,"Email is too long").optional().refine(
    (val) => !val || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: "Invalid email" }
  ),
  d1_fec_nac_n: z.string().optional().refine(
    (val) => !val || val >= min.toISOString().split('T')[0] && val <= max.toISOString().split('T')[0],
    { message: "Invalid date" }
  ),
  d1_pais_nac_n: z.string().max(50, "Country name is too long").optional(),
  d1_nacionalidad_n: z.string().min(1, "Nationality is required"),
  d1_pais_residencia_n: z.string().min(1, "Country of residence is required").max(50, "Country name is too long"),
  d1_pep_n: z.string().min(1, "This field is required"),
})

// Legal Entity Directors Schema
export const directorCompanySchema = z.object({
  d1_company_director_j: z.string().min(3, "Company name is required").max(25, "Company name is too long"),
  d1_cedula_j: z.string().max(15, "ID number is too long").optional(),
  d1_role: z.string().min(3, "Role is required").max(30, "Role is too long"),
  d1_autoridad: z.string().min(1, "Authority is required"),
  d1_pais_reg_j: z.string().min(1, "Country of registration is required").max(50, "Country name is too long"),
  d1_constitucion_j: z.string().min(1, "Incorporation is required"),
  d1_email: z.string().max(40,"Email is too long").optional().refine(
    (val) => !val || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: "Invalid email" }
  ),
  d1_website_j: z.string().max(50, "Website is too long").optional().refine(
    (val) => !val || val === "" || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(\/[\w-]*)*\/?$/.test(val),
    { message: "Invalid Website: http://example.com" }),
  d1_direccion_j: z.string().max(40, "Address is too long").optional(),
  d1_pep_j: z.string().min(1, "PEP field is required"),
})

// Natural Person Shareholders Schema with improved validation
export const shareholderNaturalSchema = z.object({
  acc1_nombre_n: z.string().min(1, "Shareholder name is required").max(50, "Shareholder name is too long"),
  acc1_cedula_n: z.string().max(15, "ID number is too long").optional(),
  acc1_email: z.string().max(40,"Email is too long").optional().refine(
    (val) => !val || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: "Invalid email" }
  ),
  acc1_fec_nac_n: z.string().optional().refine(
    (val) => !val || val >= min.toISOString().split('T')[0] && val <= max.toISOString().split('T')[0],
    { message: "Invalid date" }
  ),
  acc1_pais_nac_n: z.string().max(50, "Country name is too long").optional(),
  acc1_nacionalidad_n: z.string().min(1, "Nationality is required").max(50, "Country name is too long"),
  acc1_pais_residencia_n: z.string().min(1, "Country of residence is required").max(50, "Country name is too long"),
  acc1_porc_part: z.string().min(1, "Participation percentage is required").refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    { message: "Participation percentage must be a number between 0 and 100" }
  ),
  acc1_pep_n: z.string().min(1, "PEP field is required"),
})

// Legal Entity Shareholders Schema with improved validation
export const shareholderCompanySchema = z.object({
  acc1_nombre_j: z.string().min(1, "Company name is required").max(50, "Company name is too long"),
  acc1_cedula_j: z.string().max(15, "ID number is too long").optional(),
  acc1_email: z.string().max(40,"Email is too long").optional().refine(
    (val) => !val || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: "Invalid email" }
  ),
  acc1_website_j: z.string().max(50, "Website is too long").optional().refine(
    (val) => !val || val === "" || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(\/[\w-]*)*\/?$/.test(val),
    { message: "Invalid Website: http://example.com" }),
  acc1_constitucion_j: z.string().min(1, "year of establishment is required"),
  acc1_pais_reg_j: z.string().min(1, "Country of registration is required").max(50, "Country name is too long"),
  acc1_direccion_j: z.string().max(40, "Address is too long").optional(),
  acc1_porc_part: z.string().min(1, "Participation percentage is required").refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    { message: "Participation percentage must be a number between 0 and 100" }
  ),
  acc1_pep_j: z.string().min(1, "PEP field is required"),
})

// schema for UBOs Regular
export const uboRegularSchema = z.object({
  ubo1_nombre_n: z.string().min(1, "name is required").max(50, "Name is too long"),
  ubo1_cedula_n: z.string().max(15, "ID number is too long").optional(),
  ubo1_email_n: z.string().max(40,"Email is too long").optional().refine(
    (val) => !val || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: "Invalid email" }
  ),
  ubo1_fec_nac_n: z.string().optional().refine(
    (val) => !val || val >= min.toISOString().split('T')[0] && val <= max.toISOString().split('T')[0],
    { message: "Invalid date" }
  ),
  ubo1_pais_nac_n: z.string().max(50, "Country name is too long").optional(),
  ubo1_nacionalidad_n: z.string().min(1, "Nationality is required").max(50, "Country name is too long"),
  ubo1_pais_residencia_n: z.string().min(1, "Country of residence is required").max(50, "Country name is too long"),
  ubo1_porc_part_n: z.string().min(1, "The share percentage is required").refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    { message: "Participation percentage must be a number between 0 and 100" }
  ),
  ubo1_pep_n: z.string().min(1, "PEP field is required"),
})

// schema for UBOs Government
export const uboGovernmentSchema = z.object({
  ubo_name_gov: z.string().min(3, "government name is required").max(25, "Government name is too long"),
  ubo_country_gov: z.string().min(1, "Country of government is required").max(50, "Country name is too long"),
})

// schema for UBOs Exchange
export const uboExchangeSchema = z.object({
  ubo_name_ex: z.string().min(1, "The name of the exchange is required").max(25, "Exchange name is too long"),
  ubo_location_ex: z.string().min(1, "The location of the exchange is required").max(50, "Country name is too long"),
})

export const ubosSchema = z.discriminatedUnion("ubo_type", [
  z.object({
    ubo_type: z.literal("gov"),
    ubos: z
      .array(
        z.object({
          ubo_numero: z.literal("gov"),
          ubo: uboGovernmentSchema,
        }),
      )
      .length(1, "Just one government UBO is allowed"),
  }),

  z.object({
    ubo_type: z.literal("ex"),
    ubos: z
      .array(
        z.object({
          ubo_numero: z.literal("ex"),
          ubo: uboExchangeSchema,
        }),
      )
      .length(1, "Just one exchange UBO is allowed"),
  }),

  z.object({
    ubo_type: z.literal("regular"),
    ubo_count: z.number().min(1).max(5),
    ubos: z
      .array(
        z.object({
          ubo_numero: z.number(),
          ubo: z.array(uboRegularSchema),
        }),
      )
      .min(1, "At least one regular UBO is required")
      .max(5, "A maximum of 5 UBOs is allowed"),
  }),
])

// Financial Information Schema
export const financialInformationSchema = z.object({
  detalle_fondos: z.string().min(1, "Fund details are required"),
  ingresos_actividad_principal: z.string().min(1, "Primary activity income is required"),
  ingresos_anuales_por_otras_activ: z.string().min(1, "Annual income from other activities is required"),
})

// Risk Information Schema
export const riskInformationSchema = z.object({
  Ragency_rating_name: z.string().max(25, "Rating agency name is too long").optional(),
  Ragency_rating_date: z.string().optional().refine(
    (val) => !val || val >= min.toISOString().split('T')[0] && val <= max.toISOString().split('T')[0],
    { message: "Invalid date" }
  ),
  Ragency_rating: z.string().max(15, "Rating is too long").optional(),
})

// Interface and Other Schema
export const interfaceSchema = z.object({
  canal_de_ingreso: z.string().min(1, "Channel of entry is required"),
  otro_canal_ingreso: z.string().optional(),
})

// Contact Point Schema
export const contactSchema = z.object({
  nombre_contacto: z.string().min(3, "Contact name is required").max(50, "Contact name is too long"),
  correo_electronico: z.string().email("Invalid email").min(1, "Email is required").max(40, "Email is too long"),
})

// schemas for UBOs
const uboGovernmentItemSchema = z.object({
  ubo_numero: z.literal("gov"),
  ubo: uboGovernmentSchema,
})

const uboExchangeItemSchema = z.object({
  ubo_numero: z.literal("ex"),
  ubo: uboExchangeSchema,
})

const uboRegularItemSchema = z.object({
  ubo_numero: z.union([z.literal("1"), z.literal("2"), z.literal("3"), z.literal("4"), z.literal("5")]),
  ubo: z.array(uboRegularSchema),
})

export const documentsSchema = z.object({
  uploaded_files: z.array(z.instanceof(File)).min(1, "At least one document is required"),
})

// Enhanced shareholders validation with specific error targeting
const createShareholdersValidation = () => {
  return z.array(
    z.discriminatedUnion("acc1_entidad", [
      z.object({
        acc1_entidad: z.literal("j"),
        shareholders: z.array(shareholderCompanySchema),
      }),
      z.object({
        acc1_entidad: z.literal("n"),
        shareholders: z.array(shareholderNaturalSchema),
      }),
    ]),
  ).superRefine((shareholders, ctx) => {
    // Calculate total shareholding percentage
    const total = shareholders.reduce((sum: number, sh: any, shareholderIndex: number) => {
      const shData = sh.shareholders?.[0];
      const porc = shData?.acc1_porc_part;
      const value = porc ? Number(porc) : 0;
      
      // Add individual validation error to specific shareholder if invalid
      if (isNaN(value) || value < 0 || value > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Participation percentage must be a number between 0 and 100",
          path: [shareholderIndex, "shareholders", 0, "acc1_porc_part"],
        });
      }
      
      return sum + (isNaN(value) ? 0 : value);
    }, 0);

    // Check if total exceeds 100%
    if (total > 100) {
      // Add error to each shareholder to make it visible in the UI
      shareholders.forEach((sh: any, shareholderIndex: number) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Total shareholding percentage is ${total.toFixed(2)}% (exceeds 100%). Please adjust this shareholder's percentage.`,
          path: [shareholderIndex, "shareholders", 0, "acc1_porc_part"],
        });
      });
    }
  });
};

// Enhanced UBOs validation with specific error targeting  
const createUbosValidation = () => {
  return z.array(z.union([uboGovernmentItemSchema, uboExchangeItemSchema, uboRegularItemSchema]))
    .min(1, "At least one UBO is required")
    .superRefine((ubos, ctx) => {
      // Only validate percentages for regular UBOs
      const regularUbos = ubos.filter((ubo: any) => ubo.ubo_numero !== "gov" && ubo.ubo_numero !== "ex");
      
      if (regularUbos.length === 0) return; // No regular UBOs to validate
      
      const total = regularUbos.reduce((sum: number, ubo: any, uboIndex: number) => {
        const uboData = ubo.ubo?.[0];
        const porc = uboData?.ubo1_porc_part_n;
        const value = porc ? Number(porc) : 0;
        
        // Add individual validation error to specific UBO if invalid
        if (isNaN(value) || value < 0 || value > 100) {
          // Find the actual index in the full ubos array
          const actualIndex = ubos.findIndex((u: any) => u === ubo);
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Participation percentage must be a number between 0 and 100",
            path: [actualIndex, "ubo", 0, "ubo1_porc_part_n"],
          });
        }
        
        return sum + (isNaN(value) ? 0 : value);
      }, 0);

      // Check if total exceeds 100%
      if (total > 100) {
        // Add error to each regular UBO to make it visible in the UI
        regularUbos.forEach((ubo: any) => {
          const actualIndex = ubos.findIndex((u: any) => u === ubo);
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Total UBO percentage is ${total.toFixed(2)}% (exceeds 100%). Please adjust this UBO's percentage.`,
            path: [actualIndex, "ubo", 0, "ubo1_porc_part_n"],
          });
        });
      }
    });
};

// Main Due Diligence Schema with enhanced validation
export const dueDiligenceSchema = z.object({
  general_information: generalInformationSchema,
  d_numero: z.number().min(1).max(10),
  directors: z.array(
    z.discriminatedUnion("d1_entidad", [
      z.object({
        d1_entidad: z.literal("j"),
        director: z.array(directorCompanySchema),
      }),
      z.object({
        d1_entidad: z.literal("n"),
        director: z.array(directorNaturalSchema),
      }),
    ]),
  ),
  acc_numero: z.number().min(1).max(5),
  shareholders: createShareholdersValidation(),
  ubo_type: z.enum(["regular", "gov", "ex"], {
    required_error: "UBO type is required",
  }),
  ubo_count: z.number().optional(),
  ubos: createUbosValidation(),
  ...financialInformationSchema.shape,
  ...riskInformationSchema.shape,
  ...interfaceSchema.shape,
  ...contactSchema.shape,
  documents: documentsSchema,
  statement: z.object({
    statement_agreement: z.boolean().refine((val) => val === true, {
      message: "You must agree to the statement to proceed",
    }),
  }),
  env: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.ubo_type === "regular") {
    if (data.ubo_count === undefined || data.ubo_count < 1 || data.ubo_count > 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Number of UBOs is required and must be between 1 and 5",
        path: ["ubo_count"],
      })
    }
  }
}).refine(
  (data) => data.canal_de_ingreso !== "other" || (data.otro_canal_ingreso && data.otro_canal_ingreso.trim().length > 0),
  {
    message: 'If the channel is "Other", please specify it',
    path: ["otro_canal_ingreso"],
  }
)