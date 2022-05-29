import axios from "axios";

const apiUrl = 'http://localhost:3005/users';

export async function getUser(id) {
    return await axios.get(`${apiUrl}/${id}`)
}

export async function postUser(user) {
    const existingUsers = (await axios.get(`${apiUrl}?email=${user.email}`)).data;

    if (existingUsers)
        throw new Error('User with this email already exists.');

    return await axios.post(apiUrl, user);
}

export async function putUser(user) {
    localStorage.setItem('loggedUser', JSON.stringify(user));

    return await axios.put(`${apiUrl}/${user.id}`, user);
}


export async function login(user) {
    const allUsers = (await axios.get(`${apiUrl}`)).data;

    const foundUser = await allUsers.find(u => u.email === user.email && u.password === user.password);

    if (!foundUser)
        throw new Error('Invalid username or password.');

    localStorage.setItem('loggedUser', JSON.stringify(foundUser));

    return foundUser;
}

export async function deleteUser() {
    const userId = getLoggedUser().id;

    localStorage.removeItem('loggedUser')

    return await axios.delete(`${apiUrl}/${userId}`);
}

export function logout() {
    localStorage.removeItem('loggedUser');
}

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}