import { useContext, useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Layout = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  if (!isLoggedIn()) return <Navigate to="/login" />

  const NavItmes = useMemo(
    () => [
      { to: '/', text: 'Dashboard' },
      { to: '/transactions', text: 'Transactions' },
      { to: '/friends', text: 'Friends' },
      { to: '/owes-you', text: 'Owes you' },
      { to: '/you-owe', text: 'You Owe' },
    ],
    []
  )

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-5">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Budget Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="top-navbar-nav" />
          <Navbar.Collapse id="top-navbar-nav">
            <Nav className="me-auto">
              {NavItmes.map((item) => (
                <Nav.Link
                  as={Link}
                  to={item.to}
                  active={location.pathname === item.to}
                  key={item.text}
                >
                  {item.text}
                </Nav.Link>
              ))}
            </Nav>
            <Nav>
              <NavDropdown title={user?.username} id="user-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default Layout
