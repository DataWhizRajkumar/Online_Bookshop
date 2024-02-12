const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Configure your PostgreSQL connection
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Enable CORS for specific origins
app.use(cors());

app.use(bodyParser.json());

// Create users table if it does not exist
async function createUsersTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
}

// API endpoint for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("USERNAME", username);
  console.log("PASSWORD", password);

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    console.log(result)
    if (result.rows.length === 1) {
      // Successful login
      res.json({ success: true, message: 'Login successful', user: { username } }); // Sending only username for security reasons
    } else {
      // Incorrect username or password
      res.status(401).json({ success: false, message: 'Incorrect username or password' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint for creating a user
app.post('/create-user', async (req, res) => {
  const { username, password } = req.body;
  console.log("USERNAME", username);
  console.log("PASSWORD", password);
  try {
    // Check if the user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (existingUser.rows.length > 0) {
      res.status(409).json({ success: false, message: 'User already exists' });
    } else {
      // Create the user
      await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
      res.status(201).json({ success: true, message: 'User created successfully' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(PORT, async () => {
  await createUsersTable();
  console.log(`Server is running on http://localhost:${PORT}`);
});
