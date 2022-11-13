import { foldTo } from "fractal-objects"

export interface ModuleShape {
    onAppCreate?: Array<(module: Module) => Promise<void>>
    onBeforeAppCreate?: Array<(module: Module) => Promise<void>>
}

export interface Module extends ModuleShape {}

export class Module {
    constructor(...modules: ModuleShape[]) {
        foldTo(this, modules)
    }

    async createApp() {
        if (this.onBeforeAppCreate) {
            await Promise.all(this.onBeforeAppCreate.map((onBeforeAppCreate) => onBeforeAppCreate(this)))
        }
        if (this.onAppCreate) {
            await Promise.all(this.onAppCreate.map((onAppCreate) => onAppCreate(this)))
        }
    }
}