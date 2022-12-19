import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { MethodStatus } from "@app/method";
import { useTranslation } from "@app/i18n";

import { useAllMethods } from "../../graphql/queries";
import { useArchieveMethod } from "../../graphql/mutations";

const Actions: FC<{ id: number; refetch: () => void }> = ({ id, refetch }) => {
  const [open, setOpen] = useState(false);
  const { archieveMethod, archieveMethodLoading, archieveMethodCalled } =
    useArchieveMethod(useMemo(() => ({ id }), [id]));

  useEffect(() => {
    if (!archieveMethodLoading && archieveMethodCalled) {
      refetch();
    }
  }, [refetch, archieveMethodLoading, archieveMethodCalled]);

  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={archieveMethodLoading}>
        {archieveMethodLoading && <CircularProgress size={30} />}
        Delete
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Remove method #{id}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              archieveMethod();
              setOpen(false);
            }}
          >
            Delete
          </Button>
          <Button color="warning" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const columns = (
  i18n: ReturnType<typeof useTranslation>,
  refetchAll: () => void
): GridColDef[] => [
  {
    field: "id",
    headerName: "Id",
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => <Link to={`/method/${value}`}>#{value}</Link>,
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

const getMethodStatus = (status: string): MethodStatus => {
  switch (status) {
    case "draft":
      return MethodStatus.DRAFT;
    case "editable":
      return MethodStatus.EDITABLE;
    case "archieved":
      return MethodStatus.ARCHIEVED;
    case "completed":
      return MethodStatus.COMPLETED;
    default:
      throw new Error(`Unknown method status`);
  }
};

const MethodList: FC = () => {
  const { status } = useParams<{ status: string }>();

  const { allMethodsData, allMethodsLoading, allMethodRefetch } = useAllMethods(
    {
      filters: { status: getMethodStatus(status) },
    }
  );

  const i18n = useTranslation("methods");

  return (
    <Box mt={3}>
      <DataGrid
        autoHeight
        rows={allMethodsData || []}
        columns={columns(i18n, allMethodRefetch)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        loading={allMethodsLoading}
      />
    </Box>
  );
};

export default MethodList;
