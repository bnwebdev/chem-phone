import { foldTo } from "fractal-objects"

export interface ModuleShape {
    onAppCreate?: Array<(module: Module) => Promise<void>>
}

export interface Module extends ModuleShape {}

export class Module {
    constructor(...modules: ModuleShape[]) {
        foldTo(this, modules)
    }

    createApp() {
        if (this.onAppCreate) {
            this.onAppCreate.map((onAppCreate) => onAppCreate(this))
        }
    }
}