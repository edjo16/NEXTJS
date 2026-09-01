"use client";

import React from "react";
import { useForm } from "react-hook-form";

export interface ContactFormValues {
  name: string;
  email: string;
  company_name: string;
  job_title: string;
  job_level: string;
  relationship: string;
  phone_number: string;
  address?: string;
  country?: string;
  region?: string;
  message?: string;
  interests: string;
}
export const fetchOptions = async (apiUrl: string) => {
    const response = await fetch(`${apiUrl}/items/get_in_touch`);
    if (!response.ok) throw new Error("Failed to fetch options");
    const data = await response.json();
    return data.data;
  };

export const countries = async (apiUrl: string) => {
  const response = await fetch(`${apiUrl}/items/mpais?limit=-1`);
  if (!response.ok) throw new Error("Failed to fetch countries");
  const data = await response.json();
  return data.data;
};

export function useContactForm(apiUrl: string) {

  const [options, setOptions] = React.useState<{ id: string; label: string }[]>([]);
  const [countriesData, setCountries] = React.useState<{ name: string; region: string }[]>([]);

  const staticDefaultValues = React.useMemo<ContactFormValues>(() => ({
    name: "",
    email: "",
    company_name: "",
    job_title: "",
    job_level: "",
    relationship: "",
    phone_number: "",
    address: "",
    country: "",
    region: "",
    message: "",
    interests: "",
  }), []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({ defaultValues: staticDefaultValues, mode: "onChange" });

  React.useEffect(() => {
    fetchOptions(apiUrl).then((data) => {
      const opts = data.map((item: any) => ({
        id: item.label,
        label: item.label,
      }));
      setOptions(opts);
      countries(apiUrl).then((countryData) => {
        setCountries(countryData);
        reset({
        ...staticDefaultValues,
      });
    });

    });
  }, [apiUrl, reset, staticDefaultValues]);


  const [formStep, setFormStep] = React.useState(0);

  const nextStep = () => setFormStep((prev) => Math.min(prev + 1, 1));
  const prevStep = () => setFormStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: ContactFormValues) => {
    const payload = {
      ...data,
      contact_interest: data.interests || '',
    };
    const response = await fetch(`${apiUrl}/items/contacts_data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const response2 = await fetch(`https://prod-110.westus.logic.azure.com:443/workflows/be1747235eda457d97818df8c9224159/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=J8oF9gikZMe4m3TGQwaPLErIIGyOzTaACi7MEBtfJ5M`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok || !response2.ok) throw new Error("Failed to submit the form");
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
    options,
    countries: countriesData,
  };
}