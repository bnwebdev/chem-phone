import { gql, useQuery } from "@apollo/client";
import { MethodStatus } from "@app/method";
import { useMemo } from "react";
import { Method } from "../types";

const QUERY = gql`
  query AllMethods($input: AllMethodsDto!) {
    allMethods(input: $input) {
      id
      userId
      type
      createdAt
      updatedAt
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

type Payload = {
  allMethods: Method[];
};

type Variables = {
  input: {
    filters?: {
      status?: MethodStatus;
    };
  };
};

export const useAllMethods = (input: Variables["input"]) => {
  const { data, error, loading, refetch } = useQuery<Payload, Variables>(
    QUERY,
    {
      variables: { input },
    }
  );

  const allMethodsData = useMemo(() => {
    if (!data) {
      return;
    }

    return data.allMethods.map((method) => ({
      ...method,
      createdAt: new Date(method.createdAt),
      updatedAt: new Date(method.updatedAt),
    }));
  }, [data]);

  return {
    allMethodsData,
    allMethodsError: error,
    allMethodsLoading: loading,
    allMethodRefetch: refetch,
  };
};
