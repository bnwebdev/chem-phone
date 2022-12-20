import { useTranslation } from "@app/i18n";
import { MethodStatus } from "@app/method";
import { LoadingButton } from "@mui/lab";
import {
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import ErrorHolder from "../../../common/components/ErrorHolder";
import { useAllMethods } from "../../../method/graphql/queries";
import { useCreateAnalysis } from "../../graphql/mutations";

type InputData = {
  name: string;
  methodId: number;
  details?: string;
};

const Create: FC = () => {
  const history = useHistory();
  const i18n = useTranslation("analyses");

  const { createAnalysis, createAnalysisLoading, createAnalysisError } =
    useCreateAnalysis();

  const { allMethodsData, allMethodsError, allMethodsLoading } = useAllMethods({
    filters: { status: MethodStatus.COMPLETED },
  });

  const { register, handleSubmit, control } = useForm<InputData>();

  const onSubmit = useCallback(
    async ({ name, methodId, details }: InputData) => {
      const { data, errors } = await createAnalysis({
        name,
        methodId,
        details,
      });
      if (!errors && data) {
        history.push(`/analysis/${data.createAnalysis.id}`);
      }
    },
    [history, createAnalysis]
  );

  const selectItems = useMemo(
    () =>
      allMethodsData?.map(({ id, name }) => ({
        id,
        name,
      })),
    [allMethodsData]
  );

  if (allMethodsLoading) {
    return (
      <Grid container justifyContent={"center"} gap={3} marginTop={3}>
        <CircularProgress />;
      </Grid>
    );
  }

  if (allMethodsError) {
    return <ErrorHolder error={allMethodsError} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} mt={3}>
        <Typography variant="h3">
          {i18n.t("createPage.header") as string}
        </Typography>

        <FormControl fullWidth>
          <Controller
            control={control}
            name={"methodId"}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={i18n.t("createPage.form.selectMethod") as string}
                value={value}
                onChange={onChange}
                required
                select
              >
                {selectItems?.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}#{id}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            required
            label={i18n.t("createPage.form.name") as string}
            {...register("name", { required: true })}
          />
        </FormControl>

        <FormControl fullWidth>
          <Controller
            control={control}
            name={"details"}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={i18n.t("createPage.form.details") as string}
                multiline
                onChange={onChange}
                value={value}
                minRows={2}
                maxRows={10}
                placeholder={
                  i18n.t("createPage.form.detailsPlaceholder") as string
                }
              />
            )}
          ></Controller>
        </FormControl>

        <ErrorHolder error={createAnalysisError} />

        <LoadingButton
          variant="contained"
          type="submit"
          loading={createAnalysisLoading}
          disabled={!selectItems?.length}
        >
          {i18n.t("createPage.form.submit") as string}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Create;
