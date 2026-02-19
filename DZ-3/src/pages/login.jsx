import { Navigate, useNavigate } from 'react-router-dom'
import { useInput } from '../hooks/use-input'
import { useAuth } from '../store/use-auth'
import { useMutation } from '@tanstack/react-query'
import { $mainApi } from '../api/requester'
import './login.css'

export function Login() {
	const email = useInput('')
	const password = useInput('')

	const { setUser, setLoading, setError, isAuth, isLoading, error } = useAuth()

	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationFn: async (loginDto) => {
			const { data } = await $mainApi.post('/auth', loginDto)
			return data
		},
		onMutate: () => {
			setLoading(true)
			setError(null)
		},
		onSuccess: (data) => {
			setUser(data.data)
			localStorage.setItem('tokenAuth', data.token)
			navigate('/')
		},
		onError: (e) => {
			setError(e.message || 'Ошибка при авторизации')
		},
		onSettled: () => {
			setLoading(false)
		}
	})

	const handleSubmit = (e) => {
		e.preventDefault()

		mutate({
			email: email.value,
			password: password.value,
		})
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input {...email} type='text' placeholder='Email' />
				<input {...password} type='password' placeholder='Password' />

				<button disabled={isLoading}>Login</button>

				{error && <p>{error}</p>}
			</form>
		</>
	)
}
