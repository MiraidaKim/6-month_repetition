import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layout'
import { Home } from '../pages/home'
import { Login } from '../pages/login'
import { Register } from '../pages/register'
import { ProtectedRoute } from './protected-route'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
])
