"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Define types
interface CamposData {
  [key: string]: { value: string; label: string }[];
}

const fieldsKeys = [
  "mestruct",
  "mactivieco",
  "manoconst",
  "businessdevelopers",
  "mpep",
  "mpepj",
  "mingreso",
  "morigen",
  "mcomporta",
];

let API_URL = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/m_kyc`;
if (!API_URL) {
  API_URL = "https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/items/m_kyc";
}

interface CamposContextType {
  fields_key: CamposData | null;
  loading: boolean;
}

const CamposContext = createContext<CamposContextType>({ fields_key: null, loading: true });

// LocalStorage cache config for fieldsData
const FIELDS_DATA_KEY = "fieldsData";
const THREE_HOURS_MS = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

interface StoredFieldsData {
  data: CamposData;
  ts: number; // timestamp (ms since epoch)
}

// Provider component
export const KycProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fields_key, setCampos] = useState<CamposData | null>(null);
  const [loading, setLoading] = useState(true);

  type Opcion = { value: string; label: string };
  type CamposData = Record<string, Opcion[]>;

  const fetchForKeys = async (keys: string[]): Promise<CamposData> => {
    const requests = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    const { data } = requests;

    const regroup: CamposData = data.reduce((acc: CamposData, rec: any) => {
      const key = rec?.m_type ?? "UNKNOWN";
      acc[key] ??= [];
      acc[key].push({
        value: String(rec?.id ?? ""),
        label: rec?.xdescripcion ?? "",
      });
      return acc;
    }, {} as CamposData);

    return regroup;
  };


  const fetchCountries = async () => {
    const response = await fetch("https://active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net/items/mpais?fields=country&limit=-1");
    const { data } = await response.json();
    const countries = data && data.map((item: any) => ({
      value: item.country,
      label: item.country,
    }));
    return countries;

  }


  // Load prioritized first, then background remaining
  const loadSequentially = async () => {

    const countries = await fetchCountries();

    const keys = await fetchForKeys(fieldsKeys);
    const prData = { ...keys, countries: countries };
    setCampos(prData);
    setLoading(false);

  };

  useEffect(() => {
    const stored = localStorage.getItem(FIELDS_DATA_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as StoredFieldsData | CamposData;

        // If it matches the new shape with timestamp, enforce TTL
        if (
          parsed &&
          typeof parsed === "object" &&
          "data" in parsed &&
          "ts" in parsed &&
          typeof (parsed as StoredFieldsData).ts === "number"
        ) {
          const { data, ts } = parsed as StoredFieldsData;
          const isFresh = Date.now() - ts < THREE_HOURS_MS;
          if (isFresh) {
            setCampos(data);
            setLoading(false);
            return;
          }
          // Expired: clear and refetch
          localStorage.removeItem(FIELDS_DATA_KEY);
        } else {
          // Legacy format without timestamp: treat as expired to enforce max 3 hours
          localStorage.removeItem(FIELDS_DATA_KEY);
        }
      } catch (error) {
        console.error("Failed to parse stored data:", error);
        localStorage.removeItem(FIELDS_DATA_KEY);
      }
    }
    // No valid cache or expired: fetch fresh
    loadSequentially();
  }, []);

  return (
    <CamposContext.Provider value={{ fields_key, loading }}>
      {children}
    </CamposContext.Provider>
  );
};

export const useKyc = (): CamposContextType => useContext(CamposContext);