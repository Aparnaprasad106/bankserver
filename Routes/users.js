const express = require('express');
const router = express.Router();
const User = require('../model/User');
const isAdmin = require('../middleware/authMiddleware'); // Import the isAdmin middleware

// Get all users
router.get('/', isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ balance: user.balance });
  } catch (error) {
    console.error('Fetch balance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Disable user account
router.put('/:id/disable', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.disabled = true;
    await user.save();
    res.json({ message: 'User disabled successfully' });
  } catch (error) {
    console.error('Error disabling user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
