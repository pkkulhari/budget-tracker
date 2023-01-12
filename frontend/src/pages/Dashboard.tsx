import { Card, Container } from 'react-bootstrap'
import { useQuery } from 'react-query'
import api from '../utils/api'

const Dashboard = () => {
  // Budget amount is hardcoded for now
  const budgetAmount = 300000

  const querySpentAmount = useQuery('spentAmount', async () => {
    const { data } = await api.get('/api/transactions/spent-amount')
    return data as { spentAmount: number }
  })

  return (
    <Container>
      <h1 className="h4 mb-3">Dashboard</h1>

      {querySpentAmount.isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="d-flex justify-content-between gap-5">
          <Card className="w-100" border="primary">
            <Card.Body>
              <Card.Title className="text-muted">Spent Amount</Card.Title>
              <Card.Text className="h2 mt-4">
                ₹ {querySpentAmount.data?.spentAmount.toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="w-100" border="warning">
            <Card.Body>
              <Card.Title className="text-muted">Budget Amount</Card.Title>
              <Card.Text className="h2 mt-4">₹ {budgetAmount.toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="w-100" border="danger">
            <Card.Body>
              <Card.Title className="text-muted">Remaining Amount</Card.Title>
              <Card.Text className="h2 mt-4">
                ₹ {(budgetAmount - (querySpentAmount.data?.spentAmount || 0)).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  )
}

export default Dashboard
