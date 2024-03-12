const express = require('express');
const multer = require('multer');
const cors=require('cors');


const app = express();
const PORT = 3000;
var allowlist = ['http://localhost:3002', 'http://localhost:3001']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } 
  } else {
    corsOptions = { origin: false } 
  }
  callback(null, corsOptions) 
}
app.use(cors(corsOptionsDelegate))
app.use(express.json())
const { Pool } = require('pg');

// Create a pool instance
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'collector',
  password: 'Dhruv@2001',
  port: 5432, // Default port for PostgreSQL
});

// Example query
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Query result:', res.rows);
  }
});

app.get('/api/saveData/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const query = 'SELECT * FROM employee WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(result.rows[0]); // Return the first (and only) row
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

app.post('/api/saveData', async (req, res) => {
  
  try {
    
    const { id, firstName, lastName, dob, role,salary } = req.body; // Extract variables from req.body

    const query = 'INSERT INTO employee (id, first_name, last_name, dob, role, salary) VALUES ($1, $2, $3, $4, $5, $6)';
    await pool.query(query, [id, firstName, lastName, dob, role,salary]);

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data' });
  }
});

app.get('/api/saveData', async (req, res) => {
  try {
    const query = 'SELECT * FROM employee';
    const result = await pool.query(query);
  
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

app.delete('/api/saveData/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const query = 'DELETE FROM employee WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(204).json(); // Return success with no content
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ message: 'Error deleting data' });
  }
});


app.get('/', (req, res) => {
  res.send('Hello World')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
