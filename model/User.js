// User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  balance: { type: Number, default: 0 },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});
module.exports = mongoose.model('User', userSchema);