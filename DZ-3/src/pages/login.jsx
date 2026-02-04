import { useNavigate } from 'react-router-dom'
import { useInput } from '../hooks/use-input'
import { useAuth } from '../store/use-auth'
import './login.css'

export function Login() {
  const email = useInput('')
  const password = useInput('')
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    await login({ email: email.value, password: password.value })
    navigate('/')
  }

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input {...email} type="text" placeholder="Email" />
        <input {...password} type="password" placeholder="Password" />
        <button disabled={isLoading}>Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
