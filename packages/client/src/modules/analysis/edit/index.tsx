import { ClientModule } from "@app/module-client";
import { AuthRoute } from "../../auth/components";
import Analysis from "./pages/Analysis";

export default new ClientModule({
  route: [<AuthRoute auth path="/analysis/:id" component={Analysis} />],
});
