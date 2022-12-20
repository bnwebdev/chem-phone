import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useAuth } from "../../auth/context/AuthProvider";

const Home: FC = () => {
  const { identity } = useAuth();

  return (
    <Stack mt={3} spacing={3}>
      <Typography variant="h3">
        Hello, {identity ? identity.username : `analyst`}!
      </Typography>
      <Typography variant="body1">
        This app provides the ability to run colorimetric rapid assays from your
        device. First of all, we are focused on supporting mobile devices, as it
        is very convenient. You have both a data collector (camera) and an
        analyzer (app) in your pocket, making life a lot easier. You no longer
        need to look for color scales - just save them once and you can use
        them.
      </Typography>
      {identity && (
        <ButtonGroup orientation="vertical" fullWidth>
          <Button href="/methods/create">Create method</Button>
          <Button href="/analyses/create">Create analysis</Button>
        </ButtonGroup>
      )}
      {!identity && (
        <ButtonGroup orientation="vertical" fullWidth>
          <Button href="/signin">Login</Button>
          <Button href="/signup">Create account</Button>
        </ButtonGroup>
      )}
    </Stack>
  );
};

export default Home;
