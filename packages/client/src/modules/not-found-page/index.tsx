import { ClientModule } from "@app/module-client";
import { Route } from "react-router";
import Error404 from "./components/Error404";

export default new ClientModule({
    route: [<Route path="*" component={Error404}/>]
})