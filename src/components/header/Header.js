import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export function Header() {
    return (
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><Link className="navbar-brand" to="/cars">Car Rental</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" to="">Login</Link>
                            <Link className="nav-link" to="">Register</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}