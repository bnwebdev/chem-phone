import { useTranslation } from "@app/i18n";
import { FC, useState } from "react";
import {
  Inputs,
  PointPickerModal,
} from "../../../method/edit/components/PointPicker";

type Props = {
  submitHandler: (
    color: [number, number, number, number] | undefined,
    hideModal: () => void
  ) => void;
  Button: FC<{ onClick: () => void }>;
  color: [number, number, number, number] | undefined;
  onChange: (color: [number, number, number, number] | undefined) => void;
  title: string;
  okLabel: string;
};

const AddColorModal: FC<Props> = ({
  submitHandler,
  Button,
  color,
  onChange,
  title,
  okLabel,
}) => {
  const i18n = useTranslation("analysis");

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
        submitHandler(color, hideModal);
      }}
      button={<Button onClick={() => setOpen(true)} />}
      pointPickerProps={[
        {
          name: i18n.t("common:colorInputForm.mods.colorPalete"),
          props: {
            X: () => null,
            Y: Inputs.ColorInput,
            xLabel: "",
            yLabel: i18n.t("common:color"),
            onChange: ({ y }) => onChange(y),
            value: { x: 0, y: color },
          },
        },
        {
          name: i18n.t("common:colorInputForm.mods.colorFromImage"),
          props: {
            X: () => null,
            Y: Inputs.ImageColorInput,
            xLabel: "",
            yLabel: i18n.t("common:color"),
            onChange: ({ y }) => onChange(y),
            value: { x: 0, y: color },
          },
        },
      ]}
    />
  );
};

export default AddColorModal;
