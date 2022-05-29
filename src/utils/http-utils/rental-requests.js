import axios from "axios";
import {getLoggedUser} from "./user-requests";

const apiUrl = 'http://localhost:3005/rentals';

export async function getRentals() {
    const userId = getLoggedUser().id;


    return await axios.get(`${apiUrl}?userId=${userId}`);
}

export async function postRental(rental) {
    return await axios.post(apiUrl, rental);
}