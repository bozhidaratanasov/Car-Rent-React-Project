import {Button, Form} from "react-bootstrap";
import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../../../utils/http-utils/user-requests";

export function LoginForm() {

    const navigate = useNavigate();

    // const setLoggedUser = useContext(UserDispatchContext);

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')

    const onInputChange = (event) => {
        setUser(prevState => ({
           ...prevState,
           [event.target.name]: event.target.value
        }))
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        login(user).then(() => {
            navigate('/cars')

        }).catch(error => setError(error.message))
    }



    return (
        <div className="user-form-wrapper">
            <h1>Login</h1>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email Address" value={user.email} name="email" onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={user.password} name="password" onChange={onInputChange}/>
                </Form.Group>
                {error && <p className="text-danger">{error}</p>}
                <Button type="submit">Login</Button>
            </Form>
        </div>
    );
}