const express = require("express");
const app = express();
const cors = require("cors");
const { response } = require("express");

let users = [
    { _id: "u1", username: "user1", password: "pw1"},
    { _id: "u2", username: "user2", password: "pw2"},
    { _id: "u3", username: "user3", password: "pw3"},
]

app.use(express.json());
app.use(cors());



//* Define a POST route: /signup
app.post("/signup", (request, response)=> {
console.log("want some more users?");
// response.json({ message: 'user signed up successfully...' })

const signupNew = {_id: Date.now().toString(),...request.body};
users.push(signupNew);
response.json(request.body);
})



//* BONUS: Define a POST route: /login
app.post("/login", (request, response)=> {
    console.log("logging in now...")

const {username, password} = request.body;

const certifiedUser = users.find(user => user.username === username && user.password === password);

    if (!certifiedUser) {
    console.log("log in failed");
    response.json({alert: "invalid user"});
    } else {
    console.log("logged in");
    return response.json(request.body)}

})



//* Create a GET route: /users
app.get("/users", (request, response)=> {
console.log("users summoned");
response.json(users)
})








app.listen(5000, ()=> {
    console.log("http://localhost:5000/users")
})