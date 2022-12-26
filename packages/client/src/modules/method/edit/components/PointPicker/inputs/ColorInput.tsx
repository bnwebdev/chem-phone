import { Grid, FormLabel } from "@mui/material";
import { ColorPicker, createColor } from "mui-color";
import { FC } from "react";
import { InputableProps } from "../types";

type MaybeNumber = number | undefined;

const getDef = (value: number | undefined, def: number) =>
  typeof value === "number" ? value : def;

const ColorInput: FC<
  InputableProps<[MaybeNumber, MaybeNumber, MaybeNumber, MaybeNumber]>
> = ({ value, onChange, label }) => {
  const color = createColor(
    value
      ? {
          r: getDef(value[0], 255),
          g: getDef(value[1], 255),
          b: getDef(value[2], 255),
          a: getDef(value[3], 1),
        }
      : { r: 255, g: 255, b: 255, a: 1 }
  );

  return (
    <Grid container direction={"column"} gap={3}>
      <Grid item>
        <FormLabel>{label}</FormLabel>
      </Grid>
      <Grid item marginBottom={3}>
        <ColorPicker
          hideTextfield
          onChange={(color: any) => {
            if (typeof color === "string" || color.format === "unknown") {
              return;
            }

            onChange([color.rgb[0], color.rgb[1], color.rgb[2], color.alpha]);
          }}
          value={color}
        />
      </Grid>
    </Grid>
  );
};

export default ColorInput;
