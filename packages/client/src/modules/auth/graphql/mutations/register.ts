import {useMutation, gql} from '@apollo/client'

const MUTATION = gql`
    mutation Register($input: RegisterDto!) {
        register(input: $input)
    }
`

type Payload = {
    register: boolean
}

type Variables = {
    username: string
    password: string
    confirm: string
}

export const useRegister = () => {
    const [register, {data, error, loading}] = useMutation<Payload, Variables>(MUTATION)

    return {
        register,
        registerData: data?.register,
        registerError: error,
        registerLoading: loading
    }
}