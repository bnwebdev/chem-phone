import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

import { Analysis, AnalysisData } from "../types";

type Variables = {
  input: {
    id: number;
    data: AnalysisData[];
  };
};

type Payload = {
  updateAnalysisData: Analysis;
};

const MUTATION = gql`
  mutation UpdateAnalysisData($input: UpdateAnalysisDataDto!) {
    updateAnalysisData(input: $input) {
      id
    }
  }
`;

export const useUpdateAnalysisData = () => {
  const [mutation, { data, error, loading }] = useMutation<Payload, Variables>(
    MUTATION,
    {
      fetchPolicy: "network-only",
    }
  );

  const updateAnalysisData = useCallback(
    (input: Variables["input"]) => mutation({ variables: { input } }),
    [mutation]
  );

  return {
    updateAnalysisData,
    updateAnalysisDataData: data?.updateAnalysisData,
    updateAnalysisDataError: error,
    updateAnalysisDataLoading: loading,
  };
};
