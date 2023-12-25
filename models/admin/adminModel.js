import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
// import dbconfig from '../../config/dbconfig.js';

const dbconfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sweetadmin',
  jwtSecret: 'your_jwt_secret'
};
const pool = mysql.createPool(dbconfig);


const Admin = {
  async addNewAdmin(username, plaintextPassword, email) {
    const hashedPassword = await bcrypt.hash(plaintextPassword, 10);

    const connection = await pool.getConnection();
    try {
      await connection.query(
        'INSERT INTO admins (username, password, email) VALUES (?, ?, ?)',
        [username, hashedPassword, email]
      );
    } finally {
      connection.release();
    }
  },

  async getAdminByUsername(username) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM admins WHERE username = ?', [username]);
      return rows[0];
    } finally {
      connection.release();
    }
  },

  async getAdminById(adminId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM admins WHERE id = ?', [adminId]);
      return rows[0];
    } finally {
      connection.release();
    }
  },
};

// const DummyData = {
//   async insertDummyData() {
//     const dummyAdmins = [
//       { username: 'admin1', password: 'password1', email: 'admin1@example.com' },
//       { username: 'admin2', password: 'password2', email: 'admin2@example.com' },
//       // Add more dummy admin data as needed
//     ];

//     for (const admin of dummyAdmins) {
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
  export default Admin;