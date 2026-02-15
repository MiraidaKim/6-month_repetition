import { useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Button, CardFooter } from 'react-bootstrap'
import { Trash } from 'lucide-react'
import { useBasket } from '../store/use-basket.js'
import './bascet.css'

export function Basket({ show, handleClose, ...props }) {
    const { list, isLoading, loadData, deleteFromBasket } = useBasket()

    useEffect(() => {
        loadData()
    }, [])

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <Offcanvas show={show} onHide={handleClose} {...props} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Корзина</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {list.length === 0 && <p>Корзина пустая</p>}

                {list.map((item) => (
                    <Card key={item.id} className="cart-item">
                        <div className="cart-item-info">
                            <Card.Title>{item.products?.name || item.name}</Card.Title>
                            <Card.Text>{item.products?.price || item.price} $</Card.Text>
                        </div>
                        <CardFooter className="cart-item-footer">
                            <Button
                                variant="outline-danger"
                                onClick={() => deleteFromBasket(item.id)}
                            >
                                <Trash color="red" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    )
}
