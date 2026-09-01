"use client"
import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";
import { useContactFormRRHH } from "../../hooks/useContactFormRRHH";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CarrersForm() {
  const { formStep, register, handleSubmit, onSubmit, errors, isSubmitting, watch, setValue } = useContactFormRRHH();

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
      Object.keys(data).forEach((key) => setValue(key as any, data[key]));
    }
  }, [setValue]);

  return (
    <>
      <ToastContainer position="top-center" />
      <section className="section-container">
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
              <div className="space-y-2">
                <Label htmlFor="message" className="text-secondary-500">Message</Label>
                <Textarea id="message" {...register("message", { required: "Message is required" })} className={errors.message ? "border-red-500" : watchedFields.message ? "border-primary-200" : ""} placeholder="Write your message" />
                  {errors.message && (
                    <span className="text-red-500 text-xs">{errors.message.message as string}</span>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="file" className="text-secondary-500">File (Resume)</Label>
                <Input id="file" type="file" {...register("file", { required: "Resume is required" })} className={errors.file ? "border-red-500" : watchedFields.file ? "border-primary-200" : ""} />
                  {errors.file && (
                    <span className="text-red-500 text-xs">{errors.file.message as string}</span>
                  )}
              </div>
              <div className="space-y-2">
                <div className="gap-4 display: flex items-center justify-between">
                <input type="checkbox" id="agree" {...register("agree" as any, { required: "You must agree to our terms and conditions" })} />
                <Label htmlFor="message" className="text-gray-800">By submitting this form, you agree that Active Re may process your personal information in accordance with Active Re&apos;s privacy policy, including for the purpose of sending you information, surveys and invitations to upcoming events.</Label>
                </div>
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