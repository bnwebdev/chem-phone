import { ClientModule } from "@app/module-client";
import { Route } from "react-router";
import Logout from "./components/Logout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import source from "./locale";

export default new ClientModule({
  route: [
    <Route path="/signin" component={SignIn} />,
    <Route path="/signup" component={SignUp} />,
    <Route path="/logout" component={Logout} />,
  ],
  rightNavItem: [
    { label: 'auth:labels.signIn', link: "/signin", auth: false },
    { label: 'auth:labels.signUp', link: "/signup", auth: false },
    { label: 'auth:labels.logout', link: "/logout", auth: true }
  ],
  localization: [{ namespace: 'auth', source }]
})