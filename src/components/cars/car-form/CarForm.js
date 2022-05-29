import {Button, Form} from "react-bootstrap";
import './CarForm.scss'
import {useEffect, useState} from "react";
import {getCar, postCar, putCar} from "../../../utils/http-utils/car-requests";
import {useParams} from "react-router-dom";

export function CarForm() {
    const vehicleTypes = ['Economy', 'Estate', 'Luxury', 'SUV', 'Cargo'];
    const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

    const params = useParams();

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
    })

    useEffect(() => {
        if (params.id)
            getCar(params.id).then(response => {
                setCar(response.data)
            });
    }, [params.id]);

    const onInputChange = (event) => {
        setCar(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))

    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        if (params.id)
            putCar(car).then()

        else
            postCar(car).then(() => {

            })
    }

    return (
        <div className="car-form-wrapper">
            <h1>{params.id ? 'Edit Car' : 'Create Car'}</h1>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Enter Brand" value={car.brand} name="brand"
                                  onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Enter Model" required value={car.model} name="model"
                                  onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Construction Year</Form.Label>
                    <Form.Control type="number" placeholder="Enter Construction Year" required value={car.year} name="year"
                                  onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Vehicle Type</Form.Label>
                    <Form.Select id="typeSelect" placeholder="Vehicle Type"
                                 value={car.type === '' ? vehicleTypes[0] : car.type} name="type"
                                 onChange={onInputChange}>
                        {vehicleTypes.map(vehicle => <option value={vehicle}>{vehicle}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select placeholder="Fuel Type" name="fuel" value={car.fuel} onChange={onInputChange}>
                        {fuelTypes.map(type => <option value={type}>{type}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Number Of Seats</Form.Label>
                    <Form.Control type="number" placeholder="Enter Number Of Seats" value={car.seats} name="seats"
                                  onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter Picture Link" value={car.picture} name="picture"
                                  onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price Per Day</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price Per Day" value={car.price} name="price"
                                  onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Available Count</Form.Label>
                    <Form.Control type="number" placeholder="Enter Available Count" value={car.count} name="count"
                                  onChange={onInputChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">Save</Button>

            </Form>
        </div>
    );
}