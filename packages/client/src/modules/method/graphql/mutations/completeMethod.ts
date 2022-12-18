import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

type Variables = {
  input: {
    id: number;
  };
};

type Payload = {
  completeMethod: boolean;
};

const MUTATION = gql`
  mutation CompleteMethod($input: CompleteMethodDto!) {
    completeMethod(input: $input)
  }
`;

export const useCompleteMethod = (id: number) => {
  const [mutation, { data, error, loading, called }] = useMutation<
    Payload,
    Variables
  >(MUTATION, {
    fetchPolicy: "network-only",
  });

  const completeMethod = useCallback(
    () => mutation({ variables: { input: { id } } }),
    [mutation, id]
  );

  return {
    completeMethod,
    completeMethodData: data?.completeMethod,
    completeMethodError: error,
    completeMethodLoading: loading,
    completeMethodCalled: called,
  };
};
