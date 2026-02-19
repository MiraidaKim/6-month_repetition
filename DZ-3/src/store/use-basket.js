import { create } from 'zustand'
import { $mainApi } from '../api/requester.js'

export const useBasket = create((set, get) => ({
    list: [],
    isLoading: false,
    isCreateLoading: false,
    isOrderLoading: false,

    loadData: async () => {
        set({ isLoading: true })
        try {
            const { data: cart } = await $mainApi.get('/cart')

            const productsWithData = await Promise.all(
                cart.map(async (item) => {
                    const { data: product } = await $mainApi.get(`/products/${item.product_id}`)
                    return {
                        ...item,
                        product
                    }
                })
            )

            set({ list: productsWithData })
        } catch (err) {
            console.log(err)
        } finally {
            set({ isLoading: false })
        }
    },

    addToBasket: async (payload) => {
        set({ isCreateLoading: true })
        try {
            const { data } = await $mainApi.post('/cart', payload)
            set({ list: [...get().list, data] })
        } catch (err) {
            console.log(err)
        } finally {
            set({ isCreateLoading: false })
        }
    },

    deleteFromBasket: async (id) => {
        try {
            await $mainApi.delete(`/cart/${id}`)
            set({ list: get().list.filter(item => item.id !== id) })
        } catch (err) {
            console.log(err)
        }
    },

    createOrder: async (userId) => {
        const { list } = get()

        if (!list.length) return

        set({ isOrderLoading: true })

        try {
            const totalPrice = list.reduce(
                (sum, item) => sum + item.product.price,
                0
            )

            const orderData = {
                user_id: userId,
                totalPrice,
                items: list.map(item => item.product)
            }

            await $mainApi.post('/orders', orderData)

            await Promise.all(
                list.map(item =>
                    $mainApi.delete(`/cart/${item.id}`)
                )
            )

            set({ list: [] })

        } catch (err) {
            console.log(err)
        } finally {
            set({ isOrderLoading: false })
        }
    }
}))
