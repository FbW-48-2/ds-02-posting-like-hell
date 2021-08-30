import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, NavLink, useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Home from './Components/Home'
import UserProfile from './Components/UserProfile'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const initialState = {
  username: '',
  password: ''
}

function App() {
  const [state, setState] = useState(null)
  const [userInputs, setUserInputs] = useState(initialState)
  const [loggedUser, setLoggedUser] = useState({})
  const history = useHistory();

  const handleInput = e => {
    setUserInputs({
      ...userInputs,
      [e.target.name]: e.target.value
    })
  }

  const signup = async e => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInputs)
    })
    const result = await response.json()
    console.log(result);
    setLoggedUser(result)
    setUserInputs(initialState)
    alert(`Thank you for signing up!`)
    setState(null)
  }

  const login = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInputs)
    })
    const result = await response.json()
    console.log(result);
    if(result.error){
      alert(result.error)
    } else {
      setLoggedUser(result);
      setState(null)
      history.push('/user')
    }
    setUserInputs(initialState)
  }

  const formMarkUp = (<Form onSubmit={state === 'login' ? login : signup}>
    <Form.Group className="mb-3" controlId="formGridUser">
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="Enter username" name="username" value={userInputs.username} onChange={handleInput} autoComplete="off" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name="password" value={userInputs.password} onChange={handleInput} autoComplete="off" />
    </Form.Group>

    <div className='button-container'>
      {
        state === 'login'
        ? <Button variant="success" className='mt-3 w-25' type="submit">Login</Button>
        : <Button variant="success" className='mt-3 w-25' type="submit">Sign up</Button>
      }
    </div>
  </Form>)

  return (
      <div className="App">
        <nav>
          <div>
            <NavLink to='/' exact activeClassName='active' onClick={() => setState(null)}>Home</NavLink>
          </div>
          <div>
            <NavLink to='/signup' exact activeClassName='active' onClick={()=> setState('signup')}>Signup</NavLink>
            <NavLink to='/login' exact activeClassName='active' onClick={()=> setState('login')}>Login</NavLink>
          </div>
        </nav>
        {
          state && formMarkUp
        }
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/user' exact component={() => <UserProfile user={loggedUser} />} />
        </Switch>    
      </div>
  );
}

export default App;
