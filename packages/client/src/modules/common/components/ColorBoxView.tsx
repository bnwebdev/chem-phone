import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

type Props = {
  color: [number, number, number, number];
  size?: number;
};

const ColorBoxView: FC<Props> = ({ color, size = 20 }) => (
  <Tooltip title={`rgba(${color.join(",")})`}>
    <Box
      width={size}
      height={size}
      border="1px solid black"
      borderRadius={"20%"}
      bgcolor={`rgba(${color.join(", ")})`}
    />
  </Tooltip>
);

export default ColorBoxView;
