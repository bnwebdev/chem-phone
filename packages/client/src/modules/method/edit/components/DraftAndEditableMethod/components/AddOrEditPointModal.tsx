import { FC, useState } from "react";
import { Inputs, PointPickerModal } from "../../PointPicker";

type Point = {
  x: any;
  y: any;
};

type Props = {
  submitHandler: (
    point: Partial<Point> | undefined,
    hideModal: () => void
  ) => void;
  Button: FC<{ onClick: () => void }>;
  point: Partial<Point> | undefined;
  onChange: (point: Partial<Point> | undefined) => void;
};

const AddOrEditPointModal: FC<Props> = ({
  submitHandler,
  Button,
  point,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const hideModal = () => setOpen(false);

  return (
    <PointPickerModal
      title="Add new point"
      okLabel="Add point"
      open={open}
      cancelHandler={hideModal}
      submitHandler={(e) => {
        e.preventDefault();
        submitHandler(point, hideModal);
      }}
      button={<Button onClick={() => setOpen(true)} />}
      pointPickerProps={{
        X: Inputs.NumberInput,
        Y: Inputs.ColorInput,
        xLabel: "Concentration",
        yLabel: "Color",
        onChange,
        value: point,
      }}
    />
  );
};

export default AddOrEditPointModal;
