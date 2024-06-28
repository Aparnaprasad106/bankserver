require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db/connection')
const router = require('./Routes/router')
const app = express();

const PORT = 4000 || process.env.PORT
app.use(cors());
app.use(express.json());
app.use(router)

// Routes
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/users');
const transactionRoutes = require('./Routes/transactions');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () =>{
   console.log(`Server running on port ${PORT}`);
})
app.get('/',(req,res)=>{
  res.send("BANK SERVER STARTED")
})
