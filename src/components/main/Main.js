import { Outlet} from "react-router-dom";

export function Main() {
    return (
        <div className="main-content">
            <Outlet/>
        </div>
    );
}