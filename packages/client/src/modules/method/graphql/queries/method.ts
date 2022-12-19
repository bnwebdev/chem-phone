import { gql, useQuery } from "@apollo/client";
import { Method } from "../types";

const QUERY = gql`
  query Method($input: MethodDto!) {
    method(input: $input) {
      id
      userId
      type
      name
      description
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

type Payload = {
  method: Method;
};

type Variables = {
  input: {
    id: number;
  };
};

export const useMethod = (id: number, skip = false) => {
  const { data, error, loading, refetch } = useQuery<Payload, Variables>(
    QUERY,
    {
      variables: { input: { id } },
      skip,
    }
  );

  return {
    methodData: data?.method,
    methodError: error,
    methodLoading: loading,
    refetchMethod: refetch,
  };
};
