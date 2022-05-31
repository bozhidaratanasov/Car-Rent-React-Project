import {useEffect, useState} from "react";
import {deleteCar, getCars} from "../../../utils/http-utils/car-requests";
import {CarCard} from "../car-card/CarCard";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import './CarsList.scss'
import {calculateNewValue} from "@testing-library/user-event/dist/utils";

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
    };

    const sortCars = (event) => {
          const criteria = event.target.value;
        console.log(typeof Number(cars[0].year))
        const sortedCars = [...cars]


        switch (criteria) {
            case 'newest':
                sortedCars.sort((a, b) => Number(b.year) - Number(a.year))
                setCars(sortedCars)
                  break
              case 'oldest':
                  sortedCars.sort((a, b) => Number(a.year) - Number(b.year))
                  setCars(sortedCars)
                  break
              case 'cheapest':
                  sortedCars.sort((a, b) => Number(a.price) - Number(b.price))
                  setCars(sortedCars)
                  break
              case 'expensive':
                  sortedCars.sort((a, b) => Number(b.price) - Number(a.price))
                  setCars(sortedCars)
                  break
              default:
                  sortedCars.sort((a, b) => Number(b.year) - Number(a.year))
                  setCars(sortedCars)

          }
    };

    return (
        <div>
            <h1>Available Cars</h1>
            <Form className="sort-wrapper">
                <Form.Label style={{width: '5rem'}}>Sort By</Form.Label>
                <Form.Select style={{width: '10rem'}} onChange={sortCars}>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="cheapest">Cheapest</option>
                    <option value="expensive">Most Expensive</option>
                </Form.Select>
                <Button variant="primary" onClick={redirectToCreate}>Add New</Button>
            </Form>
            <div className="cars-list-wrapper">
                {cars.map(car => <CarCard key={car.id} car={car} deleteCar={deleteCarHandler}/>)}
            </div>
        </div>
    );
}