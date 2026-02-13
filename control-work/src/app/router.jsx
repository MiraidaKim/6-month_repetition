import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Posts from '../pages/Posts'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CreatePost from '../pages/CreatePost'
import ProtectedRoute from '../components/ProtectedRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Posts /> },
            { path: '/posts', element: <Posts /> },
            { path: '/auth', element: <Login /> },
            { path: '/register', element: <Register /> },
            {
                path: '/create',
                element: (
                    <ProtectedRoute>
                        <CreatePost />
                    </ProtectedRoute>
                )
            }
        ]
    }
])
