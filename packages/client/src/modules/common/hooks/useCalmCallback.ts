import { useEffect, useRef, useState } from "react";

export const useCalmCallback = <T>(
  cb: () => T | Promise<T>,
  time: number
): T | null => {
  const timestamp = useRef<ReturnType<typeof setTimeout>>();
  const [result, setResult] = useState<T | null>(null);

  useEffect(() => {
    if (timestamp.current !== undefined) {
      clearTimeout(timestamp.current);
    }

    timestamp.current = setTimeout(async () => {
      setResult(await cb());
    }, time);
  }, [cb, time]);

  return result;
};
