import { useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useBasket } from '../store/use-basket.js'
import './bascet.css'

export function Basket({ show, handleClose, ...props }) {
    const { list, isLoading, loadData, deleteFromBasket } = useBasket()

    useEffect(() => {
        loadData()
    }, [])

    if (isLoading) return <div>Загрузка...</div>

    return (
        <Offcanvas show={show} onHide={handleClose} {...props} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Корзина</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {list.length === 0 && <p>Корзина пустая</p>}

                {list.map(item => (
                    <div key={item.id} className="cart-item">
                        <h4>{item.product?.name}</h4>
                        <p>{item.product?.price} $</p>
                        <button onClick={() => deleteFromBasket(item.id)}>
                        Удалить
                        </button>
                    </div>
                ))}

            </Offcanvas.Body>
        </Offcanvas>
    )
}
