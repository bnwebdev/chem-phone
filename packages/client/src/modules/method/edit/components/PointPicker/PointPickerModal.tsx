import { useTranslation } from "@app/i18n";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { FC, FormEvent, ReactElement, useMemo, useState } from "react";
import PointPicker, { Props as PointPickerProps } from "./PointPicker";

type Props = {
  open: boolean;
  title: string;
  okLabel: string;
  pointPickerProps:
    | PointPickerProps
    | Array<{ props: PointPickerProps; name: string }>;
  cancelHandler: () => void;
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
  button: ReactElement;
};

const PointPickerModal: FC<Props> = ({
  open,
  title,
  okLabel,
  cancelHandler,
  submitHandler,
  pointPickerProps,
  button,
}) => {
  const i18n = useTranslation("common");

  const [selectedInputName, setSelectedInputName] = useState<string>(
    "0" in pointPickerProps ? pointPickerProps[0].name : ""
  );
  const selectedInput = useMemo(() => {
    if (pointPickerProps instanceof Array) {
      return pointPickerProps.find(({ name }) => name === selectedInputName);
    }

    return null;
  }, [selectedInputName, pointPickerProps]);

  const options = useMemo(() => {
    if (pointPickerProps instanceof Array) {
      return pointPickerProps.map(({ name }) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ));
    }

    return null;
  }, [pointPickerProps]);

  return (
    <>
      {button}
      <Dialog open={open} onClose={cancelHandler} maxWidth="lg" fullWidth>
        <form onSubmit={submitHandler}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {options && (
              <TextField
                margin={"dense"}
                fullWidth
                value={selectedInputName}
                onChange={(e) => {
                  setSelectedInputName(e.target.value);
                }}
                label={i18n.t<string>("colorInputForm.inputMode")}
                select
              >
                {options}
              </TextField>
            )}
            {selectedInput && <PointPicker {...selectedInput.props} />}
            {!(pointPickerProps instanceof Array) && (
              <PointPicker {...pointPickerProps} />
            )}
          </DialogContent>
          <DialogActions>
            <Button type="submit">{okLabel}</Button>
            <Button onClick={cancelHandler}>
              {i18n.t("cancel") as string}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default PointPickerModal;
