import { ClientModule } from "@app/module-client";
import core from "@app/core-client";

import notFoundPage from "./not-found-page";

export default new ClientModule(core, notFoundPage)