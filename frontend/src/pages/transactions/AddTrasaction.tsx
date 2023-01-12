import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { AuthContext } from '../../contexts/AuthContext'
import User from '../../interfaces/user'
import api from '../../utils/api'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    payer: undefined as number | undefined,
    friends: [] as number[],
    description: '',
  })
  const [options, setOptions] = useState<{ value: number; label: string }[]>([])
  const { user } = useContext(AuthContext)
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

  const queryFriends = useQuery('friends', async () => {
    const { data } = await api.get(`/api/users/${user?.id}/friends/`)
    return data as User[]
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validate form data
    setErrors([])
    if (formData.payer === undefined) setErrors((prev) => [...prev, 'Payer is required'])
    if (errors.length > 0) return

    // Prepare payload
    const payload = {
      user: user?.id,
      ...formData,
    }

    // Send form data to backend
    try {
      await api.post('/api/transactions/', payload)
      navigate('/transactions')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    if (queryFriends.data) {
      setOptions([
        { value: user?.id as number, label: user?.username as string },
        ...queryFriends.data.map((f) => ({ value: f.id, label: f.username })),
      ])
    }
  }, [queryFriends.data])

  return (
    <Container>
      <h1 className="h4 mb-3">Add Transaction</h1>
      <Alert variant="danger" show={errors.length > 0}>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="entertainment">Entertainment</option>
                <option value="transportation">Transportation</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
                <option value="food">Food</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Payer</Form.Label>
              <Select
                options={options}
                onChange={(item) => setFormData({ ...formData, payer: item?.value })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Friends to Split</Form.Label>
              <Select
                options={options}
                onChange={(item) => setFormData({ ...formData, friends: item.map((i) => i.value) })}
                isMulti={true}
              />
              <Form.Text className="text-muted">
                Elso include payer if you want to split it with him/her
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Add Transaction</Button>
      </Form>
    </Container>
  )
}

export default AddTransaction
