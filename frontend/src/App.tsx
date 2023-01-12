import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Friends from './pages/Friends'
import Login from './pages/Login'
import OwesYou from './pages/OwesYou'
import Signup from './pages/Signup'
import Transactions from './pages/transactions'
import AddTrasaction from './pages/transactions/AddTrasaction'
import EditTransaction from './pages/transactions/EditTransaction'
import YouOwe from './pages/YouOwe'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions">
            <Route index element={<Transactions />} />
            <Route path="add" element={<AddTrasaction />} />
            <Route path=":id/edit" element={<EditTransaction />} />
          </Route>
          <Route path="/friends" element={<Friends />} />
          <Route path="/owes-you" element={<OwesYou />} />
          <Route path="/you-owe" element={<YouOwe />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
