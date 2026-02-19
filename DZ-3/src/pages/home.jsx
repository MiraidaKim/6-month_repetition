import { ProductList } from '../components/product-list.jsx'
import { OrdersButton } from '../components/OrdersButton.jsx'
import './home.css';

export function Home() {
    return (
        <div className="home-page">
            <ProductList />
            <OrdersButton />
        </div>
    )
}
