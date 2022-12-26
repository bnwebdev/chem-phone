import { useTranslation } from "@app/i18n";
import { MethodStatus } from "@app/method";
import { LoadingButton } from "@mui/lab";
import { Typography, Button, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { i18n } from "i18next";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import ColorBoxView from "../../../../common/components/ColorBoxView";
import { useCompleteMethod, useEditMethod } from "../../../graphql/mutations";
import { MethodContext } from "../../context";
import AddOrEditPointModal from "./components/AddOrEditPointModal";

type GetColumnsProps = {
  changePointHandler: (id: number) => void;
  deletePointHandler: (id: number) => void;
  actionsDisabled?: boolean;
  i18n: i18n;
};

const getColumns = ({
  i18n,
  deletePointHandler,
  changePointHandler,
  actionsDisabled,
}: GetColumnsProps): GridColDef[] => [
  {
    field: "concentration",
    renderCell: ({ value }) => `${value}`,
    headerName: i18n.t("common:concentration"),
    type: "number",
    align: "center",
    headerAlign: "center",
    flex: 100,
  },
  {
    field: "color",
    renderCell: ({ value }) => <ColorBoxView color={value} />,
    headerName: i18n.t("common:color"),
    align: "center",
    headerAlign: "center",
    flex: 100,
  },
  {
    field: "actions",
    renderCell: ({ row }) => (
      <>
        <Button
          color="warning"
          onClick={() => changePointHandler(row.id)}
          disabled={actionsDisabled}
        >
          {i18n.t("common:edit") as string}
        </Button>
        <Button
          color="error"
          onClick={() => deletePointHandler(row.id)}
          disabled={actionsDisabled}
        >
          {i18n.t("common:delete") as string}
        </Button>
      </>
    ),
    headerName: i18n.t("common:actions"),
    align: "center",
    headerAlign: "center",
    flex: 100,
  },
];

const DraftAndEditableMethod: FC = () => {
  const { method, refetch } = useContext(MethodContext);

  const i18n = useTranslation("methods");

  const { editMethod } = useEditMethod();
  const { completeMethod, completeMethodLoading } = useCompleteMethod(
    method.id
  );

  const completeMethodHandler = async () => {
    await completeMethod();
    await refetch();
  };

  const points = useMemo(
    () => method?.data?.curve.map((p) => ({ ...p, id: Math.random() })) || [],
    [method]
  );

  const { colorUnit, concentrationUnit } = useMemo(
    () => method.data || {},
    [method.data]
  );

  const [createdPoint, setCreatedPoint] = useState<any>();
  const [editedPoint, setEditedPoint] = useState<any>();
  const showEditRef = useRef<() => void>();

  const [pointToChangeId, setPointToChangeId] = useState(0);

  const editedPointCandidate = useMemo(
    () => points.find((p) => p.id === pointToChangeId) || undefined,
    [pointToChangeId, points]
  );

  useEffect(() => {
    setEditedPoint({
      x: editedPointCandidate?.concentration,
      y: editedPointCandidate?.color,
    });
  }, [editedPointCandidate]);

  return (
    <>
      {method.description && (
        <Typography variant="body1">
          {i18n.t("common:description") as string}: {method.description}
        </Typography>
      )}
      {method.status === MethodStatus.EDITABLE && (
        <LoadingButton
          variant="contained"
          color="success"
          onClick={completeMethodHandler}
          loading={completeMethodLoading}
          loadingIndicator={i18n.t("editPage.completing") as string}
        >
          {i18n.t("editPage.completeBtn") as string}
        </LoadingButton>
      )}
      <DataGrid
        autoHeight
        rows={points}
        columns={getColumns({
          i18n,
          actionsDisabled: completeMethodLoading,
          changePointHandler: (id) => {
            if (pointToChangeId === id) {
              setEditedPoint({
                x: editedPointCandidate?.concentration,
                y: editedPointCandidate?.color,
              });
            }
            setPointToChangeId(id);
            showEditRef.current && showEditRef.current();
          },
          deletePointHandler: async (id) => {
            await editMethod({
              id: method.id,
              data: {
                colorUnit,
                concentrationUnit,
                curve: points
                  .filter((p) => p.id !== id)
                  .map(({ color, concentration }) => ({
                    color,
                    concentration,
                  })),
              },
            });
            await refetch();
          },
        })}
        pageSize={10}
        rowsPerPageOptions={[10]}
        hideFooter
      />

      <AddOrEditPointModal
        okLabel={i18n.t("editPage.editPointForm.okLabel") as string}
        title={i18n.t("editPage.editPointForm.title") as string}
        Button={({ onClick }) => {
          showEditRef.current = onClick;

          return null;
        }}
        submitHandler={async (point, hideModal) => {
          if (
            point &&
            typeof point.x === "number" &&
            point.y instanceof Array &&
            point.y.every((v) => typeof v === "number")
          ) {
            await editMethod({
              id: method.id,
              data: {
                colorUnit,
                concentrationUnit,
                curve: points.map(({ id, concentration, color }) => {
                  if (id !== pointToChangeId) {
                    return { color, concentration };
                  }

                  return {
                    concentration: point.x,
                    color: point.y,
                  };
                }),
              },
            });
            await refetch();
            hideModal();
            setPointToChangeId(-1);
          }
        }}
        point={editedPoint}
        onChange={setEditedPoint}
      />
      <AddOrEditPointModal
        okLabel={i18n.t("editPage.addPointForm.okLabel") as string}
        title={i18n.t("editPage.addPointForm.title") as string}
        Button={({ onClick }) => (
          <Button
            variant="contained"
            onClick={() => {
              setCreatedPoint(undefined);
              onClick();
            }}
            disabled={completeMethodLoading}
          >
            {i18n.t("editPage.addPointForm.openFormBtn") as string}
          </Button>
        )}
        submitHandler={async (point, hideModal) => {
          if (
            point &&
            typeof point.x === "number" &&
            point.y instanceof Array &&
            point.y.every((v) => typeof v === "number")
          ) {
            await editMethod({
              id: method.id,
              data: {
                colorUnit,
                concentrationUnit,
                curve: [
                  ...points.map(({ color, concentration }) => ({
                    color,
                    concentration,
                  })),
                  {
                    color: point.y as [number, number, number, number],
                    concentration: point.x,
                  },
                ],
              },
            });

            await refetch();

            hideModal();
            setCreatedPoint(undefined);
          }
        }}
        point={createdPoint}
        onChange={setCreatedPoint}
      />
    </>
  );
};

export default DraftAndEditableMethod;
