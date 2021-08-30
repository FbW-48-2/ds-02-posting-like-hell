import React, {useContext} from 'react';
import loginContext from '../context/loginContext';


function Login() {

const {userName, setUserName, password, setPassword, user, setUser, invalidUser, setInvalidUser, history} = useContext(loginContext);

async function login(e){
  e.preventDefault();

  let user = {username: userName, password: password};
  
  fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify( user )
  })
  .then(res => res.json())
  .then(userApi => {
    console.log(userApi)
    if(userApi.username && userApi.password) {
      setUser( userApi )
      console.log(user)
      history.push('./user');
    } else {
      console.log(userApi)
      setInvalidUser(userApi)
    }
    setUserName("")
    setPassword("");

  })
  }


  return (
    <div >

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
        <button type="submit">login now</button>
      </form>
      <p>{invalidUser}</p>
  
    </div>
    
  );
}



export default Login
