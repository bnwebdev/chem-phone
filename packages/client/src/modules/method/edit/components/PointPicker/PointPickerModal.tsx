import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, FormEvent, ReactElement } from "react";
import PointPicker, { Props as PointPickerProps } from "./PointPicker";

type Props = {
  open: boolean;
  title: string;
  okLabel: string;
  pointPickerProps: PointPickerProps;
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
  return (
    <>
      {button}
      <Dialog open={open} onClose={cancelHandler} maxWidth="lg" fullWidth>
        <form onSubmit={submitHandler}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <PointPicker {...pointPickerProps} />
          </DialogContent>
          <DialogActions>
            <Button type="submit">{okLabel}</Button>
            <Button onClick={cancelHandler}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default PointPickerModal;
