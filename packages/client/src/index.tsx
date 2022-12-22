import RootModule from "./modules";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const bootstrap = async () => {
  await RootModule.createApp();
};

bootstrap().catch(console.error);
