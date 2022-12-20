import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ErrorHolder from "../../../common/components/ErrorHolder";
import { ColorInput } from "../../../method/edit/components/PointPicker/inputs";
import {
  useComputeAnalysisData,
  useUpdateAnalysisData,
} from "../../graphql/mutations";
import { AnalysisData } from "../../graphql/types";
import { AnalysisContext } from "../context/AnalysisProvider";

type MaybeNumber = number | undefined;
type Color = [MaybeNumber, MaybeNumber, MaybeNumber, MaybeNumber];

type InputData = {
  color: Color;
  raw?: string;
};

const pickAnalysisData = (
  data: AnalysisData & Record<string, unknown>
): AnalysisData => ({
  raw: data.raw,
  color: data.color,
  result: data.result,
  resultUnit: data.resultUnit,
});

const getColumns = (
  getRemoveItemHandler: (id: number) => () => void
): GridColDef[] => [
  {
    field: "color",
    align: "center",
    headerName: "Color",
    headerAlign: "center",
    renderCell: ({ value }) => <>rgba({value.join(",")})</>,
    flex: 3,
  },
  {
    field: "actions",
    align: "center",
    headerName: "Actions",
    headerAlign: "center",
    renderCell: ({ row }) => (
      <>
        <Button color="error" onClick={getRemoveItemHandler(row.id)}>
          Delete
        </Button>
      </>
    ),
    flex: 1,
  },
];

const DraftAnalysis = () => {
  const { analysis, refetch } = useContext(AnalysisContext);

  const [pickColorOpen, setPickColorOpen] = useState(false);

  const { id, data } = analysis;
  const analysisData = useMemo(
    () => data.map((item) => ({ ...item, id: Math.random() })),
    [data]
  );

  const { handleSubmit, control, setValue, reset } = useForm<InputData>();

  const {
    updateAnalysisData,
    updateAnalysisDataError,
    updateAnalysisDataLoading,
  } = useUpdateAnalysisData();

  const {
    computeAnalysisData,
    computeAnalysisDataLoading,
    computeAnalysisDataError,
  } = useComputeAnalysisData(id);

  const computeAnalysisDataHandler = useCallback(async () => {
    const { data, errors } = await computeAnalysisData();
    if (!errors && data) {
      refetch();
    }
  }, [computeAnalysisData, refetch]);

  const onSubmit = useCallback(
    async (value: InputData) => {
      setPickColorOpen(false);
      await updateAnalysisData({
        id,
        data: [
          ...data.map(pickAnalysisData),
          { color: value.color as any, raw: value.raw },
        ],
      });

      refetch();
    },
    [data, id, updateAnalysisData, refetch]
  );

  useEffect(() => {
    if (!pickColorOpen) {
      reset();
    }
  }, [reset, pickColorOpen]);

  const columns = getColumns((itemId: number) => async () => {
    await updateAnalysisData({
      id,
      data: [
        ...analysisData.filter(({ id }) => itemId !== id).map(pickAnalysisData),
      ],
    });
    refetch();
  });

  return (
    <>
      <Grid item>
        <ErrorHolder error={computeAnalysisDataError} />
        <Button
          fullWidth
          variant="contained"
          color="success"
          disabled={!data.length || computeAnalysisDataLoading}
          onClick={computeAnalysisDataHandler}
        >
          {computeAnalysisDataLoading ? "Computing..." : "Start computing"}
        </Button>
      </Grid>

      <Grid item>
        <DataGrid
          rows={analysisData}
          columns={columns}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Grid>

      <Grid item>
        <ErrorHolder error={updateAnalysisDataError} />
        <Button
          variant="contained"
          fullWidth
          onClick={() => setPickColorOpen(true)}
          disabled={updateAnalysisDataLoading || computeAnalysisDataLoading}
        >
          Pick color
        </Button>
        <Dialog
          open={pickColorOpen}
          onClose={() => setPickColorOpen(false)}
          fullWidth
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Pick color</DialogTitle>
            <DialogContent>
              <Controller
                name="color"
                control={control}
                rules={{
                  required: {
                    message: "All fields of color is required",
                    value: true,
                  },
                  validate: (color) => {
                    if (
                      color instanceof Array &&
                      color.length === 4 &&
                      color.every((v) => typeof v === "number")
                    ) {
                      return true;
                    }

                    return `All fields of color is required!`;
                  },
                }}
                render={({ field: { value }, fieldState: { error } }) => (
                  <>
                    {<ErrorHolder error={error} />}
                    <ColorInput
                      value={value}
                      onChange={(changedValue) =>
                        setValue("color", changedValue)
                      }
                    />
                  </>
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="success">
                Pick
              </Button>
              <Button color="info" onClick={() => setPickColorOpen(false)}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    </>
  );
};

export default DraftAnalysis;
