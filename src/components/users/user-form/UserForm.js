import {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {deleteUser, getLoggedUser, getUser, postUser, putUser} from "../../../utils/http-utils/user-requests";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export function UserForm(props) {
    const location = useLocation();
    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        role: 'user'
    });

    const [error, setError] = useState('');


    useEffect(() => {
        if (location.pathname === '/profile') {
            getUser(getLoggedUser().id).then(res => {
                setUser(res.data)
            })
        }
    }, [])

    const onInputChange = (event) => {
        setUser(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (location.pathname === '/register')
            postUser(user).then(() => {
                navigate('/login')
            }).catch(error => {
                setError(error.message)
            })
        else if (location.pathname === '/profile')
            putUser(user).then()
    }

    const onUserDelete = (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Delete Profile',
            text: 'Are you sure you want to delete your profile?',
            icon: 'error',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'Cancel'
        }).then(({isConfirmed}) => {
            if (isConfirmed)
                deleteUser().then(
                    navigate('/login')
                );
        })
    }


    return (
        <div className="user-form-wrapper">
            <h1>{location.pathname === '/register' ? 'Register' : 'Edit Profile'}</h1>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" required value={user.name} name="name"
                                  onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter Phone" required value={user.phone} name="phone"
                                  onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email Address" required value={user.email} name="email"
                                  onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" required value={user.password} name="password"
                                  onChange={onInputChange}/>
                </Form.Group>
                {error && <p className="text-danger">{error}</p>}
                {location.pathname === '/register' && <Link className="nav-link" to="/login">Already have an account?</Link>}
                <div className="btn-wrapper">
                    <Button type="submit">{location.pathname === '/register' ? 'Register' : 'Edit'}</Button>
                    {location.pathname === '/profile' && <Button variant="danger" onClick={onUserDelete}>Delete</Button>}
                </div>
            </Form>
        </div>
    );
}