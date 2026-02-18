import { ProductCard } from './product-card.jsx';
import { useProducts } from '../store/use-products.js';
import './product-list.css';

export function ProductList() {
    const { products, isLoading, error } = useProducts();

    if (isLoading) return <div>LOADING...</div>;
    if (error) return <div>Ошибка загрузки</div>;

    return (
        <div className="products-row">
            {products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
}
