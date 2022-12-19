import { MethodStatus } from "@app/method";
import { Typography, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useCompleteMethod, useEditMethod } from "../../../graphql/mutations";
import { MethodContext } from "../../context";
import AddOrEditPointModal from "./components/AddOrEditPointModal";

type GetColumnsProps = {
  changePointHandler: (id: number) => void;
  deletePointHandler: (id: number) => void;
  actionsDisabled?: boolean;
};

const getColumns = (props: GetColumnsProps): GridColDef[] => [
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
  {
    field: "actions",
    renderCell: ({ row }) => (
      <>
        <Button
          color="warning"
          onClick={() => props.changePointHandler(row.id)}
          disabled={props.actionsDisabled}
        >
          Edit
        </Button>
        <Button
          color="error"
          onClick={() => props.deletePointHandler(row.id)}
          disabled={props.actionsDisabled}
        >
          Delete
        </Button>
      </>
    ),
    headerName: "Actions",
    align: "center",
    headerAlign: "center",
    flex: 100,
  },
];

const DraftAndEditableMethod: FC = () => {
  const { method, refetch } = useContext(MethodContext);

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
          Description: {method.description}
        </Typography>
      )}
      <DataGrid
        autoHeight
        rows={points}
        columns={getColumns({
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
        Button={({ onClick }) => (
          <Button
            onClick={() => {
              setCreatedPoint(undefined);
              onClick();
            }}
            disabled={completeMethodLoading}
          >
            Add point
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
      {method.status === MethodStatus.EDITABLE && (
        <Button
          variant="outlined"
          color="success"
          onClick={completeMethodHandler}
          disabled={completeMethodLoading}
        >
          {completeMethodLoading
            ? "Completing..."
            : "Complete (you will not be able to undo this action)"}
        </Button>
      )}
    </>
  );
};

export default DraftAndEditableMethod;
