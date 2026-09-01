import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select }  from "../ui/NormalSelect";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useContactForm } from "../../hooks/useContactForm";
import { ToastContainer, toast } from "react-toastify";
import { cn } from "../../lib/utils";
import "react-toastify/dist/ReactToastify.css";
import { FloatingLabelPhoneInput } from "../ui/label-phone-input";

export default function ContactForm() {
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || '';
  //@ts-ignore
  const { formStep, register, handleSubmit, onSubmit, errors, isSubmitting, watch, setValue, options, countries }: {
    formStep: number;
    register: any;
    handleSubmit: any;
    onSubmit: (data: any) => Promise<void>;
    errors: any;
    isSubmitting: boolean;
    watch: any;
    setValue: (field: string, value: any) => void;
    options: any;
    countries: any;
  } = useContactForm(apiUrl); 
  const watchedFields = watch();

  const saveFormData = () => {
    localStorage.setItem("contactFormData", JSON.stringify(watchedFields));
    toast.info("Data saved for later.");
  };

  const handleFormSubmit = async (data: any) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please complete all required fields.");
      return;
    }
    try {
      await onSubmit(data);
      toast.success("¡Form submitted successfully!");
      localStorage.removeItem("contactFormData");
    } catch {
      toast.error("There was an error sending the form.");
    }
  };
  useEffect(() => {
    const saved = localStorage.getItem("contactFormData");
    if (saved) {
      const data = JSON.parse(saved);
      Object.keys(data).forEach((key) => setValue(key, data[key]));
    }
  }, [setValue]);

  return (
    <>
      <ToastContainer position="bottom-center" />
      <section className="mb-16">
        <div className="border-t-4 border-secondary-500 w-16 mb-4"></div>
        <h2 className="text-2xl font-bold text-primary-500 mb-6">Get in touch</h2>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
        >
          {formStep === 0 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 relative">
                <Label htmlFor="interests" className="text-secondary-500">
                  How Can We Help You Today?*{" "}
                  {watchedFields.interests && !errors.interests && (
                  <CheckCircle2 className="inline text-primary-500 h-4 w-4" />
                  )}
                </Label>
                  <Select
                    id="interests"
                    {...register("interests", {
                      required: "Interests is required",
                      minLength: {
                        value: 2,
                        message: "Interests must be at least 2 characters",
                      },
                    })}
                    className={cn(
                      errors.interests ? "border-red-500" : watchedFields.interests ? "border-primary-200" : ""
                    )}
                    defaultValue=""
                  >
                    <option value="" disabled selected>Select area of interest</option>
                    {options && options.map((option: { id: number | string; label: string }) => (
                      <option key={option?.id} value={option?.label}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                    {errors.interests && (
                    <span className="text-red-500 text-xs">{errors.interests.message as string}</span>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="company_name" className="text-secondary-500">
                    Company Name*{" "}
                    {watchedFields.company_name && !errors.company_name && (
                      <CheckCircle2 className="inline text-primary-500 h-4 w-4" />
                    )}
                  </Label>
                  <Input
                    id="company_name"
                    placeholder="Write your Company name"
                    {...register("company_name", {
                      required: "Company name is required",
                      minLength: {
                        value: 3,
                        message: "Company must be at least 3 characters",
                      }
                    })}
                    className={errors.company_name ? "border-red-500" : watchedFields.company_name ? "border-primary-200" : ""}
                  />
                  {errors.company_name && (
                    <span className="text-red-500 text-xs">{errors.company_name.message as string}</span>
                  )}
                </div>
                  </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 relative">
                  <Label htmlFor="name" className="text-secondary-500">
                    Name*{" "}
                    {watchedFields.name && !errors.name && (
                      <CheckCircle2 className="inline text-primary-500 h-4 w-4" />
                    )}
                  </Label>
                  <Input
                    id="name"
                    placeholder="Write your name"
                    {...register("name", {
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Invalid name",
                      },
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                    className={errors.name ? "border-red-500" : watchedFields.name ? "border-primary-200" : ""}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">{errors.name.message as string}</span>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="email" className="text-secondary-500">
                    Email*{" "}
                    {watchedFields.email && !errors.email && (
                      <CheckCircle2 className="inline text-primary-500 h-4 w-4" />
                    )}
                  </Label>
                  <Input
                    id="email"
                    placeholder="Write your email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={errors.email ? "border-red-500" : watchedFields.email ? "border-primary-200" : ""}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">{errors.email.message as string}</span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="space-y-2 relative">
                  <Label htmlFor="job_title" className="text-secondary-500">
                    Job Title*{" "}
                    {watchedFields.job_title && !errors.job_title && (
                      <CheckCircle2 className="inline text-primary-500 h-4 w-4" />
                    )}
                  </Label>
                  <Input
                    id="job_title"
                    placeholder="Write your job title"
                    {...register("job_title", { required: "Job title is required" })}
                    className={errors.job_title ? "border-red-500" : watchedFields.job_title ? "border-primary-200" : ""}
                  />
                  {errors.job_title && (
                    <span className="text-red-500 text-xs">{errors.job_title.message as string}</span>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="job_level" className="text-secondary-500">
                    Job Level*{" "}
                    {watchedFields.job_level && !errors.job_level && (
                      <CheckCircle2 className="inline text-primary-500 h-4 w-4" />
                    )}
                  </Label>
                  <Select
                    id="job_level"
                    {...register("job_level", {
                      required: "Job level is required",
                      minLength: {
                        value: 2,
                        message: "Job level must be at least 2 characters",
                      },
                    })}
                    className={cn(
                      errors.job_level ? "border-red-500" : watchedFields.job_level ? "border-primary-200" : ""
                    )}
                  >
                    <option value="" disabled selected>Select your job level</option>
                    <option value="C-Level">C-Level</option>
                    <option value="VP">VP</option>
                    <option value="Director">Director</option>
                    <option value="Manager">Manager</option>
                    <option value="Specialist">Specialist</option>
                    <option value="Other">Other </option>
                  </Select>
                  {errors.job_level && (
                    <span className="text-red-500 text-xs">{errors.job_level.message as string}</span>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="Business Relationship" className="text-secondary-500">
                    Business Relationship*{" "}
                    {watchedFields.relationship && !errors.relationship && (
                      <CheckCircle2 className="inline text-primary-500 h-4 w-4" />
                    )}
                  </Label>
                  <Select
                    id="relationship"
                    {...register("relationship", {
                      required: "Job level is required",
                      minLength: {
                        value: 3,
                        message: "Job level must be at least 3 characters",
                      },
                    })}
                    className={cn(
                      errors.relationship ? "border-red-500" : watchedFields.relationship ? "border-primary-200" : ""
                    )}
                  >
                    <option value="" disabled selected>Select your Business Relationship</option>
                    <option value="Cedents/ Insurance Company">Cedents/ Insurance Company</option>
                    <option value="Brokers">Brokers</option>
                    <option value="Reinsurer / Retrocession Partner">Reinsurer / Retrocession Partner</option>
                    <option value="Service Provider">Service Provider</option>
                    <option value="Service Provider">MGAs</option>
                    <option value="Other">Other</option>
                  </Select>
                  {errors.relationship && (
                    <span className="text-red-500 text-xs">{errors.relationship.message as string}</span>
                  )}
                </div>
                <div className="space-y-2 relative">
                <Label htmlFor="phone_number" className="text-secondary-500">
                  Mobile Number{" "}
                  {watchedFields.phone_number && !errors.phone_number && (
                    <CheckCircle2 className="inline text-primary-500 h-4 w-4" />
                  )}
                </Label>
                  <FloatingLabelPhoneInput
                    id="phone_number"
                    placeholder="Write your phone number"
                    error={errors.phone_number}
                    className={
                      watchedFields.phone_number
                        ? "border-primary-200"
                        : ""
                    }
                    {...register("phone_number")}
                  />
              </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-secondary-500">Country*</Label>
                  <Select id="country" {...register("country", {
                    required: "Country is required",
                    minLength: {
                      value: 2,
                      message: "Country must be at least 2 characters",
                    },
                  }
                  )}
                   className={cn(
                      errors.country ? "border-red-500" : watchedFields.country ? "border-primary-200" : ""
                    )}
                  >
                    <option value="" disabled selected>Select the country where your company is base</option>
                    {countries && countries.map((country: any) => (
                      <option key={country?.country} value={country?.country}>
                        {country.country}
                      </option>
                    ))}
                  </Select>
                  {errors.country && (
                    <span className="text-red-500 text-xs">{errors.country.message as string}</span>
                  )}
                </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="Business Relationship" className="text-secondary-500">
                      Region of Operation*{" "}
                      {watchedFields.relationship && !errors.relationship && (
                        <CheckCircle2 className="inline text-primary-500 h-4 w-4" />
                      )}
                    </Label>
                    <Select
                      id="region"
                      {...register("region", {
                        required: "Job level is required",
                        minLength: {
                          value: 3,
                          message: "Region must be at least 3 characters",
                        },
                      })}
                      className={cn(
                        errors.region ? "border-red-500" : watchedFields.region ? "border-primary-200" : ""
                      )}
                    >
                      <option value="" disabled selected>Select the main region(s) where your company operates</option>
                      <option value="AMERICAS">AMERICAS</option>
                      <option value="EMEA">EMEA</option>
                      <option value="APAC">APAC</option>
                      <option value="GLOBAL">GLOBAL</option>
                    </Select>
                    {errors.region && (
                      <span className="text-red-500 text-xs">{errors.region.message as string}</span>
                    )}
                  </div>
                </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-secondary-500">Address</Label>
                <Input id="address" {...register("address")} placeholder="Write your address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-secondary-500">Message</Label>
                <Textarea id="message" {...register("message")} className="min-h-[120px]" placeholder="Write your message" />
              </div>
                <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    {...register("agree", { required: "You must agree to our terms and conditions" })}
                    className={`mt-1 ${errors.agree ? "border-red-500 ring-red-500" : watchedFields.agree ? "border-primary-200" : ""}`}
                  />
                  <Label htmlFor="agree" className="text-gray-800 text-sm leading-relaxed">
                    By submitting this form, you agree that Active Re may process your personal information in
                    accordance with Active Re&apos;s privacy policy, including for the purpose of sending you information,
                    surveys and invitations to upcoming events.
                  </Label>
                </div>
                {errors.agree && <span className="text-red-500 text-xs ml-6">{errors.agree.message as string}</span>}
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={saveFormData} className="border border-secondary-500 text-secondary-500 flex items-center justify-center mr-2 hover:bg-secondary-500 hover:text-white transition-colors">
                  Save my data for later
                </Button>
                <Button type="submit" className="border border-primary-500 text-orange-700 italic px-4 py-2 flex items-center justify-between  hover:border-secondary-500 hover:bg-orange-700 hover:text-white transition " disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </section>
    </>
  );
}