import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUsers } from '../zustand/use-users'

export function UserPage() {
	const { id } = useParams()
	const { currentUser, isLoading, error, fetchUserById } = useUsers()

	useEffect(() => {
		fetchUserById(id)
	}, [id])

	if (isLoading) return <p>LOADING...</p>
	if (error) return <p>{error}</p>
	if (!currentUser) return <p>Пользователь не найден</p>

	return (
		<div>
			<img src={currentUser.avatar} width={120} />
			<h2>{currentUser.name}</h2>
			<p>Username: {currentUser.username}</p>
			<p>Email: {currentUser.email}</p>
			<p>Phone: {currentUser.phone}</p>
		</div>
	)
}
