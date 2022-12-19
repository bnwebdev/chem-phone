import { MethodType } from "@app/method";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useMemo } from "react";
import { MethodContext } from "../../../method/edit/context";
import { Method } from "../../../method/graphql/types";
import { AnalysisContext } from "../context/AnalysisProvider";

const round = (value: number, presition: number) =>
  Math.round(value * Math.pow(10, presition)) / Math.pow(10, presition);

const getColumns = (method: Method): GridColDef[] => [
  {
    field: "color",
    align: "center",
    headerName: "Color",
    headerAlign: "center",
    renderCell: ({ value }) => <>rgba({value.join(",")})</>,
    flex: 1,
  },
  {
    field: "result",
    align: "center",
    headerName: "Result",
    headerAlign: "center",
    renderCell: ({ value }) => {
      const data: Record<string, number> = JSON.parse(value);

      if (method.type === MethodType.CALIBRATION_CURVE_ABSOLUTE) {
        const maxConcentration = Math.max(
          ...method.data.curve.map(({ concentration }) => concentration)
        );
        return (
          <Typography variant="body2" color="teal">
            {round(data.concentration * maxConcentration, 4)}
          </Typography>
        );
      }

      return (
        <Grid
          container
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
        >
          {Object.entries(data)
            .map(([key, value]) => ({
              key,
              value: round(value * 100, 2) + "%",
            }))
            .sort((lhs, rhs) => Number(lhs.key) - Number(rhs.key))
            .map(({ key, value }) => (
              <Grid item key={key}>
                <Grid container alignItems="center" direction="column">
                  <Typography variant="body2">{key}</Typography>
                  <Typography variant="body2" color="teal">
                    ({value})
                  </Typography>
                </Grid>
              </Grid>
            ))}
        </Grid>
      );
    },
    flex: 3,
  },
];

const CompletedAnalysis = () => {
  const { analysis } = useContext(AnalysisContext);
  const { method } = useContext(MethodContext);

  const rows = useMemo(
    () =>
      analysis.data.map(({ result, color, raw, resultUnit }) => ({
        result,
        color,
        resultUnit,
        raw,
        id: Math.random(),
      })),
    [analysis]
  );

  const columns = getColumns(method);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight
      pageSize={10}
      rowsPerPageOptions={[10]}
    />
  );
};

export default CompletedAnalysis;
