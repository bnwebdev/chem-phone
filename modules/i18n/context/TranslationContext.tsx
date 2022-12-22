import { createContext, FC, PropsWithChildren, useMemo } from "react";
import useCookie from "react-use-cookie";

export type SupportedLocales = "en" | "us";

type TranslationContextType = {
  language: SupportedLocales;
  setLanguage: (lng: string) => void;
};

export const TranslationContext = createContext<TranslationContextType>(
  null as unknown as TranslationContextType
);

export const TranslationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useCookie("chemphone:lang", "en");

  const context = useMemo(() => {
    const provideLanguage = ["en", "ua"].includes(language) ? language : "en";

    return {
      language: provideLanguage as SupportedLocales,
      setLanguage: (lng: string) => setLanguage(lng, { days: Infinity }),
    };
  }, [language]);

  return (
    <TranslationContext.Provider value={context}>
      {children}
    </TranslationContext.Provider>
  );
};
