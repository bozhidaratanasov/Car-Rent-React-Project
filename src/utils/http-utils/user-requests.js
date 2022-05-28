import axios from "axios";

const apiUrl = 'http://localhost:3005/users';

export async function postUser(user) {
    const existingUsers = (await axios.get(`${apiUrl}?email=${user.email}`)).data;

    if (existingUsers)
        throw new Error('User with this email already exists.');

    return await axios.post(apiUrl, user);
}

export async function login(user) {
    const allUsers = (await axios.get(`${apiUrl}`)).data;

    const foundUser = await allUsers.find(u => u.email === user.email && u.password === user.password);

    if (!foundUser)
        throw new Error('Invalid username or password.');

    await localStorage.setItem('loggedUser', JSON.stringify(foundUser));

    return foundUser;
}

export function logout() {
    localStorage.removeItem('loggedUser');
}

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}