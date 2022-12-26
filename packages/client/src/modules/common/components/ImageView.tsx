import { Box } from "@mui/material";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMaybe } from "../hooks";

type Props = {
  src: string;
  width?: number | string;
  height?: number | string;
  setWrapperElement?: Dispatch<SetStateAction<HTMLElement | undefined>>;
};

const ImageView: FC<Props> = ({
  src,
  width = "auto",
  height = "auto",
  setWrapperElement,
}) => {
  const ref = useRef<HTMLDivElement>();

  const [imageWidth, setImageWidth] = useState<string | number>(width);

  const setWrapper = useMaybe(setWrapperElement);

  useEffect(() => {
    if (ref.current) {
      const w = ref.current.clientWidth;

      setImageWidth(w);
    }
  }, [setWrapper]);

  return (
    <Box
      width={width}
      height={height}
      bgcolor={"yellow"}
      overflow="hidden"
      ref={ref}
    >
      <img
        src={src}
        alt={"Preview"}
        style={{
          maxWidth: imageWidth,
        }}
        onLoad={() => setWrapper.run((set) => set(ref.current))}
      />
    </Box>
  );
};

export default ImageView;
