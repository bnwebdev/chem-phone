import {useMutation, gql} from '@apollo/client'

const MUTATION = gql`
    mutation Login($input: LoginDto!) {
        login(input: $input)
    }
`

type Payload = {
    login: boolean
}

type Variables = {
    username: string
    password: string
}

export const useLogin = () => {
    const [login, {data, error, loading}] = useMutation<Payload, Variables>(MUTATION)

    return {
        login,
        loginData: data?.login,
        loginError: error,
        loginLoading: loading
    }
}