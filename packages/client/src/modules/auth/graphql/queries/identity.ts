import { useQuery, gql } from "@apollo/client";
import { Identity } from "../types";

const QUERY = gql`
  query Identity {
    identity {
      username
    }
  }
`;

type Payload = {
  identity: Identity;
};

export const _useIdentity = () => {
  const { data, error, loading, refetch } = useQuery<Payload>(QUERY, {
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });

  return {
    identityData: data?.identity,
    identityError: error,
    identityLoading: loading,
    refetchLoading: refetch,
  };
};
