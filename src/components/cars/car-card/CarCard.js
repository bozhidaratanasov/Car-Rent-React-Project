import {Button, Card} from "react-bootstrap";
import './CarCard.scss'
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {getLoggedUser} from "../../../utils/http-utils/user-requests";

export function CarCard({car, deleteCar}) {
    const loggedUser = getLoggedUser();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const redirectToRent = () => {
        if (car.count <= 0) {
            setError('Sorry! There are no more available units of this vehicle!');
            return;
        }

        navigate(`/cars/rent/${car.id}`);
    }

    const redirectToEdit = () => {
        navigate(`/cars/edit/${car.id}`);
    }

    return (
      <div className="car-card-wrapper">
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
                      <span className="label">Price Per Day:</span>
                      <span>{car.price}</span>
                  </Card.Text>
                  <Card.Text>
                      <span className="label">Available Count:</span>
                      <span>{car.count}</span>
                  </Card.Text>
                  {error && <p className="text-danger">{error}</p>}
                  <div className='btn-wrapper'>
                    <Button variant="info" onClick={redirectToRent}>Rent</Button>
                      {loggedUser.role === 'admin' && <Button variant="primary" onClick={redirectToEdit}>Edit</Button>}
                      {loggedUser.role === 'admin' && <Button variant="danger" onClick={() => deleteCar(car.id)}>Delete</Button>}
                  </div>
              </Card.Body>
          </Card>
      </div>
    );
}