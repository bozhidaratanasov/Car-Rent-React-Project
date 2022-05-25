import axios from "axios";

const apiUrl = 'http://localhost:3005/cars';

export function getCars() {
    return axios.get(apiUrl)
}