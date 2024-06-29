require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db/connection');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/users');
const transactionRoutes = require('./Routes/transactions');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send("BANK SERVER STARTED");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
