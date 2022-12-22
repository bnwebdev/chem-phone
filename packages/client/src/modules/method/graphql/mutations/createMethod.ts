import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

import { MethodType } from "@app/method";
import { Method } from "../types";

type Variables = {
  input: {
    type: MethodType;
    name: string;
    description?: string;
  };
};

type Payload = {
  createMethod: Method;
};

const MUTATION = gql`
  mutation CreateMethod($input: CreateMethodDto!) {
    createMethod(input: $input) {
      id
      userId
      type
      data {
        curve {
          concentration
          color
        }
        concentrationUnit
        colorUnit
      }
      status
    }
  }
`;

export const useCreateMethod = () => {
  const [mutation, { data, error, loading }] = useMutation<Payload, Variables>(
    MUTATION,
    {
      fetchPolicy: "network-only",
    }
  );

  const createMethod = useCallback(
    (input: Variables["input"]) => mutation({ variables: { input } }),
    [mutation]
  );

  return {
    createMethod,
    createMethodData: data?.createMethod,
    createMethodError: error,
    createMethodLoading: loading,
  };
};
