import { useAuth } from '../store/use-auth'
import './header.css'

export function Header() {
  const logout = useAuth(state => state.logout)

  return (
    <header className="header">
      <div>Header</div>
      <button className="header-btn" onClick={logout}>Logout</button>
    </header>
  )
}
