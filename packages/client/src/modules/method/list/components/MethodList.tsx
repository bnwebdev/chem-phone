import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
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
import { LoadingButton } from "@mui/lab";
import { i18n } from "i18next";

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
      <LoadingButton
        onClick={() => setOpen(true)}
        loading={archieveMethodLoading}
      >
        Delete
      </LoadingButton>
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

const getColumns = (i18n: i18n, refetchAll: () => void): GridColDef[] => [
  {
    field: "id",
    headerName: i18n.t("common:id"),
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => <Link to={`/method/${value}`}>#{value}</Link>,
    flex: 1,
  },
  {
    field: "name",
    headerName: i18n.t("common:name"),
    align: "center",
    headerAlign: "center",
    flex: 2,
  },
  {
    field: "createdAt",
    headerName: i18n.t("common:createdAt"),
    flex: 4,
    type: "dateTime",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "updatedAt",
    headerName: i18n.t("common:updatedAt"),
    flex: 4,
    type: "dateTime",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: i18n.t("common:status"),
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => i18n.t(`status.${value}`) as string,
    flex: 2,
  },
  {
    field: "",
    headerName: i18n.t("common:actions"),
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
        columns={getColumns(i18n, allMethodRefetch)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        loading={allMethodsLoading}
      />
    </Box>
  );
};

export default MethodList;
