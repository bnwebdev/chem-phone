import { FC, useEffect, useMemo, useState } from "react";
import { Grid, Typography } from "@mui/material";

import { useCalmComputeColor, useImage } from "../hooks";
import FileUploader from "./FileUploader";
import ImageView from "./ImageView";
import PointOfInterestPicker from "./PointOfInterestPicker";
import ColorBoxView from "./ColorBoxView";
import { useTranslation } from "@app/i18n";

type Props = {
  changeHandler: (color: [number, number, number, number]) => void;
};

const ImageColorPicker: FC<Props> = ({ changeHandler }) => {
  const [file, setFile] = useState<File>();
  const [poi, setPoi] = useState({ rx: 0, ry: 0, radius: 0 });

  const i18n = useTranslation("common");

  const { image } = useImage(file);

  const color = useCalmComputeColor(image, poi, 100);

  useEffect(() => {
    color && changeHandler(color);
  }, [color, changeHandler]);

  const src = useMemo(() => file && URL.createObjectURL(file), [file]);

  return (
    <>
      <FileUploader
        errorHandler={() => console.error("error")}
        loadHandler={(files) => setFile(Array.from(files)[0])}
        accept={"image/*"}
        label={i18n.t<string>("colorInputForm.chooseImage")}
      />
      {src && (
        <Grid container>
          <Grid item xs={11}>
            <PointOfInterestPicker onChange={setPoi}>
              <ImageView src={src} key={src} />
            </PointOfInterestPicker>
          </Grid>
          <Grid item xs={1}>
            <Typography>{i18n.t<string>("color")}</Typography>
            {color && <ColorBoxView color={color} />}
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default ImageColorPicker;
