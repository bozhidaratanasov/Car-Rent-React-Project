import {useEffect, useState} from "react";
import {deleteCar, getCars} from "../../../utils/http-utils/car-requests";
import {CarCard} from "../car-card/CarCard";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

export function CarsList() {
    const [cars, setCars] = useState([]);

    const navigate = useNavigate();

    useEffect( () => {
         getCars().then(response => {
            setCars(response.data)
        })
    }, []);

    const redirectToCreate = () => {
        navigate('/cars/create');
    }

    const deleteCarHandler = async (id) => {
        Swal.fire({
            title: 'Delete Car',
            text: 'Are you sure you want to this car?',
            icon: 'error',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'Cancel'
        }).then(async ({isConfirmed}) => {
            if (isConfirmed)
                await deleteCar(id).then(() => {
                    setCars(prevState => {
                        return prevState.filter(car => car.id !== id)
                    })
                })
        })
    }

    return (
        <div>
            <Button variant="primary" onClick={redirectToCreate}>Add New</Button>
            {cars.map(car => <CarCard key={car.id} car={car} deleteCar={deleteCarHandler}/>)}
        </div>
    );
}