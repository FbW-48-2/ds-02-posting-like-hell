import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


const Home = () => {
    
  const history = useHistory();
  const [user, setUser] = useState([])
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  // Change handlers to store form data onChange into relevant states
  const handleNameChange = e => {
    setUsername(e.target.value)
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  };

  // POST request on submit
  const login = (e) => {
    e.preventDefault();

    // Create an object that takes the info stored in state hooks from change handlers
    const data = { username: username, password: password };

    // run a POST request sending this object
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( data )
    })
    .then(response => response.json())
    .then(apiData => {
      console.log(apiData);
      setUser(apiData);
    });

    
  };

    return (
        <div className="App">
        <h1>Posting like hell...</h1>
        <form onSubmit={(e) => login(e)} action="POST">
          <div>
            <label htmlFor="username">Username:
              <input onChange={(e) => handleNameChange(e)} type="text" name="username" id="username" required/>
            </label>
          </div>
          <div>
            <label htmlFor="password">Password:
              <input onChange={(e) => handlePasswordChange(e)} type="password" name="password" id="password" required/>
            </label>
          </div>
          <input type="submit" value="Login" />
        </form>
        {user.error ? <p>{user.error}</p> : user._id ? history.push(`/users/${user._id}`) : null}
      </div>
    )
}

export default Home
