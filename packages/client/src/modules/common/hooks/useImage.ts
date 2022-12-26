import { useEffect, useState } from "react";

export const useImage = (file: File | undefined) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | string | null>(null);

  useEffect(() => {
    if (file) {
      const img = new Image();

      setLoading(true);

      img.onload = () => {
        setImage(img);
        setLoading(false);
      };

      img.onerror = (e) => {
        if (typeof e === "string") {
          setError(e);
        } else {
          setError("Something went wrong");
        }

        setLoading(false);
      };

      img.src = URL.createObjectURL(file);
    }
  }, [file]);

  return {
    image,
    loading,
    error,
  };
};
