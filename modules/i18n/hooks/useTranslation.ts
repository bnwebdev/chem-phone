import i18next from "i18next"
import { useMemo } from "react"

export const useTranslation = (namespace?: string) => {
    const i18n = useMemo(() => i18next.cloneInstance({ defaultNS: namespace }), [namespace]);
    
    return i18n;
}