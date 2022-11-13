import {useMutation, gql} from '@apollo/client'

const MUTATION = gql`
    mutation Logout {
        logout
    }
`

type Payload = {
    logout: boolean
}


export const useLogout = () => {
    const [logout, {data, error, loading}] = useMutation<Payload>(MUTATION)

    return {
        logout,
        logoutData: data?.logout,
        logoutError: error,
        logoutLoading: loading
    }
}