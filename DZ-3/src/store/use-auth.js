import { create } from 'zustand'

export const useAuth = create(set => ({
	user: null,
	isAuth: false,
	isLoading: false,
	error: null,

	setLoading: (value) => {
		set({ isLoading: value })
	},

	setError: (error) => {
		set({ error })
	},

	setUser: (user) => {
		set({ isAuth: true, user })
	},

	logout: () => {
		set({ user: null, isAuth: false })
		localStorage.removeItem('tokenAuth')
	}
}))
