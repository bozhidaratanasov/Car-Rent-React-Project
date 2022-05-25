import {useEffect, useState} from "react";
import {getCars} from "../../../utils/http-utils/car-requests";
import {CarCard} from "../car-card/CarCard";

export function CarsList() {
    const [cars, setCars] = useState([])

    useEffect(() => {
        getCars().then(response => {
            setCars(response.data)
        })
    })

    return (
        cars.map(car => <CarCard car={car}/>)
    );
}