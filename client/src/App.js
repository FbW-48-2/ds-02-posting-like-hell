import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import React, {useState, useEffect} from 'react';
import AuthContext from './context';

import Login from './Components/Login';
import UserProfile from './Components/UserProfile';

function App() {

    const [authUser, setAuthUser] = useState('none')
    

    return (
   <div className='app'>
    <AuthContext.Provider value={{authUser, setAuthUser}}>
    <Router>
        <Switch>
            <Route path='/user/' >
                <UserProfile /> 
            </Route>
            <Route path='/' exact>
                <Login />
                 {authUser!='none' ? <Redirect to={`/user/${authUser}`} /> : <></>} 
           </Route>

        </Switch>

    </Router>
    </AuthContext.Provider>
   </div>
  );
}

export default App;
