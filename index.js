const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const userRoute = require("./routes/userroute")
const moviesRoute = require("./routes/movieroute")
const billsRoute = require("./routes/billroute")
const profileRoute = require("./routes/profileroute")
const cors = require("cors")

const app = express()
const PORT = 5000


app.use(express.json())
app.use(cors({
    origin: "https://movie-booking-frontend-theta.vercel.app", 
    credentials: true,
  }))


app.get('/',(req,res)=>{
    res.send("Welcome to Movie tickets booking app")
})

app.use("/users",userRoute)
app.use("/movies",moviesRoute)
app.use("/bills",billsRoute)
app.use("/Profile",profileRoute)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Mongoose is Connected")
    app.listen(PORT,()=>console.log(`Server connected on the PORT ${PORT}`))
}).catch((error)=>{
    console.log(error.message)
})