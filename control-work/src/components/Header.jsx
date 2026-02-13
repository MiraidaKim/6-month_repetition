import { Link } from 'react-router-dom'
import { useAuth } from '../store/useAuth'
import './header.css'

export default function Header() {
    const { user, token, logout } = useAuth()

    return (
        <header style={{ padding: '20px', borderBottom: '1px solid gray' }}>
            <div>
                {token ? (
                    <p>Привет, {user?.email}</p>
                ) : (
                    <p>Гость</p>
                )}
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
                {!token && <Link to="/auth">Вход</Link>}
                {!token && <Link to="/register">Регистрация</Link>}
                {token && <Link to="/create">Создать пост</Link>}
                {token && <button onClick={logout}>Выход</button>}
            </div>
        </header>
    )
}
