import { useQuery, gql } from '@apollo/client'

const QUERY = gql`
    query Identity {
        identity {
            username
        }
    }
`

type Payload = {
    identity: {
        username: string
    }
}

export const useIdentity = () => {
    const {data, error, loading, refetch} = useQuery<Payload>(QUERY, { fetchPolicy: 'network-only' })

    return {
        identityData: data?.identity,
        identityError: error,
        identityLoading: loading,
        refetchLoading: refetch,
    }
}