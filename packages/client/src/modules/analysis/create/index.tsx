import { ClientModule } from "@app/module-client";
import { AuthRoute } from "../../auth/components";
import Create from "./pages/Create";

export default new ClientModule({
  route: [<AuthRoute path="/analyses/create" component={Create} />],
});
