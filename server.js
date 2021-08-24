// Add Express and CORS
const express = require("express");
const cors = require("cors");
const app = express();
app.use( cors() );

// Initial array of users
let users = [
    { _id: "u1", username: "user1", password: "pw1"},
    { _id: "u2", username: "user2", password: "pw2"},
    { _id: "u3", username: "user3", password: "pw3"},
];

// Parses incoming POST data
app.use( express.json() );


// Define a POST route
app.post("/signup", (req, res) => {

    console.log(req.body);
    
    // Create new user on request
    let user = {
        _id: Date.now().toString(),
        ...req.body
    };

    // Append new user to users array
    users.push( user );

    
    // Return new user object with res.json()
    res.json( user );
});


// Define a login POST route
app.post("/login", (req, res) => {

    // Use find method to check array of users for single user
    const userFound = users.find( user => user.username === req.body.username && user.password === req.body.password);
    console.log(userFound);

    // Create success and error message
    userFound ? res.json( userFound ) : res.json( { error: "User not found. Login failed" });
});


// Create a GET route
app.get("/users", (req, res) => {
    res.json(users);
});


// Set up the local host
app.listen( 5000, () => {
    console.log("API up and running on PORT 5000");
});