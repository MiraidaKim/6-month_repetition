import { useNavigate, Navigate } from 'react-router-dom'
import { useInput } from '../hooks/use-input'
import { useAuth } from '../store/use-auth'
import './register.css'

export function Register() {
  const fullName = useInput('')
  const email = useInput('')
  const password = useInput('')
  const { register, isLoading, error, isAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    await register({
      fullName: fullName.value,
      email: email.value,
      password: password.value,
    })
    navigate('/')
  }

  if (isAuth) return <Navigate to="/" />

  return (
    <div className="register-page">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input {...fullName} type="text" placeholder="Full Name" />
        <input {...email} type="text" placeholder="Email" />
        <input {...password} type="password" placeholder="Password" />
        <button disabled={isLoading}>Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
