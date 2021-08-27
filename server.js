import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

// package to create ids
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, '/data/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Read data from JSON file, this will set db.data content
await db.read()

// If file.json doesn't exist, db.data will be null
// Set default data
db.data ||= { users: [] }
const { users } = db.data

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

app.post("/signup", async (req, res)=> {
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

    const newUser= { 
        ...req.body, 
        _id: uuidv4(), 
        // status: "success", 
        loggedIn: true 
    }
    users.push(newUser)
    // res.json({ message: 'User signed up successfully...' })

    await db.write()

    // send de user's data and status without password to the frontend
    res.json({
        _id: newUser._id,
        username: newUser.username,
        // status: newUser.status,
        loggedIn: newUser.loggedIn
    })
})

app.post("/login", async (req, res)=> {
    console.log("[POST] /login => please don't mess out your authentication");
    const {username, password} = req.body
    const auth = users.find(user => {
        return user.username === username && user.password === password
    })


    if(auth){
        // send de user's data and status without password to the frontend and update database
        Object.assign(auth, { loggedIn: true})
        await db.write()
        return res.json({
            _id: auth._id,
            username: auth.username,
            // status: auth.status,
            loggedIn: true
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

app.put("/users/:id", (req, res) => {
    console.log("[PUT] update user by id");
    const { id } = req.params;
    const newData = req.body 
    const findUser = users.find(user => user._id === id)
    Object.assign(findUser, newData )
    db.write()
    res.json(findUser)
})



app.listen(PORT, () => {
    console.log(`API has started successfully on PORT ${PORT} 💪`);
    console.log('http://localhost:5000');
})