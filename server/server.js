import express, { response } from 'express';     
import cors from 'cors';
const app = express();
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'data/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();

if (!db.data) db.data = { users: [] };

app.use(express.json());
app.use(cors());



//* SIGN UP a NEW USER
app.post("/signup", async (request, response)=> {
console.log("new user signing up!");

let signupNew = {id: uuidv4(), ...request.body};

if(!request.body.username) {
    return response.json(
       {error: "what do you want? bring some data or go away"} 
    )
}

const duplicate = db.data.users.find(user => user.username === request.body.username)

if (duplicate){
    return response.json(
       {error: `${request.body.username} is already taken, sorry`} 
    )
}

db.data.users.push(signupNew);
await db.write();
response.json(signupNew);
})



//* USER LOGIN
app.post("/login", (request, response)=> {
    console.log("logging in now...")

const {username, password} = request.body;

const certifiedUser = db.data.users.find(user => user.username === username && user.password === password);

    if (!certifiedUser) {
    console.log("log in failed");
    response.json("invalid user");
    } else {
    console.log("logged in");
    response.json(certifiedUser)
    }
})



//* GET ALL USERS
app.get("/users", (request, response)=> {
console.log("users summoned");
response.json(db.data.users)
})

//* get single user by ID
app.get("/users/:id", (request, response)=> {

    const userSelected =  db.data.users.find(user => user.id === request.params.id);
    
    if(!userSelected) response.json({error: `no user found under ID ${request.params.id}`})
    response.json(`we found ${userSelected.username}`)
})


//* UPDATE USER INFO
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const userPut = db.data.users.find((user) => user.id === id);
    if (!userPut) res.json({ error: `No user found: ID: ${id}` });
  
    Object.assign(userPut, newData, {id});
    db.write();

    res.json({done: `${newData.username}'s info has been updated`});
    res.json(userPut);
  });


//* delete a user
app.delete('/users/:id', (request, response)=> {
    
    const userIndex = db.data.users.findIndex((user)=> user.id === request.params.id);
    if(userIndex === -1) response.json({error: `No record found: ID ${request.params.id}`});
    else {
        db.data.users.splice(userIndex, 1);
        db.write();
        response.json({Done: ID `${request.params.id} has been deleted`});
    }
      
})




app.listen(4000, ()=> {
    console.log("http://localhost:4000/users")
})