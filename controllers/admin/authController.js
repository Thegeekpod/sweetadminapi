const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const viewProfile = async (req, res) => {
  try {
    const adminId = req.adminId; // Extracted from JWT verification
    const admin = await Admin.getAdminById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    // Omit sensitive data if needed before sending the response
    const { password, ...profileDetails } = admin;
    res.json(profileDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const authchecker = async (req, res) => {
  try {
    const token = req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : null;
    if (!token) {
      return res.status(401).json({ response:'false',message: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).json({response:'false', message: 'Invalid token' });
      }
      return res.status(200).json({response:'true', message: 'Token is valid' });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  // Assuming you're using cookies for storing the token
  res.clearCookie('token'); // Clear the token cookie

  // Generate a new token with a very short expiration time (e.g., a few seconds)
  const shortExpiryToken = jwt.sign({ expired: true }, 'your_secret_key', { expiresIn: 10 }); // 10 seconds expiration

  res.json({ success: true, message: 'Logged out successfully', shortExpiryToken });
};

module.exports = { login, logout,viewProfile,authchecker };
