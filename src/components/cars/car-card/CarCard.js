import {Button, Card} from "react-bootstrap";
import './CarCard.scss'

export function CarCard({car, deleteCar}) {
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
                  <div className='btn-wrapper'>
                    <Button variant="info">Rent</Button>
                    <Button variant="primary">Edit</Button>
                    <Button variant="danger" onClick={() => deleteCar(car.id)}>Delete</Button>
                  </div>
              </Card.Body>
          </Card>
      </div>
    );
}