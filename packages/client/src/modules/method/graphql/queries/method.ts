import { gql, useQuery } from "@apollo/client";
import { Method } from "../types";

const QUERY = gql`
  query Method($input: MethodDto!) {
    method(input: $input) {
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

type Payload = {
  method: Method;
};

type Variables = {
  input: {
    id: number;
  };
};

export const useMethod = (id: number) => {
  const { data, error, loading } = useQuery<Payload, Variables>(QUERY, {
    variables: { input: { id } },
  });

  return {
    methodData: data?.method,
    methodError: error,
    methodLoading: loading,
  };
};
