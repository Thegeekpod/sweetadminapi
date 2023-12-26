const jwt = require('jsonwebtoken');
const dbconfig = require('../config/dbconfig.js');

const verifyToken = (req, res, next) => {
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

const checkLogin = (req, res, next) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzAzNTI4NDgzLCJleHAiOjE3MDM1MzIwODN9.N8yWi5cmcNy82puctWoT7GdvjR-eN4glVj23Ia94sjM';
  console.log(token);
  
  if (!token) {
    return res.redirect('/auth-login');
  }

  jwt.verify(token, dbconfig.jwtSecret, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.redirect('/auth-login');
    }

    req.userId = decoded.id;
    console.log(req.userId);
    next();
  });
};

module.exports = { verifyToken, checkLogin };
