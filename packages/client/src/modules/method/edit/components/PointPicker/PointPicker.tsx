import { Grid } from "@mui/material";
import { FC, useMemo } from "react";

import { InputableProps } from "./types";

export type Props = InputableProps<{ x?: any; y?: any }> & {
  X: FC<InputableProps<any>>;
  Y: FC<InputableProps<any>>;
  xLabel?: string;
  yLabel?: string;
};

const PointPicker: FC<Props> = ({
  X,
  Y,
  value,
  onChange,
  label,
  xLabel,
  yLabel,
}) => {
  const x = useMemo(() => value?.x, [value?.x]);
  const y = useMemo(() => value?.y, [value?.y]);

  return (
    <Grid container direction={"column"} gap={3}>
      <Grid item>{label}</Grid>
      <Grid item>
        <X
          label={xLabel}
          value={x}
          onChange={(xValue) => onChange({ x: xValue, y })}
        />
      </Grid>
      <Grid item>
        <Y
          label={yLabel}
          value={y}
          onChange={(yValue) => onChange({ x, y: yValue })}
        />
      </Grid>
    </Grid>
  );
};

export default PointPicker;
