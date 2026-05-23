import express from 'express'
import cors from 'cors'
import {
  getUsers,
  getUser,
  createUser,
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from './database.js'

const app = express()

app.use(cors())
app.use(express.json())

// USERS
app.get("/users", async (req, res) => {
  res.json(await getUsers())
})

app.get("/users/:id",async (req,res) => {
    const id = req.params.id
    const user = await getUser(id)
    res.send(user)
})
app.post("/users",async (req,res) => {
    const {name ,email,password} = req.body
    const user = await createUser(name,email,password)
    res.status(201).send(user)

})

// RESTAURANTS
app.get("/restaurants", async (req, res) => {
  res.json(await getRestaurants())
})

app.get("/restaurants/:id", async (req, res) => {
  res.json(await getRestaurant(req.params.id))
})

app.post("/restaurants", async (req, res) => {
  const { name, contact, address, owner, rating } = req.body
  const data = await createRestaurant(name, contact, address, owner, rating)
  res.status(201).json(data)
})

app.put("/restaurants/:id", async (req, res) => {
  const { name, contact, address, owner, rating } = req.body
  const data = await updateRestaurant(req.params.id, name, contact, address, owner, rating)
  res.json(data)
})

app.delete("/restaurants/:id", async (req, res) => {
  await deleteRestaurant(req.params.id)
  res.json({ message: "Deleted" })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


app.get("/login", async (req, res) => {

    const { email, password } = req.query

    const users = await getUsers()

    // CHECK EMAIL
    const user = users.find(
        u => u.email === email
    )

    if(!user){
        return res.status(404).json({
            message: "Email does not exist"
        })
    }

    // CHECK PASSWORD
    if(user.password !== password){
        return res.status(401).json({
            message: "Wrong password"
        })
    }

    // LOGIN SUCCESS
    res.status(200).json(user)
})

app.listen(5000, () => {
  console.log("Server running on 5000")
})