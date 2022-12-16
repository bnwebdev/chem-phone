import { PropsWithChildren, FC, ReactElement, cloneElement } from "react";

import CommonModule, { CommonModuleShape } from "@app/module-common";

export interface BaseNavItem {
  label: string;
  auth?: boolean;
}

export interface SingleNavItem extends BaseNavItem {
  link: string;
}

export interface DropdownNavItem extends BaseNavItem {
  children: NavItem[];
}

export type NavItem = SingleNavItem | DropdownNavItem;

export interface ClientModuleShape extends CommonModuleShape {
  leftNavItem?: NavItem[];
  rightNavItem?: NavItem[];
  route?: ReactElement[];
  contextProvider?: FC<PropsWithChildren>[];
}

export interface ClientModule extends ClientModuleShape {}

export class ClientModule extends CommonModule {
  constructor(...modules: ClientModuleShape[]) {
    super(...modules);
  }

  get routes() {
    return (this.route || []).map((element, idx) =>
      cloneElement(element, { key: element.key || idx })
    );
  }
  get leftNavItems() {
    return this.leftNavItem || [];
  }
  get rightNavItems() {
    return this.rightNavItem || [];
  }
  get navItems() {
    return [...this.leftNavItems, ...this.rightNavItems];
  }
  get contextProviders() {
    return this.contextProvider || [];
  }
}
