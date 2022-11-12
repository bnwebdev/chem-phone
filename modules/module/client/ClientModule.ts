import { ReactElement, cloneElement } from "react"

import CommonModule, { CommonModuleShape } from "@app/module-common";

export interface SingleNavItem {
    link: string
    label: string
}

export interface DropdownNavItem {
    label: string
    children: NavItem[]
}

export type NavItem = SingleNavItem | DropdownNavItem

export interface ClientModuleShape extends CommonModuleShape {
    leftNavItem?: NavItem[],
    rightNavItem?: NavItem[],
    route?: ReactElement[]
}

export interface ClientModule extends ClientModuleShape {}

export class ClientModule extends CommonModule {
    constructor(...modules: ClientModuleShape[]) {
        super(...modules)
    }

    get routes() {
        return (this.route || []).map((element, idx) => cloneElement(element, { key: element.key || idx }))
    }
    get leftNavItems() {
        return this.leftNavItem || []
    }
    get rightNavItems() {
        return this.rightNavItem || []
    }
    get navItems() {
        return [...this.leftNavItems, ...this.rightNavItems]
    }
}
