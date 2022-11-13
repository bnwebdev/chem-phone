import { ClientModule } from "@app/module-client";
import core from "@app/core-client";
import i18n from "@app/i18n";

import notFoundPage from "./not-found-page";
import auth from "./auth";

export default new ClientModule(auth, core, i18n, notFoundPage)