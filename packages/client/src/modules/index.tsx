import { ClientModule } from "@app/module-client";
import core from "@app/core-client";
import i18n from "@app/i18n";

import notFoundPage from "./not-found-page";
import auth from "./auth";
import method from './method'

export default new ClientModule(method, auth, core, i18n, notFoundPage)