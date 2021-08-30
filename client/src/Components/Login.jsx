import React, {useState, useEffect, useContext} from 'react'
import {Container, Form, Button, Row, Col, Alert} from 'react-bootstrap'
import { handleInput } from '../Functions/handleInput'
import {handleSubmit} from '../Functions/handleSubmit'
import AuthContext from '../context'


export default function Login() {
    

    const [inputUser, setInputUser] = useState('')
    const [inputPw, setInputPw] = useState('')
    const {setAuthUser} = useContext(AuthContext)
    const [failedLogin, setFailedLogin] = useState(false)
    const [signIn, setSignIn] = useState('not')


        
   async function postRequest(user, pw, method) {
        const data = {username: user, password: pw}
        try{
            console.log('the method is: ', method)
            const res = await fetch(`http://localhost:5000/${method}`, {
            method: 'POST',
            headers: { "Content-type" : "application/json"},
            body: JSON.stringify(data)
            })
          const result = await res.json()
          if (method ==='login'){
            result.login ? setAuthUser(user) : setFailedLogin(true)
          }
          else {
            result.login ? setSignIn('done') : setSignIn('failed')
          }
          
          
        }
        catch{
          console.log('something went wrong while sending')
        }}

    return (
        <Container className="App">
        <Row className='justify-content-md-center'>
                <Col lg="8">
                    <div className='login'></div>
                    <h3>Login Page</h3>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={inputUser} type="text" placeholder="Enter username" onChange={(e) => handleInput(inputUser, setInputUser, e.target.value)}/>
                            <Form.Text className="text-muted">
                           
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={inputPw} type="password" placeholder="Password" onChange={(e) => handleInput(inputPw, setInputPw, e.target.value)}/>
                        </Form.Group> 
                        <Button value='login' variant="success"  onClick={(e) =>handleSubmit(inputUser, inputPw, e, postRequest, setInputUser, setInputPw)} active>Submit</Button><Button value='signup' variant='primary' onClick={(e) =>handleSubmit(inputUser, inputPw, e, postRequest, setInputUser, setInputPw)}>Sign Up</Button>
                    </Form>
                    {failedLogin && signIn !=='done' 
                    ? <Alert variant='warning'>Something is wrong</Alert> 
                    : signIn ==='done' ? <Alert variant='success'>You can log in now</Alert>:
                    <></>}
                </Col>
            </Row>
    </Container>
    )
}
