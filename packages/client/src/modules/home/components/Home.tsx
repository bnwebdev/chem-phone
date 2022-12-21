import { useTranslation } from "@app/i18n";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useAuth } from "../../auth/context/AuthProvider";

const Home: FC = () => {
  const { identity } = useAuth();

  const i18n = useTranslation("home");

  return (
    <Stack mt={3} spacing={3}>
      <Typography variant="h3">
        {
          i18n.t("greating", {
            name: identity?.username || "analyst",
          }) as string
        }
      </Typography>
      <Typography variant="body1">
        {i18n.t("appDescription") as string}
      </Typography>
      {identity && (
        <ButtonGroup orientation="vertical" fullWidth>
          <Button href="/methods/create">
            {i18n.t<string>("links.createMethod")}
          </Button>
          <Button href="/analyses/create">
            {i18n.t<string>("links.createAnalysis")}
          </Button>
        </ButtonGroup>
      )}
      {!identity && (
        <ButtonGroup orientation="vertical" fullWidth>
          <Button href="/signin">{i18n.t<string>("links.signIn")}</Button>
          <Button href="/signup">{i18n.t<string>("links.signUp")}</Button>
        </ButtonGroup>
      )}
    </Stack>
  );
};

export default Home;
