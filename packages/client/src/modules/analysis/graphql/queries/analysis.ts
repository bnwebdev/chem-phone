import { gql, useQuery } from "@apollo/client";
import { Analysis } from "../types";

const QUERY = gql`
  query Analysis($input: AnalysisDto!) {
    analysis(input: $input) {
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
        color
        result
        resultUnit
      }
    }
  }
`;

type Payload = {
  analysis: Analysis;
};

type Variables = {
  input: {
    id: number;
  };
};

export const useAnalysis = (id: number) => {
  const { data, error, loading, refetch } = useQuery<Payload, Variables>(
    QUERY,
    {
      variables: { input: { id } },
    }
  );

  return {
    analysisData: data?.analysis,
    analysisError: error,
    analysisLoading: loading,
    refetchAnalysis: refetch,
  };
};
