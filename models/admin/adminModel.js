const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dbconfig = require('../../config/dbconfig.js');

// const dbconfig = {
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'sweetadmin',
//   jwtSecret: 'your_jwt_secret'
// };

const pool = mysql.createPool(dbconfig);

const Admin = {
  async addNewAdmin(username, plaintextPassword, email) {
    const hashedPassword = await bcrypt.hash(plaintextPassword, 10);

    const connection = await pool.getConnection();
    try {
      await connection.query(
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
        [username, hashedPassword, email]
      );
    } finally {
      connection.release();
    }
  },

  async getAdminByUsername(username) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0];
    } finally {
      connection.release();
    }
  },

  async getAdminById(adminId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [adminId]);
      return rows[0];
    } finally {
      connection.release();
    }
  },
};

// const DummyData = {
//   async insertDummyData() {
//     const dummyusers = [
//       { username: 'admin1', password: 'password1', email: 'admin1@example.com' },
//       { username: 'admin2', password: 'password2', email: 'admin2@example.com' },
//       // Add more dummy admin data as needed
//     ];

//     for (const admin of dummyusers) {
//       await Admin.addNewAdmin(admin.username, admin.password, admin.email);
//     }
//   },
// };

// // Usage
// async function initializeDatabase() {
//   // Initialize database setup
//   // Run any migrations or setup steps if needed

//   // Insert dummy data
//   await DummyData.insertDummyData();
// }

// // Run the initialization function
// initializeDatabase()
//   .then(() => {
//     console.log('Database initialized with dummy data.');
//     // Any additional logic or actions after initialization
//   })
//   .catch((error) => {
//     console.error('Error initializing database:', error);
//   });

module.exports = Admin;
