import { useTranslation } from "@app/i18n";
import { Button, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import ErrorHolder from "../../common/components/ErrorHolder";
import { useLogin } from "../graphql/queries";

type InputData = {
  username: string;
  password: string;
};

const SignIn: FC = () => {
  const { login, loginLoading, loginError } = useLogin();

  const history = useHistory();
  const i18n = useTranslation("auth");

  const { register, handleSubmit } = useForm<InputData>();

  const onSubmit = useCallback(
    async (input: InputData) => {
      const { error } = await login(input);

      if (!error) {
        history.push("/");
        history.go(0);
      }
    },
    [login, history]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center" mt={3} mb={3}>
        <Grid item xs={12} md={8} lg={6} container justifyContent="end">
          <Grid item xs={12} mb={3}>
            <FormControl size="medium" fullWidth>
              <InputLabel htmlFor="my-input">
                {i18n.t("signin.username") as string}
              </InputLabel>
              <Input {...register("username", { required: true })} />
            </FormControl>
          </Grid>
          <Grid item xs={12} mb={3}>
            <FormControl size="medium" fullWidth>
              <InputLabel htmlFor="my-input">
                {i18n.t("signin.password") as string}
              </InputLabel>
              <Input
                type="password"
                {...register("password", { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Button
              variant="outlined"
              fullWidth
              type="submit"
              disabled={loginLoading}
            >
              {i18n.t("signin.submit") as string}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <ErrorHolder error={loginError} />
      </Grid>
    </form>
  );
};

export default SignIn;
