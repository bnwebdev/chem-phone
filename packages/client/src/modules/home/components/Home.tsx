import { FC } from "react";
import { useIdentity } from "../../auth/graphql/queries";
import AuthHome from "./AuthHome";
import NotAuthHome from "./NotAuthHome";

const Home: FC = () => {
  const { identityData, identityLoading } = useIdentity();

  if (identityLoading) {
    return null;
  }

  return !!identityData ? <AuthHome /> : <NotAuthHome />;
};

export default Home;
