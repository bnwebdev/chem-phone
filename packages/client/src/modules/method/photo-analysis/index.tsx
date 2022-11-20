import { ClientModule } from "@app/module-client";
import { AuthRoute } from "../../auth/components";
import PhotoAnalyzer from "./components/PhotoAnalyzer";


export default new ClientModule({
    route: [
        <AuthRoute auth path="/methods/photo-analysis" component={PhotoAnalyzer} />
    ],
})