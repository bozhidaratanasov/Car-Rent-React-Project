import {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {postUser} from "../../../utils/http-utils/user-requests";

export function UserForm() {
    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
    });

    const onInputChange = (event) => {
        setUser(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        postUser(user).then()
    }



    return (
        <div className="user-form-wrapper">
            <h1>Register</h1>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={user.name} name="name" onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter Phone" value={user.phone} name="phone" onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email Address" value={user.email} name="email" onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={user.password} name="password" onChange={onInputChange}/>
                </Form.Group>
                <Button type="submit">Register</Button>
            </Form>
        </div>
    );
}