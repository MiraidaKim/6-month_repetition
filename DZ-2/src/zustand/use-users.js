import { create } from 'zustand'

export const useUsers = create(set => ({
	users: [],
	isLoading: false,
	error: null,

	fetchUsers: async () => {
		set({ isLoading: true, error: null })
		try {
			const res = await fetch(
				'https://jsonplaceholder.typicode.com/users'
			)
			const data = await res.json()


            
			const usersWithAvatar = data.map(user => ({
				...user,
				avatar: `https://i.pravatar.cc/150?u=${user.id}`,
			}))

			set({ users: usersWithAvatar })
		} catch {
			set({ error: 'Ошибка при загрузке пользователей' })
		} finally {
			set({ isLoading: false })
		}
	},
}))
