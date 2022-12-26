import { Maybe } from "monads";
import { useMemo } from "react";

export const useMaybe = <T>(value: T) =>
  useMemo(() => new Maybe(value), [value]);
