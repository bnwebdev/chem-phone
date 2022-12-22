import { useTranslation } from "@app/i18n";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { i18n } from "i18next";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useCreateAnalysis } from "../../../analysis/graphql/mutations";
import ErrorHolder from "../../../common/components/ErrorHolder";
import { MethodContext } from "../context";

const getColumns = (i18n: i18n): GridColDef[] => [
  {
    field: "concentration",
    renderCell: ({ value }) => `${value}`,
    headerName: i18n.t<string>("common:concentration"),
    type: "number",
    align: "center",
    headerAlign: "center",
    flex: 100,
  },
  {
    field: "color",
    renderCell: ({ value }) => `rgba(${value.join(", ")})`,
    headerName: i18n.t<string>("common:color"),
    align: "center",
    headerAlign: "center",
    flex: 100,
  },
];

const CompletedMethod: FC<{ readable?: boolean }> = ({ readable }) => {
  const { method } = useContext(MethodContext);

  const i18n = useTranslation("methods");

  const points = useMemo(
    () =>
      method.data.curve
        .map((p) => ({ ...p, id: Math.random() }))
        .sort((lhs, rhs) => lhs.concentration - rhs.concentration),
    [method]
  );

  const history = useHistory();

  const [createAnalysisOpen, setCreateAnalysisOpen] = useState(false);

  const { createAnalysis, createAnalysisError, createAnalysisLoading } =
    useCreateAnalysis();

  const { register, handleSubmit, reset } = useForm<{
    name: string;
    methodId: number;
  }>({
    defaultValues: { methodId: method.id },
  });

  useEffect(() => {
    if (!createAnalysisOpen) {
      reset();
    }
  }, [createAnalysisOpen, reset]);

  return (
    <>
      {!readable && (
        <LoadingButton
          variant="contained"
          loading={createAnalysisLoading}
          onClick={() => setCreateAnalysisOpen(true)}
        >
          {i18n.t<string>("editPage.createAnalysisBtn")}
        </LoadingButton>
      )}
      <ErrorHolder error={createAnalysisError} />
      <Dialog
        fullWidth
        open={createAnalysisOpen}
        onClose={() => setCreateAnalysisOpen(false)}
      >
        <form
          onSubmit={handleSubmit(async ({ name, methodId }) => {
            setCreateAnalysisOpen(false);
            const { data, errors } = await createAnalysis({ name, methodId });
            if (data && !errors) {
              history.push(`/analysis/${data.createAnalysis.id}`);
            }
          })}
        >
          <DialogTitle>
            {i18n.t<string>("editPage.createAnalysisForm.title", {
              name: method.name,
              id: method.id,
            })}
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>
                {i18n.t<string>("editPage.createAnalysisForm.name.label")}
              </InputLabel>
              <Input {...register("name", { required: true })} />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button color="success" type="submit">
              {i18n.t<string>("editPage.createAnalysisForm.okLabel")}
            </Button>
            <Button color="info" onClick={() => setCreateAnalysisOpen(false)}>
              {i18n.t<string>("common:cancel")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <DataGrid
        autoHeight
        rows={points}
        columns={getColumns(i18n)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        hideFooter
      />
    </>
  );
};

export default CompletedMethod;
