"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchInitialData } from "../hooks/useGetInitialData";
import { fetchFinancialInformation } from "../hooks/useGeFinancialInformation";
import { fetchLinesOfBusiness } from "../hooks/useGetLinesOfBusinnes";
import { fetchTeam } from "../hooks/useGetTeam";
import { fetchAbout } from "../hooks/useGetAbout";
import { fetchContacts } from "../hooks/useGetContacs";
import { fetchCareers } from "../hooks/useGetCarrers";
import { fetchInsights } from "../hooks/useGerInsigths";
import { fetchNavbar } from "../hooks/UseGetMenu";
import { fetchPrivacyPolicy, fetchAboutCookies, fetchTermsConditions } from "../hooks/useGetPoliciesandTerms";
import { fetchComplianceData } from "../hooks/useCompliance";

export interface DataCache {
  [key: string]: any;
}

export interface DataContextType {
  cache: DataCache | null;
  isLoading: boolean;
  setCache: React.Dispatch<React.SetStateAction<DataCache | null>>;
}

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ 
  children,
  initialData 
}: { 
  children: React.ReactNode;
  initialData?: DataCache;
}) => {
  const [cache, setCache] = useState<DataCache | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const pathname = usePathname();

  const markReady = () => {
    try {
      // eslint-disable-next-line
      (window as any).__APP_READY__ = true;
    } catch { /* empty */ }
  };

  const routeFetchMap: Record<string, () => Promise<unknown>> = {
    "/": fetchInitialData,
    "/about": fetchAbout,
    "/about-us": fetchAbout,
    "/finnancial-information": fetchFinancialInformation,
    "/lines-of-business": fetchLinesOfBusiness,
    "/our-team": fetchTeam,
    "/contacts": fetchContacts,
    "/compliance": fetchComplianceData,
    "/carrers": fetchCareers,
    "/careers": fetchCareers,
    "/insights": fetchInsights,
    "/privacy": fetchPrivacyPolicy,
    "/cookies": fetchAboutCookies,
    "/terms": fetchTermsConditions,
  };

  useEffect(() => {
    // Si ya tenemos datos iniciales del servidor, no hacer fetch en el cliente
    if (initialData) {
      setIsLoading(false);
      markReady();
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      const now = Date.now();
      
      // Verificar que estamos en el cliente antes de usar localStorage
      let cachedData: any = {};
      if (typeof window !== 'undefined') {
        try {
          cachedData = JSON.parse(localStorage.getItem("dataCache2") || "{}");
        } catch (error) {
          console.error('Error reading localStorage:', error);
          cachedData = {};
        }
      }

      if (cachedData.timestamp && now - cachedData.timestamp < 21600) {
        setCache(cachedData.data);
        setIsLoading(false);
        markReady();
        return;
      }

      // Special-case: for the annual report page, avoid preloading site-wide data.
      if (pathname === "/annual-report" || pathname.startsWith("/annual-report")) {
        const navbar = await fetchNavbar();
        setCache({ navbar });
        setIsLoading(false);
        markReady();
        return;
      }

      const path = Object.keys(routeFetchMap).find((route) =>
        pathname === route ||
        (route !== "/" && pathname.startsWith(route))
      );

      let prioritizedData = {};
      if (path) {
        // Fetch both the prioritized data and the navbar in parallel
        const [data, navbar] = await Promise.all([
          routeFetchMap[path](),
          fetchNavbar()
        ]);
        const key =
          path === "/" ? "initialData" : path.replace("/", "") + "Data";
        prioritizedData = { [key]: data, navbar };
        // Expose prioritized data immediately so UI can render something,
        // but do not mark app as ready until we have the full dataset.
        setCache(prioritizedData);
        Promise.allSettled([
          fetchInitialData(),
          fetchAbout(),
          fetchFinancialInformation(),
          fetchLinesOfBusiness(),
          fetchTeam(),
          fetchContacts(),
          fetchCareers(),
          fetchInsights(),
          fetchPrivacyPolicy(),
          fetchAboutCookies(),
          fetchTermsConditions(),
          fetchComplianceData(),
          fetchNavbar(),
        ]).then((results) => {
          const [
            initialDataR,
            aboutDataR,
            financialDataR,
            linesDataR,
            teamDataR,
            contactsDataR,
            careersDataR,
            insightsDataR,
            privacyDataR,
            cookiesDataR,
            termsDataR,
            complianceDataR,
            navbarR,
          ] = results;

          const initialData = initialDataR.status === 'fulfilled' ? initialDataR.value : undefined;
          const aboutData = aboutDataR.status === 'fulfilled' ? aboutDataR.value : undefined;
          const financialData = financialDataR.status === 'fulfilled' ? financialDataR.value : undefined;
          const linesData = linesDataR.status === 'fulfilled' ? linesDataR.value : undefined;
          const teamData = teamDataR.status === 'fulfilled' ? teamDataR.value : undefined;
          const contactsData = contactsDataR.status === 'fulfilled' ? contactsDataR.value : undefined;
          const careersData = careersDataR.status === 'fulfilled' ? careersDataR.value : undefined;
          const insightsData = insightsDataR.status === 'fulfilled' ? insightsDataR.value : undefined;
          const privacyData = privacyDataR.status === 'fulfilled' ? privacyDataR.value : undefined;
          const cookiesData = cookiesDataR.status === 'fulfilled' ? cookiesDataR.value : undefined;
          const termsData = termsDataR.status === 'fulfilled' ? termsDataR.value : undefined;
          const complianceData = complianceDataR.status === 'fulfilled' ? complianceDataR.value : undefined;
          const navbar = navbarR.status === 'fulfilled' ? navbarR.value : undefined;

          const fullData = {
            initialData,
            aboutData,
            financialData,
            linesData,
            teamData,
            contactsData,
            careersData,
            insightsData,
            privacyData,
            cookiesData,
            termsData,
            complianceData,
            navbar,
            ...prioritizedData,
          };
          setCache(fullData);
          setIsLoading(false);
          markReady();
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(
                "dataCache2",
                JSON.stringify({ data: fullData, timestamp: now })
              );
            } catch (error) {
              console.error('Error saving to localStorage:', error);
            }
          }
        });
        return;
      }

      const [
        initialData,
        aboutData,
        financialData,
        linesData,
        teamData,
        contactsData,
        careersData,
        insightsData,
        privacyData,
        cookiesData,
        termsData,
        complianceData,
        navbar,
      ] = await Promise.all([
        fetchInitialData(),
        fetchAbout(),
        fetchFinancialInformation(),
        fetchLinesOfBusiness(),
        fetchTeam(),
        fetchContacts(),
        fetchCareers(),
        fetchInsights(),
        fetchPrivacyPolicy(),
        fetchAboutCookies(),
        fetchTermsConditions(),
        fetchComplianceData(),
        fetchNavbar(),
      ]);
      const fullData = {
        initialData,
        aboutData,
        financialData,
        linesData,
        teamData,
        contactsData,
        careersData,
        insightsData,
        privacyData,
        cookiesData,
        termsData,
        complianceData,
        navbar,
      };
      setCache(fullData);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            "dataCache2",
            JSON.stringify({ data: fullData, timestamp: now })
          );
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }
      setIsLoading(false);
      markReady();
    };

    loadData();
  }, [pathname]);

  return (
    <DataContext.Provider value={{ cache, isLoading, setCache }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};