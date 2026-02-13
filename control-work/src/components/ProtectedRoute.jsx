import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

export default function ProtectedRoute({ children }) {
    const { token } = useAuth()

    if (!token) {
        return <Navigate to="/auth" />
    }

    return children
}
