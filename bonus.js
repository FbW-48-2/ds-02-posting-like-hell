const express = require("express")
const app = express()
const cors = require("cors")

let users = [
    {
        "username": "user6",
        "password": "pw6",
        "id": "16298100251"
      }
]
app.use( cors())
app.use( express.json())

/// POST

app.post("/users", (req, res) =>{
    console.log("[POST] /users called")
    const { username, password} = req.body

    const userFound = users.find(user => user.username === username)
    const passwordFound =users.find(user => user.password === password)
    if(!userFound){
        return res.json({
            error: "Failed to login, user was not found!"
        })
    }
    if(userFound && !passwordFound){
        return res.json({
            error: "Password did not match!"
        })
    }
    if(userFound && passwordFound){
        return res.json({
            true : "Everything matched!"
        })
    }
})

// LOGIN bonus from bonus

app.post("/login", (req, res) => {
    console.log("LOGIN was called")
    const {name, password} = req.body
    const userFound = users.find(user => user.username === name && user.password === password)
    console.log(userFound)
    console.log(req.body)
    if(userFound ){
        res.json( userFound)
    } else{
        res.json(`user was not found`)
    }
})


// GET users

app.get("/users", (request, response) =>{
    console.log('[GET] /users was called')
    response.json(users)
})



/// SERVER

app.listen(5005, () =>{
    console.log('PORT 5005 IS WORKING')
})


// try to make a pull request 