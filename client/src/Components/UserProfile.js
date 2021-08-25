import React, {useContext} from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function UserProfile() {

    const { userStatus } = useContext(UserContext)

    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center flex-column display-5 mt-5" >
                {
                    userStatus.loggedIn ? 
                        <>
                            <h3>Welcome to your profile</h3>
                            <h1>{userStatus.username}</h1>
                            <p>😎</p>

                        </>
                        :
                        <>
                            <h2>Do you have an account?</h2>
                            <p>No? 🙀</p>
                            <p>no problem, 👉 <Link to="/signup">Sign Up here</Link></p>
                            <p>or</p>
                            <p>👉 <Link to="login">Login here</Link></p>

                        </>

                }

            </div>
        </Container>
    )
}
