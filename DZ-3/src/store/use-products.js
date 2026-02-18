import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { $mainApi } from '../api/requester.js'

export const useProducts = () => {
    const [search, setSearch] = useState('')

    const { data, isLoading, error } = useQuery({
        queryKey: ['products', search],
        queryFn: async () => {
            if (!search) {
                const { data } = await $mainApi.get('/products')
                return data
            }

            const { data } = await $mainApi.get('/products', {
                params: {
                    name: `*${search}`
                }
            })

            return data
        }
    })

    return {
        products: data || [],
        isLoading,
        error,
        search,
        setSearch
    }
}
