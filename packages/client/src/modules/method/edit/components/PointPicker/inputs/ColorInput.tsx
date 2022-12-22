import { FormControl, InputLabel, Input, Grid, FormLabel } from "@mui/material";
import { FC } from "react";
import { InputableProps } from "../types";
import { getNumber } from "./utils";

type MaybeNumber = number | undefined;

const ColorInput: FC<
  InputableProps<[MaybeNumber, MaybeNumber, MaybeNumber, MaybeNumber]>
> = ({ value, onChange, label }) => {
  return (
    <Grid container direction={"column"} gap={3}>
      <Grid item>
        <FormLabel>{label}</FormLabel>
      </Grid>
      <Grid item marginBottom={3}>
        <FormControl size={"medium"} fullWidth>
          <InputLabel>(R)GBA</InputLabel>
          <Input
            type="number"
            inputProps={{
              min: 0,
              max: 255,
            }}
            value={value?.[0]}
            onChange={(e) =>
              onChange([
                getNumber(e.target.value),
                value?.[1],
                value?.[2],
                value?.[3],
              ])
            }
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel>R(G)BA</InputLabel>
          <Input
            fullWidth
            type="number"
            inputProps={{
              min: 0,
              max: 255,
            }}
            value={value?.[1]}
            onChange={(e) =>
              onChange([
                value?.[0],
                getNumber(e.target.value),
                value?.[2],
                value?.[3],
              ])
            }
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel>RG(B)A</InputLabel>
          <Input
            fullWidth
            type="number"
            inputProps={{
              min: 0,
              max: 255,
            }}
            value={value?.[2]}
            onChange={(e) =>
              onChange([
                value?.[0],
                value?.[1],
                getNumber(e.target.value),
                value?.[3],
              ])
            }
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel>RGB(A)</InputLabel>
          <Input
            fullWidth
            type="number"
            inputProps={{
              min: 0,
              max: 1,
              step: 0.01,
            }}
            value={value?.[3]}
            onChange={(e) =>
              onChange([
                value?.[0],
                value?.[1],
                value?.[2],
                getNumber(e.target.value),
              ])
            }
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ColorInput;
