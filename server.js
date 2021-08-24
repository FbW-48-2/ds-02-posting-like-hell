const express = require('express')

const app = express()

// middlewares +++++++++++++++++++++++++

app.use( express.json() )

//  ++++++++++++++++++++++++++++++++++++
let users = [
    { _id: "u1", username: "user1", password: "pw1" },
    { _id: "u2", username: "user2", password: "pw2" },
    { _id: "u3", username: "user3", password: "pw3" },
]

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
    // console.log(req.body);
    const { username, password } = req.body

    const findUser = users.find(user => {
        return user.username === username
        ||
        user.password === password
    })

   if(findUser){
        return res.json({
            error: `Username  or password already exist, push your brain and figure out a something new`
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

    const newUser= { ...req.body, id: Date.now().toString() }
    users.push(newUser)
    // res.json({ message: 'User signed up successfully...' })

    res.json(newUser)
})


const PORT = 5000

app.listen(PORT, () => {
    console.log(`API has started successfully on PORT ${PORT} 💪`);
    console.log('http://localhost:5000');
})