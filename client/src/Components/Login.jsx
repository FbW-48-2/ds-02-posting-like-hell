import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';

export default function Login({user,setUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  function changeHandler(e){
    e.target.type === "text" ? setUsername(e.target.value) : setPassword(e.target.value);
  }

  function submitHandler(e){
    e.preventDefault();
    setUser([]);
    const loginUser = {username: username, password: password}
    const checkLogin = async()=>{
      const fetchedData = await(await fetch("http://localhost:5000/login",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(loginUser)}
      )).json();
      console.log(fetchedData);
      setUser(fetchedData);
      setUsername("");
      setPassword("");
    };
    checkLogin();
  };

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={submitHandler}>
        <label>Username</label>
        <input onChange={changeHandler} type="text" placeholder="username" value={username}/>
        <label>Password</label>
        <input onChange={changeHandler} type="password" placeholder="password" value={password}/>
        <button type="submit">Login</button>
      </form>
      <br></br>
      <Link to="/signup">Sign Up here</Link>
      {user.error ? <p>{user.error}</p> : user["_id"] ? history.push("/userprofile") : null }
    </>
  )
}
