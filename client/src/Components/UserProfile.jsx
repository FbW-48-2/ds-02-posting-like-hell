import React, {useContext, useEffect} from 'react'
import AuthContext from '../context'
import { useState } from 'react'
import { Col, Container, Row, Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default function UserProfile(props) {
    
    const {authUser, setAuthUser} = useContext(AuthContext)
    const [profile, setProfile] = useState({})

    async function getRequest() {
        try{
          const res = await fetch(`http://localhost:5000/users/${authUser}`)
          console.log(res)
          const result = await res.json()
          console.log(result)
          setProfile(() => result)
        }
        catch{
          console.log('something went wrong while sending')
        }}
    
    
    useEffect(() => {
        getRequest()
    },[])

    return (
        <>
        {authUser === 'none' ? <Redirect to='/' /> :
        <Container>
            <Row className='justify-content-md-center'>
                {!profile.username ? <h3>Loading</h3> :
                <Col lg='8'>
                    <h3>Here you find the profile of {profile.username}</h3>
                    <Button variant='warning' onClick={() => setAuthUser('none')}>Logout</Button>
                </Col>}
            </Row>
            
        </Container>
                }
    </>
    )
}
