import { gql, useQuery } from "@apollo/client";
import { AnalysisStatus } from "@app/method";
import { useMemo } from "react";
import { Analysis } from "../types";

const QUERY = gql`
  query AllAnalyses($input: AllAnalysesDto!) {
    allAnalyses(input: $input) {
      id
      name
      userId
      methodId
      status
      createdAt
      updatedAt
      details
      data {
        raw
        result
        resultUnit
        color
      }
    }
  }
`;

type Payload = {
  allAnalyses: Analysis[];
};

type Variables = {
  input: {
    filters?: {
      status?: AnalysisStatus;
    };
  };
};

export const useAllAnalyses = (input: Variables["input"]) => {
  const { data, error, loading, refetch } = useQuery<Payload, Variables>(
    QUERY,
    {
      variables: { input },
    }
  );

  const allAnalysesData = useMemo(() => {
    if (!data) {
      return;
    }

    return data.allAnalyses.map((analysis) => ({
      ...analysis,
      createdAt: new Date(analysis.createdAt),
      updatedAt: new Date(analysis.updatedAt),
    }));
  }, [data]);

  return {
    allAnalysesData,
    allAnalysesError: error,
    allAnalysesLoading: loading,
    allAnalysesRefetch: refetch,
  };
};
