import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './product-card.css';

export function ProductCard({ id, name, author, price, year, picture, description }) {
    const navigate = useNavigate();

    const goToDetail = () => {
        navigate(`/product/${id}`); 
    }

    return (
        <Card className="card">
            <Card.Img variant="top" src={picture} />
            <Card.Body className="card-body">
                <Card.Title className="card-title">{name}</Card.Title>
                {author && <p className="card-author">{author}</p>}
                <Card.Text className="card-text">{description}</Card.Text>
                <p>{price} $</p>
                <p>{year}</p>
                <Button onClick={goToDetail}>Подробнее</Button>
            </Card.Body>
        </Card>
    );
}
