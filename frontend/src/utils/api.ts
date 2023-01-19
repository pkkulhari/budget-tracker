import axios from 'axios'

const API_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8000'
  : 'https://budget-tracker-986o.onrender.com'

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.post(`${API_URL}/api/token/refresh/`, {
      refresh: localStorage.getItem('refreshToken'),
    })

    return data.accessToken
  } catch (error) {
    console.error(error)
  }
}

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      } as any
    }
    return config
  },
  (error) => Promise.reject(error)
)

// response interceptor intercepting 401 responses, refreshing token and retrying the request
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config

    if (error.response.status === 401 && !config._retry) {
      config._retry = false
      localStorage.setItem('token', await refreshAccessToken())

      return axios(config)
    }

    return Promise.reject(error)
  }
)

export default api
