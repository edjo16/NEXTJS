import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";
import { useContactFormCompliance } from "../../hooks/useContactFormCompliance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContacFormCompliance() {
  //@ts-ignore
  const { formStep, register, handleSubmit, onSubmit, errors, isSubmitting, watch, setValue, options }: {
    formStep: number;
    register: any;
    handleSubmit: any;
    onSubmit: (data: any) => Promise<void>;
    errors: any;
    isSubmitting: boolean;
    watch: any;
    setValue: (field: string, value: any) => void;
  } = useContactFormCompliance();

  // Para checks verdes
  const watchedFields = watch();

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
      <ToastContainer position="top-center" />
      <section className="mb-16">
        <div className="border-t-4 border-secondary-500 w-16 mb-4"></div>
        <h2 className="text-2xl font-bold text-primary-500 mb-6">Get in touch</h2>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
        >
          {formStep === 0 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <section className="">
                  <Label className="text-secondary-500">
                    Committed to serving you, how can we assist you?
                  </Label>                
              </section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="space-y-2 relative">
                  <Label htmlFor="company_name" className="text-secondary-500">
                    Company name*{" "}
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
              <div className="space-y-2">
                <Label htmlFor="message" className="text-secondary-500">Message</Label>
                <Textarea id="message" {...register("message", { required: "Message is required" })} className={errors.message ? "border-red-500" : watchedFields.message ? "border-primary-200" : ""} placeholder="Write your message" />
                  {errors.subject && (
                    <span className="text-red-500 text-xs">{errors.message.message as string}</span>
                  )}
              </div>
              <div className="flex justify-between">
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