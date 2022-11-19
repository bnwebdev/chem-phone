import { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { useLogout } from "../graphql/queries";

const Logout: FC = () => {
    const { logout } = useLogout()

    const history = useHistory()

    useEffect(() => {
        (async () => {
            await logout()

            history.push('/signin')
            history.go(0)
        })();
    }, [logout, history])

    return null
}

export default Logout
