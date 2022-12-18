import { ClientModule } from "@app/module-client";
import { Route } from "react-router";

import Home from "./components/Home";

export default new ClientModule({
  route: [<Route key="not-auth-index" path="/" exact component={Home} />],
});
