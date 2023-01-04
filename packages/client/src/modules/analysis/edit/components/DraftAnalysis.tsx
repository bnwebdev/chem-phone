import { useTranslation } from "@app/i18n";
import { LoadingButton } from "@mui/lab";
import { Button, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { i18n } from "i18next";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ColorBoxView from "../../../common/components/ColorBoxView";
import ErrorHolder from "../../../common/components/ErrorHolder";
import {
  useComputeAnalysisData,
  useUpdateAnalysisData,
} from "../../graphql/mutations";
import { AnalysisData } from "../../graphql/types";
import { AnalysisContext } from "../context/AnalysisProvider";
import AddColorModal from "./AddColorModal";

type Color = [number, number, number, number];

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
    headerName: i18n.t("common:color"),
    headerAlign: "center",
    renderCell: ({ value }) => <ColorBoxView color={value} />,
    flex: 3,
  },
  {
    field: "actions",
    align: "center",
    headerName: i18n.t("common:actions"),
    headerAlign: "center",
    renderCell: ({ row }) => (
      <>
        <Button color="error" onClick={getRemoveItemHandler(row.id)}>
          {i18n.t("common:delete") as string}
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

  const { handleSubmit, setValue, reset, watch } = useForm<InputData>({
    defaultValues: {
      color: [255, 255, 255, 1],
    },
  });
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
          { color: value.color, raw: value.raw },
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
        <AddColorModal
          okLabel={i18n.t<string>("editPage.pickBtn")}
          onChange={(colorValue) => {
            setValue("color", colorValue || [255, 255, 255, 1]);
          }}
          submitHandler={(_, hideModal) => {
            handleSubmit(onSubmit)();
            hideModal();
          }}
          color={watch("color")}
          title={i18n.t<string>("editPage.pickColorTitle")}
          Button={({ onClick }) => (
            <Button
              variant="contained"
              fullWidth
              onClick={onClick}
              disabled={updateAnalysisDataLoading || computeAnalysisDataLoading}
            >
              {i18n.t("editPage.pickColorBtn") as string}
            </Button>
          )}
        />
      </Grid>
    </>
  );
};

export default DraftAnalysis;
