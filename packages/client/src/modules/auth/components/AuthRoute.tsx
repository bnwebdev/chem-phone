import { FC } from "react";
import { Route, RouteProps } from "react-router";

import { useIdentity } from "../graphql/queries";

type Props = RouteProps & {
  auth?: boolean;
  to?: string;
};

const AuthRoute: FC<Props> = ({ auth, path, to, ...props }) => {
  const { identityData, identityLoading } = useIdentity();

  if (identityLoading) {
    return null;
  }

  const authCompare = auth === undefined ? true : auth;

  if (authCompare !== Boolean(identityData)) {
    return null;
  }

  return <Route {...props} path={to || path} />;
};

export default AuthRoute;
