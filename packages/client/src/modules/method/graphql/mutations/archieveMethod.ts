import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

import { Method } from "../types";

type Variables = {
  input: {
    id: number;
  };
};

type Payload = {
  archieveMethod: Method;
};

const MUTATION = gql`
  mutation ArchieveMethod($input: ArchieveMethodDto!) {
    archieveMethod(input: $input) {
      id
    }
  }
`;

export const useArchieveMethod = (input: Variables["input"]) => {
  const [mutation, { data, error, loading, called }] = useMutation<
    Payload,
    Variables
  >(MUTATION, {
    fetchPolicy: "network-only",
  });

  const archieveMethod = useCallback(
    () => mutation({ variables: { input } }),
    [mutation, input]
  );

  return {
    archieveMethod,
    archieveMethodData: data?.archieveMethod,
    archieveMethodError: error,
    archieveMethodLoading: loading,
    archieveMethodCalled: called,
  };
};
