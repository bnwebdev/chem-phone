import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

import { MethodData, MethodStatus, MethodType } from "@app/method";

type Variables = {
  input: {
    type: MethodType;
  };
};

type Payload = {
  createMethod: {
    id: number;
    userId: number;
    type: MethodType;
    data: MethodData;
    status: MethodStatus;
  };
};

const MUTATION = gql`
  mutation CreateMethod($input: CreateMethodDto!) {
    createMethod(input: $input) {
      id
      userId
      type
      data {
        curve {
          concentration {
            unit
            value
          }
          color {
            unit
            value
          }
        }
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
