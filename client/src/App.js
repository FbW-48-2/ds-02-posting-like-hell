import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import UserProfile from "./Components/UserProfile";

function App() {
  const [user, setUser] = useState([])

  return (
    <div className="App">
      <h1>🔥 POSTING LIKE HELL 🔥</h1>
      <Router>
        <Switch>
          <Route exact path="/"><Login user={user} setUser={setUser}/></Route>
          <Route exact path="/signup"><SignUp user={user} setUser={setUser}/></Route>
          <Route exact path="/userprofile"><UserProfile user={user}/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
