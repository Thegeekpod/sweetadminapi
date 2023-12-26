const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbconfig = require('../../config/dbconfig.js');
const Admin = require('../../models/admin/adminModel.js');

const login = async (req, res) => {
  const { username, password } = req.body;

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
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === 'production',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

module.exports = { login, logout };
