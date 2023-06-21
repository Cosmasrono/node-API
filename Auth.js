const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware function for token verification
const authMiddleware = async (request, response, next) => {
  try {
    // Get the token from the authorization header
    const token = request.headers.authorization.split(" ")[1];

    // Check if the token matches the expected origin and decode it
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");

    // Retrieve the user details of the logged-in user
    const user = decodedToken;

    // Pass the user down to the endpoints
    request.user = user;

    // Pass down control to the next middleware or endpoint
    next();
    
  } catch (error) {
    response.status(401).json({
      error: "Invalid request!",
    });
  }
};

// Example protected endpoint
app.get('/protected', authMiddleware, (req, res) => {
  // Access the authenticated user via req.user
  console.log(req.user);
  res.send('Protected endpoint');
});

// Example login endpoint
app.post('/login', (req, res) => {
  // Perform authentication logic
  // ...

  // If authentication is successful, generate a token
  const token = jwt.sign(
    {
      email: req.body.email,
      userId: 'user123', // Example user ID
    },
    "RANDOM-TOKEN",
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    message: 'Login successful',
    token: token,
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
