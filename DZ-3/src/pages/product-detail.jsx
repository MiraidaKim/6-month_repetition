import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { $mainApi } from '../api/requester.js'
import './product-detail.css'

export function ProductDetail() {
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true)
            try {
                const { data } = await $mainApi.get(`/products/${id}`)
                setProduct(data)
            } catch (e) {
                setError('Ошибка загрузки книги')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>
    if (!product) return null

    const images = [product.picture, product.picture2]

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        )
    }

    return (
        <div className="product-detail">
            <div className="product-images">
                <img
                    src={images[currentImage]}
                    alt={product.name}
                />

                <div className="image-controls">
                    <button onClick={prevImage}>←</button>
                    <button onClick={nextImage}>→</button>
                </div>
            </div>

            <div className="product-info">
                <h2>{product.name}</h2>

                <p className="price">Цена: {product.price} $</p>
                <p className="year">Год: {product.year}</p>
                <p className="rating">Оценка:  {product.rating}</p>

                <p className="full-description">
                    {product.fullDescription}
                </p>
            </div>
        </div>
    )
}
