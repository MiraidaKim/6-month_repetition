import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuth } from '../store/use-auth'
import './orders.css'

export function Orders() {
  const user = useAuth(state => state.user)

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) return []
      const { data } = await axios.get(
        `https://721e09681413a41a.mokky.dev/orders?userId=${user.id}`
      )
      return data
    },
    enabled: !!user
  })

  if (!user) return <p>Нужно авторизоваться</p>
  if (isLoading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка: {error.message}</p>

  return (
    <div>
      <h1>Мои заказы</h1>
      {orders.length === 0 && <p>Список заказов пуст</p>}
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h4>Заказ #{order.id}</h4>
          <p>Сумма: {order.totalPrice} $</p>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                {item.product?.name} - {item.product?.price} $
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}


