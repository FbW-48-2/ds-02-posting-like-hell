// Add Express and CORS
import express from "express";
import cors from "cors";
const app = express();
const port = 5000
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid';
// --------------------------------------------------


// LOWDB SETUP
const __dirname = dirname(fileURLToPath(import.meta.url));
// Use JSON file for storage
const file = join(__dirname, 'data/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
// Read data from JSON file, this will set db.data content
await db.read()
// Set default data
db.data ||= { users: [] }
// --------------------------------------------------


// Express and CORS middleware
app.use( express.json() );
app.use( cors() );


// Initial array of users
// let users = [
//     { _id: "u1", username: "user1", password: "pw1"},
//     { _id: "u2", username: "user2", password: "pw2"},
//     { _id: "u3", username: "user3", password: "pw3"},
// ];


// Define a POST route
app.post("/signup", async (req, res) => {

    console.log(req.body);
    
    // Create new user on request
    let user = {
        _id: uuidv4(),
        ...req.body
    };

    // Append new user to users array
    db.data.users.push(user)

    // db.write() creates and adds the object to a json file
    await db.write();

    // Return new user object with res.json()
    res.json( user );
});


// Define a login POST route
app.post("/login", (req, res) => {

    // Use find method to check array of users for single user
    const userFound = db.data.users.find( user => user.username === req.body.username && user.password === req.body.password);
    console.log(userFound);

    // Create success and error message
    userFound ? res.json( userFound ) : res.json( { error: "User not found. Login failed" });
});


// Create a GET route
app.get("/users", (req, res) => {
    res.json(db.data.users);
});

// GET one user
app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = db.data.users.find(user => user._id === id)

    res.json(user)
})


// Set up the local host
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })