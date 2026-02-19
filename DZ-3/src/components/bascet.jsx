import { useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Button } from 'react-bootstrap'
import { useBasket } from '../store/use-basket.js'
import { useAuth } from '../store/use-auth.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { $mainApi } from '../api/requester.js'
import './bascet.css'

export function Basket({ show, handleClose, ...props }) {
    const { list, isLoading, loadData, deleteFromBasket } = useBasket()
    const user = useAuth(state => state.user)
    const queryClient = useQueryClient()

    useEffect(() => {
        loadData()
    }, [])

    const createOrderMutation = useMutation({
        mutationFn: async () => {
            const orderData = {
                user_id: user.id,
                totalPrice: list.reduce((sum, item) => sum + (item.product?.price || 0), 0),
                items: list.map(item => ({ product_id: item.product.id }))
            }
            const { data } = await $mainApi.post('/orders', orderData)
            return data
        },
        onSuccess: async () => {
            await Promise.all(list.map(item => $mainApi.delete(`/cart/${item.id}`)))
            queryClient.invalidateQueries(['basket'])
            loadData()
        }
    })

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
                        <button onClick={() => deleteFromBasket(item.id)}>Удалить</button>
                    </div>
                ))}

                {list.length > 0 && (
                    <Button
                        variant="success"
                        className="mt-3"
                        onClick={() => createOrderMutation.mutate()}
                        disabled={createOrderMutation.isLoading}
                    >
                        {createOrderMutation.isLoading ? 'Оформление...' : 'Оформить заказ'}
                    </Button>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    )
}
