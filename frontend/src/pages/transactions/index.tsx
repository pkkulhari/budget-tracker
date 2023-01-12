import React, { useState, useEffect } from 'react'
import { Table, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import api from '../../utils/api'
import Transaction from '../../interfaces/transaction'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

const Transactions = () => {
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const queryTransactions = useQuery('transactions', async () => {
    const filters = { category, date }
    const { data } = await api.get('/api/transactions/', { params: filters })
    return data as Transaction[]
  })

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4">Transactions</h1>
        <Link to="/transactions/add" className="btn btn-primary">
          Add Transaction
        </Link>
      </div>

      <div className="border rounded p-3 bg-light">
        <Form className="mb-3">
          <Row style={{ maxWidth: '50rem' }}>
            <Col>
              <FormControl type="date" onChange={(e) => setDate(e.target.value)} size="sm" />
            </Col>

            <Col>
              <FormControl as="select" onChange={(e) => setCategory(e.target.value)} size="sm">
                <option value="">All Categories</option>
                <option value="entertainment">Entertainment</option>
                <option value="transportation">Transportation</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
                <option value="food">Food</option>
                <option value="other">Other</option>
              </FormControl>
            </Col>
            <Col>
              <Button onClick={() => queryTransactions.refetch()} size="sm">
                Filter
              </Button>
            </Col>
          </Row>
        </Form>

        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Payer</th>
              <th>Friends</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queryTransactions.data?.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>{transaction.payer.username}</td>
                <td>{transaction.friends.map((friend) => friend.username).join(', ')}</td>
                <td className="text-capitalize">{transaction.category}</td>
                <td>{transaction.date}</td>
                <td className="d-flex gap-2">
                  <Link to={`/transactions/${transaction.id}/edit`}>Edit</Link>
                  <Link
                    to="#"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this transaction?')) {
                        try {
                          await api.delete(`/api/transactions/${transaction.id}/`)
                          queryTransactions.refetch()
                        } catch (error) {
                          console.log(error)
                        }
                      }
                    }}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  )
}

export default Transactions
