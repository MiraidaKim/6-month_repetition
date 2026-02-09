import axios from 'axios'

const createApi = () =>
	axios.create({
		baseURL: 'https://721e09681413a41a.mokky.dev',
		headers: {
			'Content-Type': 'application/json',
		},
	})

const $mainApi = createApi()
const $authApi = createApi()

$authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('tokenAuth')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export { $mainApi, $authApi }