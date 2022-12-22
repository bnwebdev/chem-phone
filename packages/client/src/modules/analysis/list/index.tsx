import { ClientModule } from "@app/module-client";

import { AuthRoute } from "../../auth/components";
import AnalysesList from "./components/AnalysesList";

export default new ClientModule({
  route: [<AuthRoute auth path="/analyses/:status" component={AnalysesList} />],
});
