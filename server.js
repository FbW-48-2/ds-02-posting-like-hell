//Initialize 
const express = require('express')
const cors = require("cors")
const app = express()
let users = [
    { _id: "u1", username: "user1", password: "pw1"},
    { _id: "u2", username: "user2", password: "pw2"},
    { _id: "u3", username: "user3", password: "pw3"},
]

//Middleware
app.use( cors() ) 
app.use( ( express.json() ))



//Routing
app.get('/users', (request, response) => {
    response.json(users)
})

app.get('/users/:user', (req, res) => {
    const {user} = req.params
    const userBack = users.find( element => element.username === user)
    res.json(userBack)
})

app.post('/signup', (request, response) => {
    const newUser = {...request.body, id: Date.now().toString()}
    users.push(newUser)
    response.json({messsage: `New user added`, login: true  })
})

app.post ('/login', (req, res) => {
    const {username, password} = req.body
    const findUser = users.find( element => element.username === username && element.password === password)    
        
        if (findUser) {
            res.json({messsage: 'You are logged in', login: true})
        }
        else {
            res.json({messsage: `Invalid User`, login: false  })
        }
})


app.listen( 5000, () => {
    console.log('API started successfully')
} )