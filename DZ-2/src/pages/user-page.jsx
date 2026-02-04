import { useParams } from 'react-router-dom'
import { useUsers } from '../zustand/use-users'

export function UserPage() {
	const { id } = useParams()
	const { users, isLoading, error } = useUsers()

	if (isLoading) return <p>LOADING...</p>
	if (error) return <p>{error}</p>

	const user = users.find(item => item.id === Number(id))

	if (!user) return <p>Пользователь не найден</p>

	return (
		<div>
			<img src={user.avatar} width={120} />
			<h2>{user.name}</h2>
			<p>Username: {user.username}</p>
			<p>Email: {user.email}</p>
			<p>Phone: {user.phone}</p>
		</div>
	)
}
