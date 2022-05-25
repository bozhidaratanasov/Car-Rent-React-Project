import {useEffect, useState} from "react";
import {deleteCar, getCars} from "../../../utils/http-utils/car-requests";
import {CarCard} from "../car-card/CarCard";

export function CarsList() {
    const [cars, setCars] = useState([])

    useEffect(() => {
        getCars().then(response => {
            setCars(response.data)
        })
    })

    const deleteCarHandler = async (id) => {
        await deleteCar(id).then(() => {
            setCars(prevState => {
                return prevState.filter(car => car.id !== id)
            })
        })
    }

    return (
        cars.map(car => <CarCard key={car.id} car={car} deleteCar={deleteCarHandler}/>)
    );
}