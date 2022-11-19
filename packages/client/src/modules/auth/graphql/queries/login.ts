import {gql, useLazyQuery} from '@apollo/client'
import { useCallback } from 'react'

const QUERY = gql`
    query Login($input: LoginDto!) {
        login(input: $input)
    }
`

type Payload = {
    login: boolean
}

type Variables = {
    input: {
        username: string
        password: string
    }
}

export const useLogin = () => {
    const [loginQuery, {data, error, loading}] = useLazyQuery<Payload, Variables>(QUERY)

    const login = useCallback((input: Variables['input']) => loginQuery({ variables: { input } }), [loginQuery])

    return {
        login,
        loginData: data?.login,
        loginError: error,
        loginLoading: loading
    }
}