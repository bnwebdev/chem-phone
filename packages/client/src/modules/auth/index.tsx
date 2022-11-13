import { ClientModule } from "@app/module-client";
import { Route } from "react-router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import source from "./locale";

export default new ClientModule({
  route: [
    <Route path="/signin" component={SignIn} />,
    <Route path="/signup" component={SignUp} />
  ],
  rightNavItem: [
    { label: 'auth:labels.signIn', link: "/signin" },
    { label: 'auth:labels.signUp', link: "/signup" },
  ],
  localization: [{ namespace: 'auth', source }]
})