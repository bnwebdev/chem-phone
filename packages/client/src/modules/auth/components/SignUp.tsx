import { useTranslation } from "@app/i18n";
import { Button, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import ErrorHolder from "../../common/components/ErrorHolder";
import { useRegister } from "../graphql/mutations";

type InputData = {
  username: string;
  password: string;
  confirm: string;
};

const SignIn: FC = () => {
  const { register: signup, registerLoading, registerError } = useRegister();
  const history = useHistory();
  const i18n = useTranslation("auth");

  const { register, handleSubmit } = useForm<InputData>();

  const onSubmit = useCallback(
    async (input: InputData) => {
      const { errors } = await signup(input);

      if (!errors) {
        history.push("/signin");
      }
    },
    [signup, history]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center" mt={3} mb={3}>
        <Grid item xs={12} md={8} lg={6} container justifyContent="end">
          <Grid item xs={12} mb={3}>
            <FormControl size="medium" fullWidth>
              <InputLabel htmlFor="my-input">
                {i18n.t("signup.username") as string}
              </InputLabel>
              <Input {...register("username", { required: true })} />
            </FormControl>
          </Grid>
          <Grid item xs={12} mb={3}>
            <FormControl size="medium" fullWidth>
              <InputLabel htmlFor="my-input">
                {i18n.t("signup.password") as string}
              </InputLabel>
              <Input
                type="password"
                {...register("password", { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} mb={3}>
            <FormControl size="medium" fullWidth>
              <InputLabel htmlFor="my-input">
                {i18n.t("signup.confirm") as string}
              </InputLabel>
              <Input
                type="password"
                {...register("confirm", { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} mb={3}>
            <ErrorHolder error={registerError} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Button
              variant="outlined"
              fullWidth
              type="submit"
              disabled={registerLoading}
            >
              {i18n.t("signup.submit") as string}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignIn;
