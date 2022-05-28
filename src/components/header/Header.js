import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {getLoggedUser} from "../../utils/http-utils/user-requests";
import {logout} from "../../utils/http-utils/user-requests";
import './Header.scss'

export function Header() {

    const navigate = useNavigate()

    const loggedUser = getLoggedUser()


    const onLogout = () => {
        logout()

    }

    return (
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Container className="nav-wrapper">
                    <div>
                        <Navbar.Brand><Link className="navbar-brand" to="/cars">Car Rental</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    </div>
                    <div>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {loggedUser && <Link className="nav-link" to="">Hello, {loggedUser.name}</Link>}
                                {loggedUser && <Link className="nav-link" to="/login" onClick={onLogout}>Logout</Link>}

                                {!loggedUser && <Link className="nav-link" to="/login">Login</Link>}
                                {!loggedUser && <Link className="nav-link" to="/register">Register</Link>}
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}