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

const addAuthInterceptor = (api) => {
	api.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem('tokenAuth')

			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}

			return config
		},
		(error) => Promise.reject(error)
	)
}

addAuthInterceptor($authApi)
addAuthInterceptor($mainApi)

export { $mainApi, $authApi }
