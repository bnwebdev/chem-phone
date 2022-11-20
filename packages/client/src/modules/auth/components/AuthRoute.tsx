import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router";

import { useIdentity } from "../graphql/queries";

type Props = RouteProps & {
    auth?: boolean
}

const AuthRoute: FC<Props> = ({auth, ...props}) => {
    const {identityData, identityLoading} = useIdentity()

    if (identityLoading) {
        return null
    }

    if (auth !== undefined && auth !== Boolean(identityData)) {
        return <Redirect to="/404" />
    }

    return <Route {...props} />
}

export default AuthRoute;