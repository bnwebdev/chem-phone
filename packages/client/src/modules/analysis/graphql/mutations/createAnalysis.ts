import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

import { Analysis } from "../types";

type Variables = {
  input: {
    name: string;
    methodId: number;
  };
};

type Payload = {
  createAnalysis: Analysis;
};

const MUTATION = gql`
  mutation CreateAnalysis($input: CreateAnalysisDto!) {
    createAnalysis(input: $input) {
      id
      name
      userId
      methodId
      status
      createdAt
      updatedAt
    }
  }
`;

export const useCreateAnalysis = () => {
  const [mutation, { data, error, loading }] = useMutation<Payload, Variables>(
    MUTATION,
    {
      fetchPolicy: "network-only",
    }
  );

  const createAnalysis = useCallback(
    (input: Variables["input"]) => mutation({ variables: { input } }),
    [mutation]
  );

  return {
    createAnalysis,
    createAnalysisData: data?.createAnalysis,
    createAnalysisError: error,
    createAnalysisLoading: loading,
  };
};
