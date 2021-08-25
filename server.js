const express = require("express");
const cors = require('cors')

const app = express();



let users = [
  { _id: "u1", username: "user1", password: "pw1" },
  { _id: "u2", username: "user2", password: "pw2" },
  { _id: "u3", username: "user3", password: "pw3" },
];


app.use( express.json() )
app.use( cors() )


app.post('/signup', (req, res) => {
    console.log(req.body.name)
    let user = {
        _id: Date.now().toString(),
        username: req.body.username,
        password: req.body.password
    }
    const { username } = req.body

    const existingUsername = users.find(user => user.username === username)

    if(existingUsername){
        return res.json({error: "already existing username"})
    }
    
    users.push(user)

    res.json(user)
})

app.post('/login', (req, res)=>{
    const { username } = req.body
    const { password } = req.body
    const corrName = users.find(user => user.username === username)
    const corrPw = users.find(user => user.password === password)
    
    console.log(corrName)

    if(!corrName || !corrPw){
        return res.json({error: 'sorry. please sign up before login'})
    }
    res.json({succ: 'you are logged in'})

})

app.get('/users', (req, res) => {
    res.json(users)
})





let PORT = 5000
app.listen(PORT, ()=> {
    console.log(`listening to port ${PORT}`)
})