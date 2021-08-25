import '../sass/App.scss';
import Navigation from './Navigation';
import { Route, Switch, Redirect } from 'react-router-dom'
import SignUp from './SignUp';
import Login from './Login'
import UserProfile from './UserProfile';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Home from './Home';

function App() {

  const { userStatus } = useContext(UserContext)
  


  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home}/>
       <Route exact path="/login">
          {userStatus.loggedIn ? <Redirect to="/profile" /> : <Login/>}
       </Route>
        <Route exact path="/signup">
          {userStatus.loggedIn ? <Redirect to="/profile" /> : <SignUp/>}
        </Route>
        <Route exact path="/profile" component={UserProfile} />
    
      </Switch> 
    </div>
  );
}

export default App;
