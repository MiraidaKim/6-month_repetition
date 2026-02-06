import { useEffect } from 'react'
import { useUsers } from '../zustand/use-users'
import { useNavigate } from 'react-router-dom'

export function UsersList() {
	const { users, isLoading, error, fetchUsers } = useUsers()
	const navigate = useNavigate()

	useEffect(() => {
		fetchUsers()
	}, [])

	if (isLoading) return <p>LOADING...</p>
	if (error) return <p>{error}</p>

	return (
		<div>
			<h1>Users</h1>

			{users.map(user => (
				<div
					key={user.id}
					onClick={() => navigate(`/users/${user.id}`)}
					style={{ border: '1px solid gray', marginBottom: 10, cursor: 'pointer' }}
				>
					<img src={user.avatar} width={80} />
					<h3>{user.name}</h3>
					<p>{user.username}</p>
				</div>
			))}
		</div>
	)
}
