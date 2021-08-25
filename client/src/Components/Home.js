import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function Home() {
    const { userStatus } = useContext(UserContext)

    return (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "50vh"}}>
            {
                userStatus. loggedIn ? 
                    <h1 className="display-1">Wellcome {userStatus.username}</h1>
                    :
                    <>
                        <h1 className="display-1">Wellcome to this APP</h1>
                        <p>Please login 👉 <Link to="/login">HERE</Link></p>
                        <p>You don't have an account? Sign Up 👉 <Link to="/signup">HERE</Link></p>
                    </>
            }
        </div>
    )
}
