import {useMutation, gql} from '@apollo/client'
import { useCallback } from 'react'

const MUTATION = gql`
    mutation Register($input: RegisterDto!) {
        register(input: $input)
    }
`

type Payload = {
    register: boolean
}

type Variables = {
    input: {
        username: string
        password: string
        confirm: string
    }
}

export const useRegister = () => {
    const [registerQuery, {data, error, loading}] = useMutation<Payload, Variables>(MUTATION)

    const register = useCallback((input: Variables['input']) => registerQuery({ variables: { input }}), [registerQuery])

    return {
        register,
        registerData: data?.register,
        registerError: error,
        registerLoading: loading
    }
}