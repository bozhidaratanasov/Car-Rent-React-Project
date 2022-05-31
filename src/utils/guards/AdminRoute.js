import {Navigate} from "react-router-dom";
import {getLoggedUser} from "../http-utils/user-requests";

export function AdminRoute({children}) {
    const loggedUser = getLoggedUser();

    if (loggedUser.role !== 'admin')
        return <Navigate to="/cars"/>;

    return children;

}