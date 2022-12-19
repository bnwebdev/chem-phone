import { MethodStatus } from "@app/method";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAllMethods } from "../../../method/graphql/queries";
import { useCreateAnalysis } from "../../graphql/mutations";

type InputData = {
  name: string;
  methodId: number;
  details?: string;
};

const Create: FC = () => {
  const history = useHistory();

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
    return (
      <Typography variant="h2" color={"red"}>
        {allMethodsError.message}
      </Typography>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction={"column"} gap={3}>
        <h1>Create Analysis</h1>
        <FormControl fullWidth>
          <InputLabel>Select method</InputLabel>
          <Controller
            control={control}
            name={"methodId"}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Select value={value} onChange={onChange} required>
                {selectItems?.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}#{id}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Analysis name</InputLabel>
          <Input {...register("name", { required: true })} />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Analysis details</FormLabel>
          <Controller
            control={control}
            name={"details"}
            render={({ field: { onChange, value } }) => (
              <TextareaAutosize
                onChange={onChange}
                value={value}
                minRows={2}
                maxRows={10}
              ></TextareaAutosize>
            )}
          ></Controller>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          disabled={!selectItems?.length || createAnalysisLoading}
        >
          {createAnalysisLoading && (
            <CircularProgress color="inherit" size={20} />
          )}
          Create analysis
        </Button>
        {createAnalysisError && (
          <Typography color="error" variant="body1">
            {createAnalysisError.message}
          </Typography>
        )}
      </Grid>
    </form>
  );
};

export default Create;
