import React, { createContext, useState } from 'react'
import User from '../interfaces/user'

type LoginData = {
  tokens: {
    access: string
    refresh: string
  }
  user: User
}

interface AuthContextData {
  user: User | null
  isLoggedIn: () => boolean
  login: (data: LoginData) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem('user') || 'null')
  )

  const login = (data: LoginData) => {
    localStorage.setItem('token', data.tokens.access)
    localStorage.setItem('refreshToken', data.tokens.refresh)
    localStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  const isLoggedIn = () => !!localStorage.getItem('token')

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
