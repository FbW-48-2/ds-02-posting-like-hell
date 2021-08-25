const express = require('express')
const cors = require('cors')

const app = express()

let users = [
    { _id: "u1", username: "user1", password: "pw1" },
    { _id: "u2", username: "user2", password: "pw2" },
    { _id: "u3", username: "user3", password: "pw3" },
]
// middlewares +++++++++++++++++++++++++

app.use( express.json() )
app.use( cors() )

//  ++++++++++++++++++++++++++++++++++++


app.get("/", (req, res) => {
    res.send(`<h1>Hola Mundo</h1>
    <p><a href="/signup">signup</a></p>
    <p><a href="/users">users</a></p>`)
})

app.get("/users", (req, res)=> {
    console.log("[GET] /users => you are in users route");
    res.json(users)
})

app.post("/signup", (req, res)=> {
    console.log("[POST] /signup => are you trying to signup??");
    const { username, password } = req.body
    const findUser = users.find(user => {
        return user.username === username
    })

   if(findUser){
        return res.json({
            error: `Username already exist, push your brain and figure out something new`
        })
   }

   if(!username){
       return res.json({
           error: "Provide a username"
       })     
   }

   if(!password){
       return res.json({
           error: "Provide a Password"
       })
   }

    const newUser= { ...req.body, _id: Date.now().toString(), status: "success", loggedIn: true }
    users.push(newUser)
    // res.json({ message: 'User signed up successfully...' })

    // send de user's data and status without password to the frontend
    res.json({
        _id: newUser._id,
        username: newUser.username,
        status: newUser.status,
        loggedIn: newUser.loggedIn
    })
})

app.post("/login", (req, res)=> {
    console.log("[POST] /login => please don't mess out your authentication");
    const {username, password} = req.body
    const auth = users.find(user => {
        return user.username === username && user.password === password
    })

    // send de user's data and status without password frontend
    if(auth){
        return res.json({
            _id: auth._id,
            username: auth.username,
            status: auth.status,
            loggedIn: auth.loggedIn
        })
    }
    else{
        return res.json({
            error: 'Failed to login, wrong credentials, try again.',
            // status: "failed",
            loggedIn: false
        })
    }

})


const PORT = 5000

app.listen(PORT, () => {
    console.log(`API has started successfully on PORT ${PORT} 💪`);
    console.log('http://localhost:5000');
})