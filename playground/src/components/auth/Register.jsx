import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import Axios from 'axios'
// require(dotenv).config()
const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
function Register(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (email && password) {
      const user = {
        email: email,
        password:password
      }
      console.log('handle Login', user)
      Axios.post(`${url}/api/auth/sign-in`, user).then(res => {
        if (res.status ===200){
          console.log('RES', res)
          localStorage.setItem('token', res.data)
        } else {
          console.log('else', res)
        }
        // console.log('done')
      })
    }
  }
  return (
    <Form onSubmit={handleLogin}>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
        <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={handleLogin}>
        Submit
      </Button>
    </Form>
  )
}

export default Register
