import axios from 'axios'

export const $mainApi = axios.create({
  baseURL: 'https://2da7c2ed8b1ac1a3.mokky.dev',
  headers: {
    'Content-Type': 'application/json',
  },
})
