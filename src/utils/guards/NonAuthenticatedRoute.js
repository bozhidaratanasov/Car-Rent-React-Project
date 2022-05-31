import {getLoggedUser} from "../http-utils/user-requests";
import {Navigate} from "react-router-dom";

export function NonAuthenticatedRoute({children}) {
    const loggedUser = getLoggedUser();

    if (loggedUser)
        return <Navigate to="/cars"/>

    return children;
}