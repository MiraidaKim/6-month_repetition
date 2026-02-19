import { Navigate, useNavigate } from 'react-router-dom'
import { useInput } from '../hooks/use-input'
import { useAuth } from '../store/use-auth'
import { useMutation } from '@tanstack/react-query'
import { $mainApi } from '../api/requester'
import './register.css'

export function Register() {
	const fullName = useInput('')
	const email = useInput('')
	const password = useInput('')

	const { setLoading, setError, isAuth, isLoading, error } = useAuth()

	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationFn: async (registerDto) => {
			await $mainApi.post('/register', registerDto)
		},
		onMutate: () => {
			setLoading(true)
			setError(null)
		},
		onSuccess: () => {
			navigate('/login')
		},
		onError: (e) => {
			setError(e.message || 'Ошибка при регистрации')
		},
		onSettled: () => {
			setLoading(false)
		}
	})

	const handleSubmit = (e) => {
		e.preventDefault()

		mutate({
			fullName: fullName.value,
			email: email.value,
			password: password.value,
		})
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<input {...fullName} type='text' placeholder='Full Name' />
				<input {...email} type='text' placeholder='Email' />
				<input {...password} type='password' placeholder='Password' />

				<button disabled={isLoading}>Register</button>

				{error && <p>{error}</p>}
			</form>
		</>
	)
}
