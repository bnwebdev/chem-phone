import { useTranslation } from "@app/i18n";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { i18n } from "i18next";
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
  i18n: i18n,
  getRemoveItemHandler: (id: number) => () => void
): GridColDef[] => [
  {
    field: "color",
    align: "center",
    headerName: i18n.t("editPage.columns.color"),
    headerAlign: "center",
    renderCell: ({ value }) => <>rgba({value.join(",")})</>,
    flex: 3,
  },
  {
    field: "actions",
    align: "center",
    headerName: i18n.t("editPage.columns.actions"),
    headerAlign: "center",
    renderCell: ({ row }) => (
      <>
        <Button color="error" onClick={getRemoveItemHandler(row.id)}>
          {i18n.t("editPage.actions.delete") as string}
        </Button>
      </>
    ),
    flex: 1,
  },
];

const DraftAnalysis = () => {
  const i18n = useTranslation("analyses");

  const { analysis, refetch } = useContext(AnalysisContext);
  const { id, data } = analysis;

  const [pickColorOpen, setPickColorOpen] = useState(false);

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

  const columns = getColumns(i18n, (itemId: number) => async () => {
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
        <LoadingButton
          fullWidth
          variant="contained"
          color="success"
          onClick={computeAnalysisDataHandler}
          loading={computeAnalysisDataLoading}
          loadingIndicator={i18n.t("editPage.computingBtn") as string}
        >
          {i18n.t("editPage.computeBtn") as string}
        </LoadingButton>
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
          {i18n.t("editPage.pickColorBtn") as string}
        </Button>
        <Dialog
          open={pickColorOpen}
          onClose={() => setPickColorOpen(false)}
          fullWidth
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>
              {i18n.t("editPage.pickColorTitle") as string}
            </DialogTitle>
            <DialogContent>
              <Controller
                name="color"
                control={control}
                rules={{
                  required: {
                    message: i18n.t("editPage.errors.colorRequired"),
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

                    return i18n.t("editPage.errors.colorRequired") as string;
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
                {i18n.t("editPage.pickBtn") as string}
              </Button>
              <Button color="info" onClick={() => setPickColorOpen(false)}>
                {i18n.t("editPage.cancelBtn") as string}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    </>
  );
};

export default DraftAnalysis;
