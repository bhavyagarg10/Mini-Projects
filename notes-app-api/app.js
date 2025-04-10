require("dotenv").config();

const cors=require('cors')
const express=require("express")

// const mongoose = require("mongoose")

const connectdb=require("./config/db")

const app=express()

const authRoutes=require('./routes/authRoutes');
const noteRoutes=require('./routes/noteRoutes');

connectdb();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/notes',noteRoutes);

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})