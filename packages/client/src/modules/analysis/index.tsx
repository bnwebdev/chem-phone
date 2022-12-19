import { ClientModule } from "@app/module-client";
import create from "./create";
import edit from "./edit";
import source from "./locale";

export default new ClientModule(create, edit, {
  localization: [{ namespace: "analyses", source }],
  leftNavItem: [
    {
      auth: true,
      label: "analyses:labels.root",
      children: [
        {
          label: "analyses:labels.create",
          link: "/analyses/create",
        },
        {
          label: "analyses:labels.draft",
          link: "/analyses/draft",
        },
        {
          label: "analyses:labels.completed",
          link: "/analyses/completed",
        },
      ],
    },
  ],
});
