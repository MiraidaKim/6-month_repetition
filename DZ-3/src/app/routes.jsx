import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/home'
import { Login } from '../pages/login'
import { Register } from '../pages/register'
import { Layout } from './layout'
import { ProtectedRoute } from './protected-route'
import { ProductDetail } from '../pages/product-detail.jsx'
import { Orders } from '../pages/orders.jsx'

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    { path: '/orders', element: <Orders /> }
                ],
            },
            { path: '/register', element: <Register /> },
            { path: '/login', element: <Login /> },
            { path: '/product/:id', element: <ProductDetail /> }, 
            { path: '/', element: <Home /> }
        ],
    },
])

