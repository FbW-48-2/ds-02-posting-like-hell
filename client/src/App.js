import './App.css';
import React, {useState} from 'react';
import UserProfile from './component/UserProfile';
import {BrowserRouter as Router, Route, Redirect, Switch, NavLink} from 'react-router-dom';
import Login from './component/Login';
import Home from './component/Home';
import { useHistory } from 'react-router';
import loginContext from './context/loginContext';

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [invalidUser, setInvalidUser] = useState("");
  const history = useHistory();

  
  return (
    <div className="App">
  
  <loginContext.Provider value={{userName, setUserName, password, setPassword, user, setUser, invalidUser, setInvalidUser, history}} >
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/user">Dashboard</NavLink>
          </div>
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/user' component={UserProfile} />
  </Switch>
  </loginContext.Provider>
    </div>
    
  );
}

export default App;
