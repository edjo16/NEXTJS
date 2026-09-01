import React, { createContext, useState, useContext, useEffect } from 'react';

type LanguageContextType = {
  languageCode: string;
  setLanguageCode: (code: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [languageCode, setLanguageCode] = useState(() => {
    const storedLanguage = localStorage.getItem('languageCode');
    return storedLanguage || 'en-US';
  });

  useEffect(() => {
    localStorage.setItem('languageCode', languageCode);
  }, [languageCode]);

  return (
    <LanguageContext.Provider value={{ languageCode, setLanguageCode }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};