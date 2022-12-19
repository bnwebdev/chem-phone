import { FC } from "react";
import { Route, RouteProps } from "react-router";
import { useAuth } from "../context/AuthProvider";

type Props = RouteProps & {
  auth?: boolean;
  to?: string;
};

const AuthRoute: FC<Props> = ({ auth, path, to, ...props }) => {
  const { identity } = useAuth();

  const authCompare = auth === undefined ? true : auth;

  if (authCompare !== Boolean(identity)) {
    return null;
  }

  return <Route {...props} path={to || path} />;
};

export default AuthRoute;
