const mongoose = require('mongoose');
const connectionString = process.env.DATABASE;

mongoose.connect(connectionString)
  .then(() => {
    console.log("Atlas connected successfully");
  })
  .catch((error) => {
    console.log('MongoDB connection error: ' + error);
  });
