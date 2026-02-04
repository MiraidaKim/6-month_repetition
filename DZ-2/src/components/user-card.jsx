import { useNavigate } from 'react-router-dom'

export function UserCard({ user }) {
	const navigate = useNavigate()

	const onClick = () => {
		navigate(`/users/${user.id}`)
	}

	return (
		<div
			onClick={onClick}
			style={{
				border: '1px solid gray',
				padding: 10,
				marginBottom: 10,
				cursor: 'pointer',
			}}
		>
			<img src={user.avatar} width={80} />
			<h3>{user.name}</h3>
			<p>{user.username}</p>
		</div>
	)
}
