import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import User from '../interfaces/user'
import Select from 'react-select'
import api from '../utils/api'
import { AuthContext } from '../contexts/AuthContext'
import { useQuery } from 'react-query'

const Friends = () => {
  const [formData, setFormData] = useState({
    friend: undefined as number | undefined,
  })
  const { user } = useContext(AuthContext)

  const queryFriends = useQuery('friends', async () => {
    const { data } = await api.get(`/api/users/${user?.id}/friends/`)
    return data as User[]
  })

  const queryUsers = useQuery('users', async () => {
    const { data } = await api.get(`/api/users/`, {
      params: { action: 'exclude_friends' },
    })
    return data as User[]
  })

  const handleAddFriend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.friend === undefined) return

    try {
      await api.post(`/api/users/${user?.id}/friends/`, formData)
      queryFriends.refetch()
      queryUsers.refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <h1 className="h4 mb-3">Friends</h1>

      <Form className="mb-3" onSubmit={handleAddFriend}>
        <Row style={{ maxWidth: '50rem' }}>
          <Col>
            <Select
              options={queryUsers.data?.map((user) => ({ value: user.id, label: user.username }))}
              onChange={(item) => setFormData({ ...formData, friend: item?.value })}
              placeholder="Select a friend"
            />
          </Col>
          <Col>
            <Button type="submit">Add Friend</Button>
          </Col>
        </Row>
      </Form>

      <div className="border rounded p-3 bg-light">
        <Table striped hover>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queryFriends.data?.map((friend, index) => (
              <tr key={friend.id}>
                <td>{index + 1}</td>
                <td>{friend.username}</td>
                <td>
                  <Link
                    to="#"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to remove this friend?')) {
                        try {
                          await api.delete(`/api/users/${user?.id}/friends/`, {
                            data: { friend: friend.id },
                          })
                          queryFriends.refetch()
                          queryUsers.refetch()
                        } catch (error) {
                          console.log(error)
                        }
                      }
                    }}
                  >
                    Remove
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

export default Friends
