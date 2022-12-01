import { ClientModule } from "@app/module-client";
import { AuthRoute } from "../../auth/components";
import MethodList from "./components/MethodList";

export default new ClientModule({
  route: [<AuthRoute path="/methods/photo-analysis" component={MethodList} />],
});
