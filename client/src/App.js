import './App.css';
import React, {useState} from 'react';
import UserProfile from './component/UserProfile';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

function App() {
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [user, setUser] = useState(null);
const [isUser, setIsUser] = useState(false);

function login(e){
e.preventDefault();
let user = {username: userName, password: password};

fetch('http://localhost:5000/login', {
  method: 'POST',
  headers: { "Content-Type": "application/json" }, 
  body: JSON.stringify( user )
})
.then(res => res.json())
.then(userApi => {
  if (!userApi.username && !userApi.password) {
    console.log("error")
  }
  console.log( userApi )
  setUser( userApi )
  setIsUser(true)
} )
}

  return (
    <div className="App">

      <form onSubmit={(e)=>{login(e)}}>
        <input 
        type="text" 
        placeholder="id"
        defaultValue="reset" 
        value={userName}
        onChange={(e)=> setUserName(e.target.value)}  
        />
        <input 
        type="password" 
        placeholder="password" 
        defaultValue="reset"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}  
        />
        <button type="submit" >log in now</button>
      </form>
      <div className={!isUser ? "hidden": ""}>
      {user && user.username ? <UserProfile name={user.username} /> : "invalid user" }
      </div>
     
    </div>
    
  );
}

export default App;
