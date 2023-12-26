const jwt = require('jsonwebtoken');
const dbconfig = require('../config/dbconfig.js');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'].replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Token not provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.adminId = decoded.id;
    next();
  });
};



module.exports = { verifyToken };
