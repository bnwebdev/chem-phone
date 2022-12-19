import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

import { Analysis } from "../types";

type Variables = {
  input: {
    id: number;
  };
};

type Payload = {
  computeAnalysisData: Pick<Analysis, "id">;
};

const MUTATION = gql`
  mutation ComputeAnalysisData($input: ComputeAnalysisDataDto!) {
    computeAnalysisData(input: $input) {
      id
    }
  }
`;

export const useComputeAnalysisData = (id: number) => {
  const [mutation, { data, error, loading }] = useMutation<Payload, Variables>(
    MUTATION,
    {
      fetchPolicy: "network-only",
    }
  );

  const computeAnalysisData = useCallback(
    () => mutation({ variables: { input: { id } } }),
    [mutation, id]
  );

  return {
    computeAnalysisData,
    computeAnalysisDataData: data?.computeAnalysisData,
    computeAnalysisDataError: error,
    computeAnalysisDataLoading: loading,
  };
};
