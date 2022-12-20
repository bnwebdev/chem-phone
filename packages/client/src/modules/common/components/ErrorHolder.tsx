import { Alert, AlertProps } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

type Props = AlertProps & {
  error: Partial<Pick<Error, "message">> | string | null | undefined;
};

const ErrorHolder: FC<Props> = ({ error, ...props }) => {
  if (!error || (typeof error === "object" && !error.message)) {
    return null;
  }

  return (
    <Box my={1}>
      <Alert severity="error" {...props}>
        {typeof error === "string" ? error : error.message}
      </Alert>
    </Box>
  );
};

export default ErrorHolder;
