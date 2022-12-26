import { Button } from "@mui/material";
import { FC, useRef } from "react";

import { useMaybe } from "../hooks";

type Props = {
  loadHandler?: (files: FileList) => void;
  errorHandler?: () => void;
  multiple?: boolean;
  label?: string;
  accept?: string;
};

const FileUploader: FC<Props> = ({
  loadHandler,
  errorHandler,
  multiple,
  label,
  accept,
}) => {
  const onMaybeLoad = useMaybe(loadHandler);
  const onMaybeError = useMaybe(errorHandler);
  const ref = useRef<HTMLInputElement>(null);

  const onFileLoad = () => {
    if (ref.current) {
      const { current } = ref;

      onMaybeLoad.run((successCb) => current.files && successCb(current.files));

      current.value = null as unknown as string; // reset files to upload the same
    }
  };

  const onError = () => onMaybeError.run((errorCb) => errorCb());

  return (
    <Button variant="contained" component="label">
      {label || "Upload File"}
      <input
        ref={ref}
        type="file"
        accept={accept}
        hidden
        onChange={onFileLoad}
        onError={onError}
        multiple={multiple}
      />
    </Button>
  );
};
export default FileUploader;
