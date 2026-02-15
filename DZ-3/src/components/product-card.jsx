import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './product-card.css';
import { useBasket } from '../store/use-basket.js';
import { useAuth } from '../store/use-auth.js';
import { ShoppingCart } from 'lucide-react';

export function ProductCard({ id, name, author, price, year, picture, description }) {
    const { addToBasket, isCreateLoading } = useBasket();
    const user = useAuth(state => state.user);
    const navigate = useNavigate();

    const onCreate = async () => {
        if (!user) {
            alert('Нужно авторизоваться');
            return;
        }

        try {
            await addToBasket({
                user_id: user.id,
                product_id: id
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className="card">
            <Card.Img variant="top" src={picture} />
            <Card.Body className="card-body">
                <Card.Title className="card-title">{name}</Card.Title>
                {author && <p className="card-author">{author}</p>}
                <Card.Text className="card-text">{description}</Card.Text>
                <p>{price} $</p>
                <p>{year}</p>

                <div className="d-flex align-items-center gap-2">
                    <Button 
                        variant="primary" 
                        onClick={() => navigate(`/product/${id}`)}
                    >
                        Подробнее
                    </Button>

                    {user && (
                        <Button 
                            variant='outline-primary' 
                            onClick={onCreate} 
                            disabled={isCreateLoading}
                        >
                            <ShoppingCart />
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
