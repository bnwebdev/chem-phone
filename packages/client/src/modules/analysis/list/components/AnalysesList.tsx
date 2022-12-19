import { useTranslation } from "@app/i18n";
import { AnalysisStatus } from "@app/method";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAllAnalyses } from "../../graphql/queries";

const getStatus = (status: string): AnalysisStatus => {
  switch (status) {
    case "draft":
      return AnalysisStatus.DRAFT;
    case "completed":
      return AnalysisStatus.COMPLETED;
    case "archieved":
      return AnalysisStatus.ARCHIEVED;
    default:
      throw new Error(`Unknown anlalysis status`);
  }
};

const Actions: FC<any> = () => null;

const columns = (
  i18n: ReturnType<typeof useTranslation>,
  refetchAll: () => void
): GridColDef[] => [
  {
    field: "id",
    headerName: "Id",
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => <Link to={`/analysis/${value}`}>#{value}</Link>,
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    align: "center",
    headerAlign: "center",
    flex: 2,
  },
  {
    field: "methodId",
    headerName: "Method Id",
    align: "center",
    headerAlign: "center",
    flex: 2,
    renderCell: ({ value }) => <Link to={`/method/${value}`}>#{value}</Link>,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 4,
    type: "dateTime",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 4,
    type: "dateTime",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Status",
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => i18n.t(`status.${value}`) as string,
    flex: 2,
  },
  {
    field: "",
    headerName: "Actions",
    align: "center",
    headerAlign: "center",
    flex: 3,
    renderCell: ({ row }) => <Actions id={row.id} refetch={refetchAll} />,
  },
];

const AnalysesList: FC = () => {
  const status = getStatus(useParams<{ status: string }>().status);

  const i18n = useTranslation("analyses");

  const { allAnalysesData, allAnalysesLoading, allAnalysesRefetch } =
    useAllAnalyses({
      filters: {
        status,
      },
    });

  return (
    <Box mt={3}>
      <DataGrid
        autoHeight
        rows={allAnalysesData || []}
        columns={columns(i18n, allAnalysesRefetch)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        loading={allAnalysesLoading}
      />
    </Box>
  );
};

export default AnalysesList;
