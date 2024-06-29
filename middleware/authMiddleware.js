const jwt = require('jsonwebtoken');
const User = require('../model/User');

const isAdmin = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have JWT_SECRET in your .env file
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    if (user.role !== 'admin') { // Assuming the User model has a 'role' field
      return res.status(403).json({ message: 'Unauthorized' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate as admin.' });
  }
};

module.exports = isAdmin;
