import express from "express";
import cors from 'cors'
const app = express();
let PORT = 5000

import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "data/db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();
db.data = db.data || { users: [] }

app.use( express.json() )
app.use( cors() )


app.post('/signup', async (req, res) => {
    // console.log(req.body.name)
    let user = {
        _id: uuidv4(),
        username: req.body.username,
        password: req.body.password
    }
    const { username } = req.body

    const existingUsername = db.data.users.find(user => user.username === username)

    if(existingUsername){
        return res.json({error: "already existing username"})
    }
    
    db.data.users.push(user)
    await db.write()
    res.json(user)
})


app.post('/login', (req, res)=>{
    const { username } = req.body
    const { password } = req.body
    const corrName = db.data.users.find(user => user.username === username)
    const corrPw = db.data.users.find(user => user.password === password)
    
    console.log(corrName)

    if(!corrName || !corrPw){
        return res.json({error: 'sorry. please sign up before login'})
    }
    res.json({succ: 'you are logged in'})

})

app.get('/users', (req, res) => {
    const users = db.data.users
    res.json(users)
})


app.listen(PORT, ()=> {
    console.log(`listening to port ${PORT}`)
})