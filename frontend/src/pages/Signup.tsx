import { useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Validate form data
    setError('')
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      await api.post('/api/signup/', { ...formData, confirmPassword: undefined })
      navigate('/login')
    } catch (err: any) {
      if (err.response.status === 400) setError('A user with that username already exists')
      else setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mx-auto" style={{ maxWidth: '25rem', marginTop: '12rem' }}>
      <h1 className="mb-4">Sign Up</h1>

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
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Wait...' : 'Sign Up'}
        </Button>
      </Form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Container>
  )
}

export default Signup
