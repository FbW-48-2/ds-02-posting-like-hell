import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import {Navbar, Container, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Navigation() {

  const { userStatus, setUserStatus } = useContext(UserContext)

  const handleClick  = () => {

    // update userStatus in the backend
    const updateLogOut = async () => {
      const settings = {
        method: 'PUT',
        body: JSON.stringify({ loggedIn: false }),
        headers: {
          "Content-Type": "application/json",
        }
      }
      try{
        const res = await fetch(`/users/${userStatus._id}`, settings)
        const data = await res.json()
        console.log(data);
        setUserStatus(data)

      }
      catch(err){
        console.log(err);
      }
    }
    updateLogOut()
  }
    
    return (
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand>
            {
              userStatus.loggedIn ?
                `Welcome ${userStatus.username}`
                :
                ''
            }
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>

              {
                userStatus.loggedIn ? 
                  <>
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    <Nav.Link as={Link} onClick={handleClick} to="/">Log Out</Nav.Link>
                  </>
                :
                  <>
                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  </>
              }
            </Nav>
            </Container>
          </Navbar>
        </>
    )
}
