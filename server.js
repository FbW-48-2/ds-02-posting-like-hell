const express = require("express")
const app = express()

let users = [
    { id: "u1", username: "user1", password: "pw1"},
    { id: "u2", username: "user2", password: "pw2"},
    { id: "u3", username: "user3", password: "pw3"},
]

app.use( express.json())

/// POST
app.post("/users", (request, response) => {
   console.log("[POST] /users called")
   const {id, username, password} = request.body

   const userNew = {...request.body}
   users.push(userNew)
   response.json(userNew)
   console.log(userNew)
})

app.post("/usersGeneratedId", (request, response) => {
    console.log("[POST] /users called")
    const { username, password} = request.body
 
    const userNew = {...request.body, id : Date.now().toString()}
    users.push(userNew)
    response.json(userNew)
    console.log(userNew)
 })



/// GET

app.get("/users", (request, response) =>{
    console.log('[GET] /users was called')
    response.json(users)
})

app.get("/users/:id", (request, response) => {
    const {id} = request.params
    const userFound = users.find(user => user.id === id)
    response.json(userFound)
    
})

// SERVER => http://localhost:5006
app.listen(5006, () =>{
    console.log('PORT 5006 is working')
})