import { ClientModule } from "@app/module-client";
import { Route } from "react-router";

import Home from "./components/Home";
import source from "./locale";

export default new ClientModule({
  route: [<Route key="not-auth-index" path="/" exact component={Home} />],
  localization: [{ namespace: "home", source }],
});
