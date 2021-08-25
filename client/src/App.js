// import { json } from 'express';
import { useState, useRef, useEffect } from 'react'
import './App.css';
import Profile from './components/Profile';


function App() {

  const [loginData, setLoginData] = useState()
  const inputName = useRef(null)
  const inputPW = useRef(null)

  const [ msgAPI, setMsgAPI] = useState('')
  const [loggedIn, setLoggedin] = useState(false)

  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newUser = {
      _id: Date.now().toString(),
      username : inputName.current.value,
      password : inputPW.current.value
    }

    
    setLoginData(newUser)
    // console.log(loginData)

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(fromAPI => {
      setMsgAPI(fromAPI)
      fromAPI.succ? setLoggedin(true): setLoggedin(false)
    })
  }
  
 
  console.log(msgAPI)

  return (
    <Router>
      <div className="App">
        <form onSubmit={handleSubmit}>
          username: <input ref={inputName} type="text" />
          password: <input ref={inputPW} type="password" />
          <button type="submit">login</button>
        </form>

        {msgAPI.error ? <div>{msgAPI.error}</div> : <div>{msgAPI.succ}</div>}

        
      </div>
    </Router>
  );
}

export default App;
