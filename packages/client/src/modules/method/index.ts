import { ClientModule } from "@app/module-client";
import create from "./create";

import source from "./locale";

export default new ClientModule(create, {
  localization: [{ namespace: "methods", source }],
  leftNavItem: [
    {
      label: "methods:labels.root",
      auth: true,
      children: [
        {
          label: "methods:labels.create",
          link: "/methods/create",
        },
        {
          label: "methods:labels.draft",
          link: "/methods/draft",
        },
        {
          label: "methods:labels.editable",
          link: "/methods/editable",
        },
        {
          label: "methods:labels.completed",
          link: "/methods/completed",
        },
      ],
    },
  ],
});
