import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import Home from './Home';
import './App.css';


function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/" component={ Home } exact />
        <Route path="/users/:id" exact>
          <UserProfile/>
        </Route>
      </Switch>
      
    </Router>
  );
}

export default App;
