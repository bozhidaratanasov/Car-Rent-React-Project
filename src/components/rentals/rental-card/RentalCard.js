import {useEffect, useState} from "react";
import {getCar} from "../../../utils/http-utils/car-requests";
import {Button, Card, Form} from "react-bootstrap";

export function RentalCard({rental}) {
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
        if (rental.carId)
            getCar(rental.carId).then(response => {
                setCar(response.data);
            })
    }, []);


    return (
        <div className="rent-card-wrapper">
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={car.picture}/>
                <Card.Body>
                    <Card.Title className="title">{car.brand}</Card.Title>
                    <Card.Text>
                        <span className="label">Model:</span>
                        <span>{car.model}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="label">Construction Year:</span>
                        <span>{car.year}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="label">Vehicle Type:</span>
                        <span>{car.type}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="label">Fuel Type:</span>
                        <span>{car.fuel}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="label">Number Of Seats:</span>
                        <span>{car.seats}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="label">Starting Date:</span>
                        <span>{rental.startingDate}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="label">Ending Date:</span>
                        <span>{rental.endingDate}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="label">Total Price:</span>
                        <span>{rental.totalPrice.toFixed(2)}</span>
                    </Card.Text>
                    <Button className="btn-danger">Return</Button>
                </Card.Body>
            </Card>
        </div>
    );
}