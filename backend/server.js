const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory user database (replace this with your database implementation)
const users = [];

// Route to handle user sign-up
app.post('/api/signup', async (req, res) => {
  const { wechatName, phoneNumber, password } = req.body;

  console.log('Received sign-up request:', { wechatName, phoneNumber, password });

  // Check if user already exists
  const existingUser = users.find((user) => user.phoneNumber === phoneNumber);
  if (existingUser) {
    console.log('User already exists');
    return res.status(409).json({ message: 'User already exists' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = {
      wechatName,
      phoneNumber,
      password: hashedPassword,
    };

    // Save the new user to the database
    users.push(newUser);

    console.log('User created successfully');
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle user login
app.post('/api/login', async (req, res) => {
  const { phoneNumber, password } = req.body;

  console.log('Received login request:', { phoneNumber, password });

  // Check if user exists
  const user = users.find((user) => user.phoneNumber === phoneNumber);
  if (!user) {
    console.log('Invalid phone number or password');
    return res.status(401).json({ message: 'Invalid phone number or password' });
  }

  try {
    // Compare the provided password with the stored password hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log('Login successful');
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Invalid phone number or password');
      res.status(401).json({ message: 'Invalid phone number or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Serve static files from the build directory
app.use(express.static(path.join('/Users/wwy/Desktop/CloNet/image-tagging/build')));

// Handle requests to the root URL
app.get('/*', (req, res) => {
  res.sendFile(path.join('/Users/wwy/Desktop/CloNet/image-tagging/build', 'index.html'));
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
