import { Grid, FormLabel } from "@mui/material";
import { FC } from "react";
import ImageColorPicker from "../../../../../common/components/ImageColorPicker";
import { InputableProps } from "../types";

type MaybeNumber = number | undefined;

const ImageColorInput: FC<
  InputableProps<[MaybeNumber, MaybeNumber, MaybeNumber, MaybeNumber]>
> = ({ onChange, label }) => {
  return (
    <Grid container direction={"column"} gap={3}>
      <Grid item>
        <FormLabel>{label}</FormLabel>
      </Grid>
      <Grid item marginBottom={3}>
        <ImageColorPicker changeHandler={onChange} />
      </Grid>
    </Grid>
  );
};

export default ImageColorInput;
