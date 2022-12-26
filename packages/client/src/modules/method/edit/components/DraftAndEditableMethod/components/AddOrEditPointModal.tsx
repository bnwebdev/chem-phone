import { useTranslation } from "@app/i18n";
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
  title: string;
  okLabel: string;
};

const AddOrEditPointModal: FC<Props> = ({
  submitHandler,
  Button,
  point,
  onChange,
  title,
  okLabel,
}) => {
  const i18n = useTranslation("methods");

  const [open, setOpen] = useState(false);

  const hideModal = () => setOpen(false);

  return (
    <PointPickerModal
      title={title}
      okLabel={okLabel}
      open={open}
      cancelHandler={hideModal}
      submitHandler={(e) => {
        e.preventDefault();
        submitHandler(point, hideModal);
      }}
      button={<Button onClick={() => setOpen(true)} />}
      pointPickerProps={[
        {
          name: i18n.t("common:colorInputForm.mods.colorPalete"),
          props: {
            X: Inputs.NumberInput,
            Y: Inputs.ColorInput,
            xLabel: i18n.t("common:concentration"),
            yLabel: i18n.t("common:color"),
            onChange,
            value: point,
          },
        },
        {
          name: i18n.t("common:colorInputForm.mods.colorFromImage"),
          props: {
            X: Inputs.NumberInput,
            Y: Inputs.ImageColorInput,
            xLabel: i18n.t("common:concentration"),
            yLabel: i18n.t("common:color"),
            onChange,
            value: point,
          },
        },
      ]}
    />
  );
};

export default AddOrEditPointModal;
