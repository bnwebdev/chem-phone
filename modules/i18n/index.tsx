import { CommonModule, Module } from "@app/module-common";
import i18next, { InitOptions } from "i18next";

export * from './hooks'

type Namesapace = string
type Language = string

const I18N_CONFIG: InitOptions = {
  fallbackLng: 'en',
  resources: {},
  debug: false, // set true to show logs
};

const onBeforeAppCreate = async (typeAllowedModules: Module) => {
    const modules = typeAllowedModules as CommonModule
    const localization = new Map<Language, Map<Namesapace, any>>()
    await i18next.init(I18N_CONFIG)

    modules.localizations.forEach(localizationSources => {
        const {namespace, source} = localizationSources
        Object.entries(source || {}).map(([lng, sources]) => {
            if (!localization.has(lng)) {
                localization.set(lng, new Map())
            }

            const namespaceSourceMap = localization.get(lng) as Map<Namesapace, any>

            if (!namespaceSourceMap.has(namespace)){
                namespaceSourceMap.set(namespace, {})
            }

            const namespaceSources = namespaceSourceMap.get(namespace) as Record<string, any>
            namespaceSourceMap.set(namespace, { ...namespaceSources, ...sources })
        })
    })

    Array.from(localization).forEach(([lng, namespaceMap]) => {
        Array.from(namespaceMap).forEach(([namespace, sources]) => {
            i18next.addResourceBundle(lng, namespace, sources)
        })
    })
}

export default new CommonModule({
    onBeforeAppCreate: [onBeforeAppCreate],
})