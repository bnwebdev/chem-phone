import { FC } from "react";
import { useAuth } from "../../auth/context/AuthProvider";
import AuthHome from "./AuthHome";
import NotAuthHome from "./NotAuthHome";

const Home: FC = () => {
  const { identity } = useAuth();

  return !!identity ? <AuthHome /> : <NotAuthHome />;
};

export default Home;
