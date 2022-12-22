import { Resource } from "i18next"
import { Module, ModuleShape } from "./Module"

export interface CommonModuleShape extends ModuleShape {
    localization?: Array<{ namespace: string, source: Resource }>
    context?: Record<string, any>
}

export interface CommonModule extends CommonModuleShape {}

export class CommonModule extends Module {
    constructor(...modules: CommonModuleShape[]) {
        super(...modules)
    }

    get localizations() {
        return this.localization || []
    }
}