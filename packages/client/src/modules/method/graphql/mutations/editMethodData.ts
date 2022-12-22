import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

import { MethodData } from "@app/method";
import { Method } from "../types";

type Variables = {
  input: {
    data: MethodData;
    id: number;
  };
};

type Payload = {
  editMethod: Method;
};

const MUTATION = gql`
  mutation EditMethod($input: EditMethodDto!) {
    editMethod(input: $input) {
      id
    }
  }
`;

export const useEditMethod = () => {
  const [mutation, { data, error, loading }] = useMutation<Payload, Variables>(
    MUTATION,
    {
      fetchPolicy: "network-only",
    }
  );

  const editMethod = useCallback(
    (input: Variables["input"]) => mutation({ variables: { input } }),
    [mutation]
  );

  return {
    editMethod,
    editMethodData: data?.editMethod,
    editMethodError: error,
    editMethodLoading: loading,
  };
};
