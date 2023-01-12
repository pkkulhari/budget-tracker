import User from './user'

interface Transaction {
  id: number
  user: User
  amount: number
  description: string
  friends: User[]
  category: string
  payer: User
  date: string
  splited_amount: number
}

export default Transaction
