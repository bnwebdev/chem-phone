import { ClientModule } from "@app/module-client";

import { AuthRoute } from "../../auth/components";
import MethodEdit from "./components/MethodEdit";

export default new ClientModule({
  route: [<AuthRoute path="/method/:id" component={MethodEdit} />],
});
