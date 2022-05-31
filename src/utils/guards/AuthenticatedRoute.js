import {Navigate} from "react-router-dom";
import {getLoggedUser} from "../http-utils/user-requests";

export function AuthenticatedRoute({children}) {
    const loggedUser = getLoggedUser();

    if (!loggedUser)
        return <Navigate to="/login"/>;

    return children;

}