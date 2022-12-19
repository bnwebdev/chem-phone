import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useContext, useMemo } from "react";
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

const CompletedMethod: FC = () => {
  const { method } = useContext(MethodContext);

  const points = useMemo(
    () => method.data.curve.map((p) => ({ ...p, id: Math.random() })),
    [method]
  );

  return (
    <>
      <Button variant="contained">Create analysis</Button>
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
