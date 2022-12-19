import { useTranslation } from "@app/i18n";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CompletedMethod from "../../../method/edit/components/CompletedMethod";
import { ColorInput } from "../../../method/edit/components/PointPicker/inputs";
import { MethodProvider } from "../../../method/edit/context";
import { useMethod } from "../../../method/graphql/queries";
import { useUpdateAnalysisData } from "../../graphql/mutations";
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
  const i18n = useTranslation("analyses");

  const [pickColorOpen, setPickColorOpen] = useState(false);

  const { id, name, status, details, data } = analysis;
  const analysisData = useMemo(
    () => data.map((item) => ({ ...item, id: Math.random() })),
    [data]
  );
  const { methodData, methodLoading } = useMethod(analysis.methodId);

  const { handleSubmit, control, setValue, reset } = useForm<InputData>();

  const {
    updateAnalysisData,
    updateAnalysisDataError,
    updateAnalysisDataLoading,
  } = useUpdateAnalysisData();

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
    <Grid container direction="column" gap={3} marginTop={3}>
      <Grid item container alignItems={"center"} justifyContent="space-around">
        <Grid item>
          <Typography variant="h2">
            Analysis {name}#{id}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2" color="turquoise" fontWeight={400}>
            {i18n.t(`status.${status}`) as string}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Accordion>
          <AccordionSummary>
            Method {methodData?.name}
            {methodData ? "#" : ""}
            {methodData?.id}
          </AccordionSummary>
          <AccordionDetails>
            {methodLoading && <LinearProgress />}
            {methodData && !methodLoading && (
              <MethodProvider method={methodData} refetch={async () => {}}>
                <CompletedMethod readable />
              </MethodProvider>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>Analysis details</AccordionSummary>
          <AccordionDetails>
            {(details || "-").split(`\n`).map((row, idx) => (
              <Typography variant="body1" key={idx}>
                {row}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color="success"
          disabled={!data.length}
        >
          Start computing
        </Button>
      </Grid>
      <Grid item>
        <DataGrid rows={analysisData} columns={columns} autoHeight />
      </Grid>
      <Grid item>
        {updateAnalysisDataError && (
          <Typography variant="body1" color="error">
            {updateAnalysisDataError.message}
          </Typography>
        )}
        <Button
          variant="contained"
          fullWidth
          onClick={() => setPickColorOpen(true)}
          disabled={updateAnalysisDataLoading}
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
                    {error?.message && (
                      <Typography variant="body1" color="error">
                        {error.message}
                      </Typography>
                    )}
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
    </Grid>
  );
};

export default DraftAnalysis;
