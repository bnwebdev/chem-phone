import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useMemo } from "react";
import { AnalysisContext } from "../context/AnalysisProvider";

const columns: GridColDef[] = [
  {
    field: "color",
    align: "center",
    headerName: "Color",
    headerAlign: "center",
    renderCell: ({ value }) => <>rgba({value.join(",")})</>,
    flex: 3,
  },
  {
    field: "result",
    align: "center",
    headerName: "Result",
    headerAlign: "center",
    flex: 1,
  },
];

const CompletedAnalysis = () => {
  const { analysis } = useContext(AnalysisContext);

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
