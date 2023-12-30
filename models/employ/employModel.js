const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dbconfig = require('../../config/dbconfig.js');

const pool = mysql.createPool(dbconfig)

const addEmploy = async (employData) => {
    const connection = await pool.getConnection();
    try {
        const {
            username,
            name,
            email,
            phoneNumber,
            occupation,
            address,
            password,
            userType
        } = employData;

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Check if the username already exists
        const [existingUser] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            throw new Error('Username already exists');
        }
        const [existingEmail] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingEmail.length > 0) {
            throw new Error('Email already exists');
        }
        const query =
            'INSERT INTO users (username, name, email, phone_number, occupation, address, password, user_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [rows] = await connection.query(query, [
            username,
            name,
            email,
            phoneNumber,
            occupation,
            address,
            hashedPassword,
            userType
        ]);

        return rows.insertId; // Return the ID of the inserted row
    } catch (err) {
        throw new Error(`Failed to add employee: ${err.message}`);
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};
const getEmployees = async () => {
    const connection = await pool.getConnection();
    try {
        const query = 'SELECT * FROM users'; // Adjust the query based on your database schema
        const [rows] = await connection.query(query);
        return rows;
    } finally {
        connection.release();
    }
};
const updateEmploy = async (employId, updatedEmployData) => {
    const connection = await pool.getConnection();
    try {
        const {
            username,
            name,
            email,
            phoneNumber,
            occupation,
            address,
            password,
            userType
        } = updatedEmployData;

        // Check if the employee exists
        const [existingEmploy] = await connection.query('SELECT * FROM users WHERE id = ?', [employId]);

        if (existingEmploy.length === 0) {
            throw new Error('Employee not found');
        }

        // Retrieve the existing employee data
        const [existingData] = existingEmploy;

        // Check for null values in updatedEmployData and retain existing data if value is null
        const updatedUsername = username !== null ? username : existingData.username;
        const updatedName = name !== null ? name : existingData.name;
        const updatedEmail = email !== null ? email : existingData.email;
        const updatedPhoneNumber = phoneNumber !== null ? phoneNumber : existingData.phoneNumber;
        const updatedOccupation = occupation !== null ? occupation : existingData.occupation;
        const updatedAddress = address !== null ? address : existingData.address;

        let hashedPassword = existingData.password; // Initialize with the existing hashed password

        // If a new password is provided and not null, hash it before updating
        if (typeof password !== null) {
            hashedPassword = await bcrypt.hash(password, 10);
        } else {
            hashedPassword = existingData.password;
        }

        const query =
            'UPDATE users SET username=?, name=?, email=?, phoneNumber=?, occupation=?, address=?, password=?, userType=? WHERE id=?';
        const [rows] = await connection.query(query, [
            updatedUsername,
            updatedName,
            updatedEmail,
            updatedPhoneNumber,
            updatedOccupation,
            updatedAddress,
            hashedPassword,
            userType !== null ? userType : existingData.userType,
            employId
        ]);

        return rows.affectedRows > 0; // Returns true if the update was successful
    } catch (err) {
        throw new Error(`Failed to update employee: ${err.message}`);
    } finally {
        connection.release();
    }
};
const deleteEmploy = async (employId) => {
    const connection = await pool.getConnection();
    try {
        // Check if the employee exists before attempting deletion
        const [existingEmploy] = await connection.query('SELECT * FROM users WHERE id = ?', [employId]);

        if (existingEmploy.length === 0) {
            throw new Error('Employee not found');
        }

        const deleteQuery = 'DELETE FROM users WHERE id = ?';
        const [result] = await connection.query(deleteQuery, [employId]);

        return result.affectedRows > 0; // Returns true if deletion was successful
    } catch (err) {
        throw new Error(`Failed to delete employee: ${err.message}`);
    } finally {
        connection.release();
    }
};

module.exports = {
    addEmploy, getEmployees, updateEmploy, deleteEmploy
};