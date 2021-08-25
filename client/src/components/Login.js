import React from "react";
import { useState, useRef } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState();
  const inputName = useRef(null);
  const inputPW = useRef(null);

  const [msgAPI, setMsgAPI] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: inputName.current.value,
      password: inputPW.current.value,
    };

    // console.log(loginData)

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((fromAPI) => {
        setLoginData(user);
        setMsgAPI(fromAPI);
        fromAPI.succ ? setLoggedin(true) : setLoggedin(false);
      });
  };

//   console.log(msgAPI);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        username: <input ref={inputName} type="text" />
        password: <input ref={inputPW} type="password" />
        <button type="submit">login</button>
      </form>

      {msgAPI.error ? <div>{msgAPI.error}</div> : <div>{msgAPI.succ}</div>}
    </div>
  );
};

export default Login;
