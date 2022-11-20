import { ClientModule } from "@app/module-client";

import { AuthRoute } from "./components";

import Logout from "./components/Logout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import source from "./locale";

export default new ClientModule({
  route: [
    <AuthRoute auth={false} path="/signin" component={SignIn} />,
    <AuthRoute auth={false} path="/signup" component={SignUp} />,
    <AuthRoute auth={true} path="/logout" component={Logout} />,
  ],
  rightNavItem: [
    { label: 'auth:labels.signIn', link: "/signin", auth: false },
    { label: 'auth:labels.signUp', link: "/signup", auth: false },
    { label: 'auth:labels.logout', link: "/logout", auth: true }
  ],
  localization: [{ namespace: 'auth', source }]
})