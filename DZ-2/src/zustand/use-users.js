import { create } from 'zustand'

export const useUsers = create(set => ({
	users: [],
	currentUser: null,
	isLoading: false,
	error: null,

	fetchUsers: async () => {
		set({ isLoading: true, error: null })

		try {
			const res = await fetch('https://jsonplaceholder.typicode.com/users')
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

	fetchUserById: async id => {
		set({ isLoading: true, error: null, currentUser: null })

		try {
			const res = await fetch(
				`https://jsonplaceholder.typicode.com/users/${id}`
			)

			if (!res.ok) {
				throw new Error()
			}

			const data = await res.json()

			set({
				currentUser: {
					...data,
					avatar: `https://i.pravatar.cc/150?u=${data.id}`,
				},
			})
		} catch {
			set({ error: 'Пользователь не найден' })
		} finally {
			set({ isLoading: false })
		}
	},
}))
