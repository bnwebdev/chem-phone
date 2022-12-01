import { ClientModule } from "@app/module-client";

import { AuthRoute } from "../../auth/components";
import CreateMethod from "./components/CreateMethod";

export default new ClientModule({
  route: [<AuthRoute path="/methods/create" component={CreateMethod} />],
});
