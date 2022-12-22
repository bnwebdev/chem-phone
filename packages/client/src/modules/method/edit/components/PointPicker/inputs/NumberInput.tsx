import { FormControl, InputLabel, Input, Grid } from "@mui/material";
import { FC } from "react";
import { InputableProps } from "../types";
import { getNumber } from "./utils";

const NumberInput: FC<InputableProps<number | undefined>> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <Grid container direction={"column"}>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Input
            value={value}
            type="number"
            onChange={(e) => onChange(getNumber(e.target.value))}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default NumberInput;
