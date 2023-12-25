import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbconfig from '../../config/dbconfig.js';
import Admin from '../../models/admin/adminModel.js';

export const login = async (req, res) => {
    const { username, password } = req.body;
  
    // Check if username or password is missing in the request body
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      const admin = await Admin.getAdminByUsername(username);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: admin.id }, dbconfig.jwtSecret, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly: true, // Ensures the cookie is only accessible via HTTP(S) and not client-side JavaScript
        maxAge: 3600000, // Expires in 1 hour (in milliseconds)
        secure: process.env.NODE_ENV === 'production', // Set to true in production to send cookies over HTTPS only
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

export const logout = (req, res) => {
  // Optionally, clear session data or JWT token in the client-side
  res.json({ message: 'Logged out successfully' });
};
