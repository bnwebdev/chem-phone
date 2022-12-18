import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";

import { MethodType } from "@app/method";
import { useTranslation } from "@app/i18n";

import { useCreateMethod } from "../../graphql/mutations";
import { useHistory } from "react-router";

const METHOD_TYPES = Object.values(MethodType).filter(
  (value) => typeof value === "number"
) as MethodType[];

type InputData = Parameters<
  ReturnType<typeof useCreateMethod>["createMethod"]
>[0];

const CreateMethod: FC = () => {
  const i18n = useTranslation("methods");

  const {
    createMethod,
    createMethodData,
    createMethodLoading,
    createMethodError,
  } = useCreateMethod();

  const { control, handleSubmit } = useForm<InputData>({
    defaultValues: {
      type: MethodType.CALIBRATION_CURVE,
    },
  });

  const history = useHistory();

  useEffect(() => {
    if (createMethodData) {
      history.push(`/method/${createMethodData.id}`);
    }
  }, [createMethodData, history]);

  return (
    <Box marginTop={3}>
      <form onSubmit={handleSubmit(createMethod)}>
        <Grid container flexDirection={"column"} rowSpacing={2}>
          <Grid item>
            <FormControl fullWidth>
              <FormLabel>
                {i18n.t("createPage.form.type.label") as string}
              </FormLabel>
              <Controller
                control={control}
                name={"type"}
                render={({ field: { onChange, value } }) => (
                  <Select onChange={onChange} value={value} required>
                    {METHOD_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {i18n.t(`type.${type}`) as string}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <FormLabel>
                {i18n.t("createPage.form.name.label") as string}
              </FormLabel>
              <Controller
                control={control}
                name={"name"}
                render={({ field: { onChange, value } }) => (
                  <Input
                    required
                    onChange={onChange}
                    value={value}
                    placeholder={
                      i18n.t("createPage.form.name.placeholder") as string
                    }
                  />
                )}
              ></Controller>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <FormLabel>
                {i18n.t("createPage.form.description.label") as string}
              </FormLabel>
              <Controller
                control={control}
                name={"description"}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextareaAutosize
                      onChange={onChange}
                      value={value}
                      placeholder={
                        i18n.t(
                          "createPage.form.description.placeholder"
                        ) as string
                      }
                      minRows={2}
                      maxRows={10}
                    ></TextareaAutosize>
                  </>
                )}
              ></Controller>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              type="submit"
              disabled={createMethodLoading}
            >
              {i18n.t("createPage.form.submit") as string}
            </Button>
          </Grid>
        </Grid>
      </form>
      {createMethodError && (
        <Alert severity="error">{createMethodError.message}</Alert>
      )}
    </Box>
  );
};

export default CreateMethod;
