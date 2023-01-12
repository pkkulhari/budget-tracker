import axios from 'axios'

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.post(`/api/token/refresh/`, {
      refresh: localStorage.getItem('refreshToken'),
    })

    return data.accessToken
  } catch (error) {
    console.error(error)
  }
}

const api = axios.create()

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      }
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
