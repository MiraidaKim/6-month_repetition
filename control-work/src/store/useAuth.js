import { create } from 'zustand'
import { api } from '../api/instance'

export const useAuth = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuth: false,

    register: async (data) => {
        await api.post('/register', data)
    },

    login: async (data) => {
        const response = await api.post('/auth', data)

        localStorage.setItem('token', response.data.token)

        set({
            user: response.data.data,
            token: response.data.token,
            isAuth: true
        })
    },

    logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuth: false })
    }
}))
