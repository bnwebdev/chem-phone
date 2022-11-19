import { Button, FormControl, Grid, Input, InputLabel, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useLogin } from "../graphql/queries";

type InputData = {
    username: string
    password: string
}

const SignIn: FC = () => {
  const { login, loginLoading, loginError } = useLogin()

  const history = useHistory()

  const { register, handleSubmit } = useForm<InputData>()

  const onSubmit = useCallback(async (input: InputData) => {
    await login(input)
    history.push('/')
  }, [login, history])

  return <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container justifyContent="center" mt={3} mb={3}>
        <Grid item xs={12} md={8} lg={6} container justifyContent="end">
            <Grid item xs={12} mb={3}>
                <FormControl size="medium" fullWidth>
                    <InputLabel htmlFor="my-input">Username</InputLabel>
                    <Input {...register('username', { required: true })} />
                </FormControl>
            </Grid>
            <Grid item xs={12} mb={3}>
                <FormControl size="medium" fullWidth>
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input type="password" {...register('password', { required: true })}/>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Button
                    variant="outlined"
                    fullWidth
                    type="submit"
                    disabled={loginLoading}
                >Submit</Button>
            </Grid>
        </Grid>
    </Grid>
    <Grid container justifyContent="center">
        { loginError && <Typography color="firebrick">{loginError.message}</Typography>}
    </Grid>
  </form>
}

export default SignIn;