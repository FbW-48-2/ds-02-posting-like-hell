import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <div><Link to='/login'>Login</Link></div>
          <div><Link to='/signup'>Sign up</Link></div>
        </nav>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
