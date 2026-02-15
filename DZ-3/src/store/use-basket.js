import { create } from 'zustand'
import { $authApi } from '../api/requester.js'

export const useBasket = create((set) => ({
    list: [],
    isLoading: false,
    isCreateLoading: false,

    addToBasket: async (payload) => {
        set({ isCreateLoading: true })
        try {
            const { data } = await $authApi.post('/cart', payload)
            set((prev) => ({ list: [data, ...prev.list] }))
        } catch (e) {
            console.error('Ошибка при добавлении', e)
        } finally {
            set({ isCreateLoading: false })
        }
    },

    loadData: async () => {
        set({ isLoading: true })
        try {
            const { data } = await $authApi.get('/cart?_relations=products')
            set({ list: data })
        } catch {
            console.log('Ошибка при загрузке данных')
        } finally {
            set({ isLoading: false })
        }
    },

    deleteFromBasket: async (id) => {
        try {
            await $authApi.delete(`/cart/${id}`)
            set((prev) => ({ list: prev.list.filter(item => item.id !== id) }))
        } catch (e) {
            console.error('Ошибка при удалении', e)
        }
    }
}))
