import express from 'express';
import cors from 'cors'
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 5000

// LOWDB SETUP
const __dirname = dirname(fileURLToPath(import.meta.url));
// Use JSON file for storage
const file = join(__dirname, 'data/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
// Read data from JSON file, this will set db.data content
await db.read()
// If file.json doesn't exist, db.data will be null
// Set default data

if(!db.data) db.data = { users: [] }

// let users = [
//   { _id: "u1", username: "user1", password: "pw1"},
//   { _id: "u2", username: "user2", password: "pw2"},
//   { _id: "u3", username: "user3", password: "pw3"},
// ]

app.use( express.json() )
app.use( cors() )

app.post("/signup", async (req, res) => {
  console.log("[POST] /signup called")
  let user = {
    _id: Date.now().toString(),
    ...req.body
  }
  db.data.users.push( user )
  console.log('USER CREATED!')
  await db.write()
  res.json( user )
})

app.get("/users", (req, res) => {
  console.log("[GET] /users called")

  res.json(users)
})

app.post("/login", (req, res) => {
  console.log("[POST] /login called")
  let { username, password } = req.body
  const userFound = db.data.users.find(user => user.username === username && user.password === password)
  if(!userFound){
    return res.json({ error: "User not found. Login failed!" })
  }
  res.json( userFound )
})


app.listen( 5000, () => {
  console.log('API has started successfully on PORT 5000')
})