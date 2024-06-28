 // Example: users.js
const User = require('../model/User');

// Get all users
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user details
router.put('/users/:id', isAdmin, async (req, res) => {
  try {
    const { username } = req.body;
    await User.findByIdAndUpdate(req.params.id, { username });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Disable user account
router.put('/users/:id/disable', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { disabled: true });
    res.json({ message: 'User disabled successfully' });
  } catch (error) {
    console.error('Error disabling user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
