import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const initialState = {
    username: '',
    password: ''
  }

  const [user, setUser] = useState(initialState)



  const handleInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const login = async (e) => {
    e.preventDefault()
    console.log(user)
    const response = await fetch('http://localhost:5000/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    const result = await response.json()
    console.log(result);
    setUser(initialState)
  } 

  return (
    <div className="App">
      <h1 className="mb-3">Login</h1>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formGridUser">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name="username" value={user.username} onChange={handleInput} autoComplete="off" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleInput} autoComplete="off" />
        </Form.Group>

        <div className='button-container'>
          <Button variant="success" className='mt-3 w-25' type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default App;
