import express from "express";
import cors from "cors";
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { v4 as uuid } from "uuid";


// * BASIC SETUP * //

const app = express();
const PORT = 5000

app.listen(PORT, ()=>{
  console.log(`API has started successfully on Port${PORT}`);
});


// * MIDDLEWARE * //

app.use( express.json() );
app.use( cors() );


// * LOWDB SETUP * //

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'data/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

db.data = db.data || { users: [] };
 

// * LOCAL DATABASE * //

// let users = [
//   { _id: "u1", username: "user1", password: "pw1"},
//   { _id: "u2", username: "user2", password: "pw2"},
//   { _id: "u3", username: "user3", password: "pw3"},
// ]


// * ENDPOINTS * //

app.get("/", (req, res)=>{
  res.send(`<h1>/</h1>
  <p><a href="/login">/login</a></p>
  <p><a href="/signup">/signup</a></p>
  <p><a href="/users">/users</a></p>`)
})

// app.post("/signup", (req, res)=>{
//   console.log(req.body);
//   const newUser = {_id: ""+Date.now(), ...req.body}
//   users.push(newUser)
//   res.json(users)
// });

// app.get("/users", (req, res)=>{
//   res.json(users);
// });

app.post("/login", (req, res)=>{
  const foundUser = db.data.users.find(user=>user.username === req.body.username && user.password === req.body.password);
  foundUser ? res.json(foundUser) : res.json({error: "User not found. Login failed!"});
});

app.post("/signup", (req, res)=>{
  const newUser = {_id: uuid(), username: req.body.username, password: req.body.password}
  const userNameCheck = db.data.users.find(user=>user.username === newUser.username);
  if(!userNameCheck){
    db.data.users.push(newUser);
    db.write();
    res.json(newUser);
  } else {
    res.json({error: "Username already taken!"});
  }
});