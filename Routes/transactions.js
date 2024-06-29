const express = require('express');
const router = express.Router();
const Transaction = require('../model/Transaction');
const User = require('../model/User');

// Transaction handling logic

// Get transaction history
router.get('/history', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Deposit money
router.post('/deposit', async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.balance += amount;
    await user.save();

    const transaction = new Transaction({
      userId: req.user.id,
      type: 'deposit',
      amount,
      date: new Date()
    });
    await transaction.save();

    res.json({ message: 'Deposit successful', balance: user.balance });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// transaction

router.post('/transfer', async (req, res) => {
  try {
    console.log(req.body);
    const { recipient, amount } = req.body;
    const senderId = req.user.id; // Assuming you have authenticated user ID in req.user.id

    // Find sender and recipient users
    const sender = await User.findById(senderId);
    const receiver = await User.findOne({ username: recipient });

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'Sender or receiver not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update sender's balance
    sender.balance -= amount;
    await sender.save();

    // Update receiver's balance
    receiver.balance += amount;
    await receiver.save();

    // Record transaction
    const transaction = new Transaction({
      sender: sender.username,
      receiver: receiver.username,
      amount
    });
    await transaction.save();

    res.json({ message: 'Transfer completed successfully' });
  } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


// withdraw
router.post('/withdraw', async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id; // Assuming you have authenticated user ID in req.user.id

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update user's balance
    user.balance -= amount;
    await user.save();

    // Record transaction
    const transaction = new Transaction({
      sender: user.username,
      amount,
      type: 'withdrawal'
    });
    await transaction.save();

    res.json({ message: 'Withdrawal completed successfully' });
  } catch (error) {
    console.error('Withdrawal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
