import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';

export default function SignUp({user, setUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  function changeHandler(e){
    e.target.type === "text" ? setUsername(e.target.value) : setPassword(e.target.value);
  }

  function submitHandler(e){
    e.preventDefault();
    setUser([]);
    const signUpUser = {username: username, password: password}
    const checkSignUp = async()=>{
      const fetchedData = await(await fetch("http://localhost:5000/signup",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(signUpUser)}
      )).json();
      console.log(fetchedData);
      setUser(fetchedData);
      setUsername("");
      setPassword("");
    };
    checkSignUp();
  };

  return (
    <>
      <h3>Create User</h3>
      <form onSubmit={submitHandler}>
        <label>Set Username</label>
        <input onChange={changeHandler} type="text" placeholder="username" value={username}/>
        <label>Set Password</label>
        <input onChange={changeHandler} type="password" placeholder="password" value={password}/>
        <button type="submit">Sign Up</button>
      </form>
      <br></br>
      <Link to="/">Log In here</Link>
      {user.error ? <p>{user.error}</p> : user["_id"] ? history.push("/userprofile") : null }
    </>
  )
}
