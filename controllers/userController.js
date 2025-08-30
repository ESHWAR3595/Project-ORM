const { User } = require('../models');

// Create a new user (POST)
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, age } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        error: 'firstName, lastName, and email are required fields'
      });
    }

    // Create user in database using Sequelize
    const user = await User.create({
      firstName,
      lastName,
      email,
      age: age || null // age is optional
    });

    // Return success response
    res.status(201).json({
      message: 'User created successfully!',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Error creating user:', error);
    
    // Handle unique constraint errors (like duplicate email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: 'Email already exists'
      });
    }
    
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};

// Get all users (GET)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']] // newest first
    });
    
    res.status(200).json({
      message: 'Users retrieved successfully',
      count: users.length,
      users: users
    });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};

module.exports = {
  createUser,
  getAllUsers
};
