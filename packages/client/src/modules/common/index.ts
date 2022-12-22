import { ClientModule } from "@app/module-client";
import source from "./locale";

export default new ClientModule({
  localization: [{ namespace: "common", source }],
});
