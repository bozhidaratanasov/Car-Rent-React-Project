import {useEffect, useState} from "react";
import {getRentals} from "../../../utils/http-utils/rental-requests";
import {RentalCard} from "../rental-card/RentalCard";
import './RentalsList.scss'

export function RentalsList() {
    const [rentals, setRentals] = useState([]);

    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: 0,
        type: '',
        fuel: '',
        seats: 0,
        picture: '',
        price: 0,
        count: 0
    });


    useEffect(() => {
        getRentals().then(response => {
            setRentals(response.data);
        })
    }, []);

    const returnRental = (rentalId) => {
        setRentals(prevState => prevState.filter(rental => rental.id !== rentalId))
    }


    return (
        <div>
            <h1>Your Rented Vehicles</h1>
            <div className="rentals-list-wrapper">
                {rentals.map(rental => <RentalCard rental={rental} returnRentalEmitter={returnRental}></RentalCard>)}
            </div>
        </div>

    );
}