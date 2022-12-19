import { createContext, FC, PropsWithChildren, useMemo } from "react";
import { Analysis } from "../../graphql/types";

export type AnalysisContextType = {
  analysis: Analysis;
  refetch: () => void;
};

export const AnalysisContext = createContext<AnalysisContextType>(
  {} as AnalysisContextType
);

type AnalysisProviderProps = PropsWithChildren<{
  analysis: Analysis;
  refetch: () => void;
}>;

const AnalysisProvider: FC<AnalysisProviderProps> = ({
  analysis,
  children,
  refetch,
}) => (
  <AnalysisContext.Provider
    value={useMemo(
      () => ({
        analysis,
        refetch,
      }),
      [analysis, refetch]
    )}
  >
    {children}
  </AnalysisContext.Provider>
);

export default AnalysisProvider;
