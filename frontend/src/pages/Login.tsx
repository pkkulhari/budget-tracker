import axios from 'axios'
import { useContext, useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { API_URL } from '../utils/api'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await axios.post(`${API_URL}/api/token/`, formData)
      login(data)
      navigate('/')
    } catch (err: any) {
      setError('Invalid username or/and password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mx-auto" style={{ maxWidth: '25rem', marginTop: '12rem' }}>
      <h1 className="mb-4">Login</h1>

      <Alert variant="danger" show={error !== ''}>
        {error}
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Wait...' : 'Login'}
        </Button>
      </Form>

      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </Container>
  )
}

export default Login
