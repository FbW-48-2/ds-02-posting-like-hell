import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import './App.css';

function App() {
  // const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState("");

  // Get users from API
  // useEffect(() => {
  //   const getData = async() => {
  //     const userData = await(await fetch("http://localhost:5000/users")).json();
  //     setUsers(userData);
  //   };
  //   getData();
  // }, []);

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

    const data = { username: username, password: password };

    // run a POST request
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( data )
    })
    .then(response => response.json())
    .then(apiData => {
      console.log(apiData);
      setLoginData(apiData);
    });
  };

  return (
    <Router>
      <Switch>
        <Route path="users/:id" exact>
          <UserProfile/>
        </Route>
      </Switch>
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
          <Link to={`users/${loginData._id}`}><input type="submit" value="Login" /></Link>
        </form>
        {/* {loginData.error ? <p>{loginData.error}</p> : loginData !== "" ? <Link to={`users/${loginData._id}`}></Link> : null} */}
      </div>
    </Router>
  );
}

export default App;
