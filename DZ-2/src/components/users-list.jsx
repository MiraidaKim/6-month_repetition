import { useEffect } from 'react'
import { useUsers } from '../zustand/use-users'
import { UserCard } from './user-card'

export function UsersList() {
	const { users, isLoading, error, fetchUsers } = useUsers()

	useEffect(() => {
		fetchUsers()
	}, [])

	if (isLoading) return <p>LOADING...</p>
	if (error) return <p>{error}</p>

	return (
		<div>
			<h1>Users</h1>
			<div>
				{users.map(user => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		</div>
	)
}
