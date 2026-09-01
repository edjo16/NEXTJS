"use client"
import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../components/ui/form"
import { FileUpload } from "../../components/ui/file-upload"
import { Toaster } from "../../components/ui/toaster"

export default function DocumentsStep() {
  const { control } = useFormContext()

  const requiredDocuments = [
    "Registration of incorporation of the company",
    "Licence or registration with regulatory body",
    "Certificate of incumbency / list of directors, officers, shareholders, beneficial owners, addresses, etc.",
    "Colour copy of identity (ID) cards or passports of directors, officers, shareholders and beneficial owners",
    "Audited financial statements of the last period",
    "Powers of attorney / other document naming authorised signatories or legal representatives",
    "Memorandum & articles of association (MOA/AOA)",
    "By-laws",
  ]

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h2 className="text-2xl font-bold text-primary-500 mb-4">IX. Required Documents</h2>
        <p className="text-gray-700 mb-6 text-sm">Kindly proceed to upload the following documents in the section below.</p>
        <div className="mb-6">
          <ul className="space-y-1">
            {requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-600 mr-2 text-xs">•</span>
                <span className="text-gray-700 text-xs">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="text-xs">
              Only files type .pdf, .jpg, .jpeg, .png, .bmp, .tiff, .doc, .docx, .gif, .xls or .xlsx. Max 5MB per file.
            </span>
            <span className="text-red-500">*</span>
          </p>
        </div>
      </div>

      <FormField
        control={control}
        name="documents.uploaded_files"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Uploaded Files</FormLabel>
            <FormControl>
              <FileUpload
                files={field.value || []}
                onFilesChange={field.onChange}
                maxSize={5 * 1024 * 1024} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
