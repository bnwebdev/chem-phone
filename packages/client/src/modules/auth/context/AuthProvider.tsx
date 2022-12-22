import { CircularProgress, Grid, Typography } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { _useIdentity } from "../graphql/queries";
import { Identity } from "../graphql/types";

export type AuthContextType = {
  identity: Identity | null | undefined;
};

const AuthContext = createContext<AuthContextType>({ identity: null });

AuthContext.displayName = "AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { identityData, identityError, identityLoading } = _useIdentity();

  if (identityLoading) {
    return (
      <Grid container justifyContent={"center"} margin={3}>
        <CircularProgress />
      </Grid>
    );
  }

  if (identityError) {
    return (
      <Grid container justifyContent={"center"} margin={3}>
        <Typography variant="h1" color="error">
          {identityError.message}
        </Typography>
      </Grid>
    );
  }

  return (
    <AuthContext.Provider value={{ identity: identityData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
