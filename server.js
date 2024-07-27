const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 5433;

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'finances',
  password: '',
  port: 5432,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST endpoint to receive form data
app.post('/submitRequest', async (req, res) => {
  const { firstname, lastname, email, service, details } = req.body;
  try {
    const query = 'INSERT INTO customer_requests(firstname, lastname, email, service, details) VALUES($1, $2, $3, $4, $5)';
    const values = [firstname, lastname, email, service, details];

    // Insert form data into the PostgreSQL database
    await pool.query(query, values);

    res.send('Request submitted successfully.');
  } catch (error) {
    console.error('Error submitting request:', error);
    res.status(500).send('Failed to submit request.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});