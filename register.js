const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

// Register endpoint
app.post('/register', (req, res) => {
  // Hashing the password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      // Handle error during password hashing
      res.status(500).send({
        message: 'An error occurred while hashing the password',
        error: err,
      });
    } else {
      // Create a new user
      const user = new User({
        email: req.body.email,
        password: hash, // Use the hashed password
      });

      // Save the user
      user.save()
        .then((result) => {
          res.status(201).send({
            message: 'User created successfully',
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Failed to save user',
            error: err,
          });
        });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
