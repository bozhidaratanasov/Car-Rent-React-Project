import {Button, Card, Form} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCar, putCar} from "../../../utils/http-utils/car-requests";
import {getLoggedUser} from "../../../utils/http-utils/user-requests";
import {postRental} from "../../../utils/http-utils/rental-requests";
import  './RentalForm.scss'
import Swal from "sweetalert2";

export function RentalForm() {
    const params = useParams();
    const [error, setError] = useState('');
    const [discount, setDiscount] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

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

    const [rental, setRental] = useState({
        carId: 0,
        userId: 0,
        startingDate: '',
        endingDate: '',
        totalPrice: 0
    });


    useEffect(() => {
        if (params.id)
            getCar(params.id).then(response => {
                setCar(response.data)
            });
    }, [params.id]);


    const onDateChange = (event) => {

        setEndingDate(event.target.value)

        const differenceInTime = new Date(event.target.value).getTime() - new Date(startingDate).getTime();

        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if (differenceInDays < 1 )
                setError('Please enter an ending date which is at least one day from the starting date!')
        else
            setError('')

        setTotalPrice(+(car.price * differenceInDays).toFixed(2));

        if (differenceInDays < 3)
            setDiscount('');

        else if (differenceInDays > 3 && differenceInDays <= 5) {
            setDiscount('Congratulations! You win 5% discount!');
            setTotalPrice(prevState => +(0.95 * prevState).toFixed(2));
        }

        else if (differenceInDays > 5 && differenceInDays <= 10) {
            setDiscount('Congratulations! You win 7% discount!');
            setTotalPrice(prevState => +(0.93 * prevState).toFixed(2));
        }

        else if (differenceInDays > 10) {
            setDiscount('Congratulations! You win 10% discount!');
            setTotalPrice(prevState => +(0.90 * prevState).toFixed(2));
        }
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        if (error)
            return;

        const rental = {
            carId: car.id,
            userId: getLoggedUser().id,
            startingDate,
            endingDate,
            totalPrice
        }

        postRental(rental).then(Swal.fire({
            title: 'Success',
            text: `You have successfully rented ${car.brand} ${car.model}!`,
            icon: 'success',
            confirmButtonText: 'Nice!',
        }));

        setCar(prevState => ({
            ...prevState,
            count: prevState.count - 1
        }))

    }

    useEffect(() => {
        putCar(car).then()
    }, [car.count])

    return (
        <div className="rent-form-wrapper">
            <Card style={{width: '32rem'}}>
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
                        <span className="label">Price Per Day:</span>
                        <span>{car.price}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="label">Available Count:</span>
                        <span>{car.count}</span>
                    </Card.Text>
                    <Form onSubmit={onFormSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Starting Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Starting Date" required name="startingDate"
                                          onChange={(e) => setStartingDate(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Ending Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Ending Date" required name="endingDate" onChange={onDateChange}/>
                        </Form.Group>
                        {error && <p className="text-danger">{error}</p>}
                        {discount && <p className="text-success">{discount}</p>}
                        <Card.Text>
                            <span className="label">Total Price:</span>
                            <span>{totalPrice.toFixed(2)}</span>
                        </Card.Text>
                        <Button variant="info" type="submit">Rent</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}