import React from "react";
import { useState, useRef } from "react";

const SignUp = () => {
  const [signData, setSignData] = useState();
  const inputName = useRef(null);
  const inputPW = useRef(null);
  const [alert, setAlert] = useState(false);

  const [msgAPI, setMsgAPI] = useState("");
  //   const [loggedIn, setLoggedin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputName.current.value);

    const newUser = {
      username: inputName.current.value,
      password: inputPW.current.value,
    };

    if (inputName.current.value === "" || inputPW.current.value === "") {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((fromAPI) => {
          setSignData(newUser);
          setMsgAPI(fromAPI);
        });
    }
  };

  console.log(signData);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>PLEASE SIGN UP. Enter your new username and password</h3>
        <div>
          username: <input ref={inputName} type="text" /> <br />
          password: <input ref={inputPW} type="password" />
        </div>
        <button type="submit">sign up</button>
      </form>

      {msgAPI.error ? <div>{msgAPI.error}</div> : <div>{msgAPI.succ}</div>}
    </div>
  );
};

export default SignUp;
