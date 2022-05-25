import {Card} from "react-bootstrap";

export function CarCard({car}) {
    return (
      <div className="car-card-wrapper">
          <Card>
              <Card.Body>
                  <Card.Title>{car.name}</Card.Title>
              </Card.Body>
          </Card>
      </div>
    );
}