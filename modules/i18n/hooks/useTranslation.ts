import i18next from "i18next";
import { useContext, useMemo } from "react";
import { TranslationContext } from "../context";

export const useTranslation = (namespace?: string) => {
  const { language } = useContext(TranslationContext);

  const i18n = useMemo(
    () => i18next.cloneInstance({ defaultNS: namespace, lng: language }),
    [namespace, language]
  );

  return i18n;
};
