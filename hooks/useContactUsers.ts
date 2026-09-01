"use client";

import React from "react";
import { useForm } from "react-hook-form";

export interface ContactFormValues {
  email: string;
  company_name: string;
  city?: string;
  country?: string;
  region?: string;
  message?: string;
  subject?: string;
  file: File
}

export function useContactUsers() {


  const defaultValues: ContactFormValues = {
    email: "",
    company_name: "",
    subject: "",
    message: "",
    file: null as unknown as File,
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({ defaultValues, mode: "onChange" });

  const [formStep, setFormStep] = React.useState(0);

  const nextStep = () => setFormStep((prev) => Math.min(prev + 1, 1));
  const prevStep = () => setFormStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: ContactFormValues) => {


    const payload = {
    email_sender: data.email, 
    email_recipient:"rh@acreinsurance.com",
    subject: data.company_name + " - " + data.subject,
    body: data.message,
    file: data.file,
    };
    const response = await fetch(`https://prod-181.westus.logic.azure.com:443/workflows/287f4280bb244b1dadfb539c371bdc15/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oAOEZjwoYxwG9WqyMthZ30hT4d0qaVEX9KMWPRT3-yA`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to submit the form");
    reset();
  };

  return {
    formStep,
    nextStep,
    prevStep,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    watch,
    setValue,
  };
}