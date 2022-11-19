import {gql, useLazyQuery} from '@apollo/client'

const QUERY = gql`
    query Logout {
        logout
    }
`

type Payload = {
    logout: boolean
}


export const useLogout = () => {
    const [logout, {data, error, loading}] = useLazyQuery<Payload>(QUERY)

    return {
        logout,
        logoutData: data?.logout,
        logoutError: error,
        logoutLoading: loading
    }
}