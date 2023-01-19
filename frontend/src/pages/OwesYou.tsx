import { Container, Table } from 'react-bootstrap'
import { useQuery } from 'react-query'

import api from '../utils/api'
import Transaction from '../interfaces/transaction'

const OwesYou = () => {
  const queryTransactions = useQuery(['transactions', 'owes_you'], async () => {
    const { data } = await api.get(`/api/transactions/`, {
      params: { action: 'owes_you' },
    })
    return data as Transaction[]
  })

  return (
    <Container>
      <h1 className="h4 mb-3">Owes You</h1>

      {queryTransactions.isLoading ? (
        'Loading...'
      ) : (
        <div className="border rounded p-3 bg-light">
          <Table striped hover>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Lender</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {queryTransactions.data?.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.payer.username}</td>
                  <td>{transaction.splited_amount.toLocaleString()}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  )
}

export default OwesYou
