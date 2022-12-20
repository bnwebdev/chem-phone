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
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useCreateAnalysis } from "../../../analysis/graphql/mutations";
import { MethodContext } from "../context";

const columns: GridColDef[] = [
  {
    field: "concentration",
    renderCell: ({ value }) => `${value}`,
    headerName: "Concentration",
    type: "number",
    align: "center",
    headerAlign: "center",
    flex: 100,
  },
  {
    field: "color",
    renderCell: ({ value }) => `rgba(${value.join(", ")})`,
    headerName: "Color",
    align: "center",
    headerAlign: "center",
    flex: 100,
  },
];

const CompletedMethod: FC<{ readable?: boolean }> = ({ readable }) => {
  const { method } = useContext(MethodContext);

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
          Create analysis
        </LoadingButton>
      )}
      {createAnalysisError && (
        <Typography color={"error"} variant="body1">
          {createAnalysisError.message}
        </Typography>
      )}
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
            Create analysis for method {method.name}#{method.id}
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>Name</InputLabel>
              <Input {...register("name", { required: true })} />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button color="success" type="submit">
              Create
            </Button>
            <Button color="info" onClick={() => setCreateAnalysisOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <DataGrid
        autoHeight
        rows={points}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        hideFooter
      />
    </>
  );
};

export default CompletedMethod;
