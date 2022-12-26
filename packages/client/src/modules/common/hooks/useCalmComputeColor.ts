import { Maybe } from "monads";
import { useCallback } from "react";
import { useCalmCallback } from "./useCalmCallback";

export const useCalmComputeColor = (
  image: HTMLImageElement | null,
  poi: { rx: number; ry: number; radius: number },
  time = 300
) => {
  const getColor = useCallback(() => {
    const img = new Maybe(image);

    return img.run((image) => {
      const canvas = document.createElement("canvas");

      canvas.width = image.width;
      canvas.height = image.height;

      const context = new Maybe(canvas.getContext("2d"));
      context.run((ctx) => ctx.drawImage(image, 0, 0));

      const imageData = context.run((ctx) =>
        ctx.getImageData(0, 0, image.width, image.height)
      );

      return imageData.run(({ data, width, height }) => {
        const rs = [];
        const gs = [];
        const bs = [];
        const as = [];

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const l = Math.sqrt(
              (poi.rx * width - x) ** 2 + (poi.ry * height - y) ** 2
            );

            if (l >= poi.radius) {
              continue;
            }

            const r = data[(y * width + x) * 4];
            const g = data[(y * width + x) * 4 + 1];
            const b = data[(y * width + x) * 4 + 2];
            const a = data[(y * width + x) * 4 + 3];

            rs.push(r);
            gs.push(g);
            bs.push(b);
            as.push(a);
          }
        }

        const r = rs.reduce((t, c) => t + c, 0);
        const g = gs.reduce((t, c) => t + c, 0);
        const b = bs.reduce((t, c) => t + c, 0);
        const a = as.reduce((t, c) => t + c, 0);

        return [
          Math.round(r / rs.length),
          Math.round(g / gs.length),
          Math.round(b / gs.length),
          Math.round((a / as.length / 255) * 10000) / 10000,
        ] as [number, number, number, number];
      }).value;
    }).value;
  }, [image, poi]);

  return useCalmCallback(getColor, time);
};
