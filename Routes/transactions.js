// Example: transactions.js
const Transaction = require('../model/Transaction');
const User = require('../model/User');

// Deposit
router.post('/deposit', async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);

    // Update user's balance
    user.balance += amount;
    await user.save();

    // Record transaction
    const newTransaction = new Transaction({
      userId: req.user.id,
      type: 'deposit',
      amount
    });
    await newTransaction.save();

    res.json({ message: 'Deposit successful' });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Withdrawal
router.post('/withdraw', async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);

    // Validate withdrawal amount
    if (amount > user.balance) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update user's balance
    user.balance -= amount;
    await user.save();

    // Record transaction
    const newTransaction = new Transaction({
      userId: req.user.id,
      type: 'withdrawal',
      amount
    });
    await newTransaction.save();

    res.json({ message: 'Withdrawal successful' });
  } catch (error) {
    console.error('Withdrawal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
