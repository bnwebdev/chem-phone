import { Monad, Transformer } from "monads";
import { useMemo } from "react";

export const useRun = <T, U, R>(monad: Monad<T>, run: Transformer<T, U>) =>
  useMemo<R>(() => monad.run<U>(run), [monad, run]);
