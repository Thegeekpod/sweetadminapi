// authMiddleware.js

import jwt from 'jsonwebtoken';
import dbconfig from '../config/dbconfig.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'].replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Token not provided' });

  jwt.verify(token, dbconfig.jwtSecret, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.adminId = decoded.id;
    next();
  });
};

export const checkLogin = (req, res, next) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzAzNTI4NDgzLCJleHAiOjE3MDM1MzIwODN9.N8yWi5cmcNy82puctWoT7GdvjR-eN4glVj23Ia94sjM';
console.log(token)
  if (!token) {
    // Redirect to login page if token is not provided
    return res.redirect('/auth-login');
  }

  jwt.verify(token, dbconfig.jwtSecret, (err, decoded) => {
    if (err) {
      console.error(err);
      // Redirect to login page for invalid tokens
      return res.redirect('/auth-login');
    }

    // If everything is valid, you might want to store the user information in the request
    req.userId = decoded.id;
    // Or perform any other necessary actions based on the logged-in user
console.log(req.userId)
    next();
  });
};
