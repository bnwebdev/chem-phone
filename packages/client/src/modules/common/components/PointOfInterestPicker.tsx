import { Grid, Slider } from "@mui/material";
import { Box } from "@mui/system";
import {
  FC,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";

type Props = {
  children: ReactElement<{
    setWrapperElement: Dispatch<SetStateAction<HTMLElement | undefined>>;
  }>;
  circleColor?: string;
  centerColor?: string;
  onChange: (circle: { rx: number; ry: number; radius: number }) => void;
};

const PointOfInterestPicker: FC<Props> = ({
  children,
  circleColor = "rgba(100, 100, 100, .4)",
  centerColor = "rgb(70, 70, 70)",
  onChange,
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [pointX, setPointX] = useState(0);
  const [pointY, setPointY] = useState(0);
  const [radius, setRadius] = useState(0);

  const circle = useMemo(
    () => ({ rx: pointX / width, ry: pointY / height, radius }),
    [pointX, pointY, radius, width, height]
  );

  useEffect(() => {
    onChange(circle);
  }, [onChange, circle]);

  useEffect(() => {
    setRadius(0);
  }, [wrapperElement]);

  useEffect(() => {
    if (wrapperElement) {
      const rect = wrapperElement.getClientRects().item(0);

      if (rect) {
        const { width, height } = rect;

        if (pointX - radius < 0) {
          setPointX(radius);
        }
        if (pointY - radius < 0) {
          setPointY(radius);
        }

        if (pointX + radius > width) {
          setPointX(width - radius);
        }
        if (pointY + radius > height) {
          setPointY(height - radius);
        }
      }
    }
  }, [pointX, pointY, radius, wrapperElement]);

  useEffect(() => {
    if (wrapperElement) {
      const width = wrapperElement.clientWidth;
      const height = wrapperElement.clientHeight;

      setWidth(width);
      setHeight(height);
      setRadius(10);
    }
  }, [wrapperElement]);

  const bindedChildren = cloneElement(children, { setWrapperElement });

  return (
    <Grid container>
      <Grid item xs={11}>
        <Box
          position={"relative"}
          onClick={(e) => {
            if (wrapperElement) {
              const rect = wrapperElement.getClientRects().item(0);
              if (rect) {
                const x = e.clientX - rect.x;
                const y = e.clientY - rect.y;

                if (x >= 0 && y >= 0 && x < rect.width && y < rect.height) {
                  setPointX(x);
                  setPointY(y);
                }
              }
            }
          }}
        >
          {bindedChildren}
          <Box
            position={"absolute"}
            top={pointY}
            left={pointX}
            width={radius * 2}
            height={radius * 2}
            bgcolor={circleColor}
            boxShadow={[0, 0, 4]}
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
            display="flex"
            sx={{
              transform: "translate(-50%, -50%)",
              transition: "top .5s ease 0s, left .5s ease 0s",
            }}
          >
            <Box
              width={5}
              height={5}
              bgcolor={centerColor}
              borderRadius="50%"
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={1} alignItems="center" display={"flex"}>
        <Slider
          orientation="vertical"
          aria-label="Radius"
          min={5}
          max={Math.min(width, height) / 2 - 3}
          valueLabelDisplay="auto"
          value={radius}
          onChange={(_, r) => setRadius(r as number)}
        />
      </Grid>
    </Grid>
  );
};
export default PointOfInterestPicker;
