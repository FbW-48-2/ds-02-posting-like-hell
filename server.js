const { response } = require("express")
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

let users = [
    { _id: "u1", username: "user1", password: "pw1" },
    { _id: "u2", username: "user2", password: "pw2" },
    { _id: "u3", username: "user3", password: "pw3" },
]

app.use(express.json()) //parse all incoming body data 

app.listen(5000, () => {
    console.log("API has started successfully on PORT 5000")
})


app.get("/users", (req, res) => {
    res.json(users)
})

app.post("/signup", (req, res) => {
    console.log(req.body)
    res.json(req.body)
    let newUser = { ...req.body, _id: Date.now().toString() }
    users.push(newUser)

})

app.post("/login", (req, res) => {
    const { username } = req.body
    const { password } = req.body


    const matchedName = users.find(item => item.username === username)
    const matchedPassword = users.find(item => item.password === password)

    if (matchedName && matchedPassword) {
        return res.json(matchedPassword)
    } else {
        return res.json({
            error: "Failed login! Sign up first!"
        })
    }

})

