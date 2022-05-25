import axios from "axios";

const apiUrl = 'http://localhost:3005/cars';

export async function getCars() {
    return await axios.get(apiUrl);
}

export async function getCar(id) {
    return await axios.get(`${apiUrl}/${id}`)
}

export async function postCar(car) {
    return await axios.post(apiUrl, car);
}

export async function putCar(car) {
    return await axios.put(`${apiUrl}/${car.id}`, car)
}

export async function deleteCar(id) {
    return await axios.delete(`${apiUrl}/${id}`)
}