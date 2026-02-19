import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './orders-button.css'

export function OrdersButton() {
    const navigate = useNavigate()

    const goToOrders = () => {
        navigate('/orders')
    }

    return (
        <Button 
            className="orders-button"
            variant="primary"
            onClick={goToOrders}
        >
            Заказы
        </Button>
    )
}
