const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Connection string for MongoDB
const dbConnectUrl = 'mongodb+srv://<cosmas001>:<GU6BIhBRkoshVU7c>@cluster0.8ehdgpg.mongodb.net/?retryWrites=true&w=majority';

// Database connection
const client = new MongoClient(dbConnectUrl, { useNewUrlParser: true, useUnifiedTopology: true });

async function dbConnect() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

dbConnect();

app.use(express.json());

app.post('/login', async (req, res) => {
  try {
    const userInfo = client.db('<database-name>').collection('<collection-name>');

    // Check if email exists
    const user = await userInfo.findOne({ email: req.body.email });
    if (!user) {
      // Email does not exist
      return res.status(400).send({
        message: 'Email does not exist',
      });
    }

    // Compare passwords
    const passwordCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCheck) {
      // Incorrect password
      return res.status(400).send({
        message: 'Password is incorrect',
      });
    }

    // Create a token
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      "RANDOM-TOKEN",
      {
        expiresIn: "1h",
      }
    );

    // Send the token
    return res.status(200).send({
      message: 'Login successful',
      email: user.email,
      token: token,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'An error occurred while logging in',
      error: error,
    });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
