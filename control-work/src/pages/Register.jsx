import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await register({ email, password })
        navigate('/auth')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Регистрация</h1>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Зарегистрироваться</button>
        </form>
    )
}
