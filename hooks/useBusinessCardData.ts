"use client";

import { useEffect, useState } from "react";
import { fetchPersonal } from "./UseGetPersonal";
import { ContactInfo } from "../types/contacts";

export function useBusinessCardData(code?: string | null) {
  const [businessCardData, setBusinessCardData] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!code) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setNotFound(false);
    fetchPersonal(code)
      .then(data => {
        setBusinessCardData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setIsLoading(false);
      });
  }, [code]);

  return { businessCardData, isLoading, notFound };
}