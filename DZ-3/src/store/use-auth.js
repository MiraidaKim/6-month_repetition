import { create } from 'zustand'
import { $mainApi } from '../api/requester'

export const useAuth = create(set => ({
  user: null,
  isAuth: Boolean(localStorage.getItem('tokenAuth')),
  isLoading: false,
  error: null,

  register: async registerDto => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await $mainApi.post('/register', registerDto)
      set({ user: data.data })
      localStorage.setItem('tokenAuth', data.token)
    } catch (e) {
      set({ error: e.message || 'Ошибка при регистрации' })
    } finally {
      set({ isLoading: false })
    }
  },

  login: async loginDto => {
  set({ isLoading: true, error: null })

  try {
    const { data } = await $mainApi.post('/auth', loginDto)
    set({ user: data.data, isAuth: true })
    localStorage.setItem('tokenAuth', data.token)
  } catch (e) {
    set({ error: e.message || 'Ошибка при авторизации' })
  } finally {
    set({ isLoading: false })
  }
},


  logout: () => {
    set({ user: null })
    localStorage.removeItem('tokenAuth')
  },
}))
