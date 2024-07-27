const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 5433;

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

// POST endpoint to receive form data and query the database
app.post('/getRequest', async (req, res) => {
  const { firstname, lastname, email, service } = req.body;
  try {
    const query = 'SELECT * FROM customer_requests WHERE firstname = $1 AND lastname = $2 AND email = $3 AND service = $4';
    const values = [firstname, lastname, email, service];

    // Query the PostgreSQL database
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error('Error querying request:', error);
    res.status(500).send('Failed to query request.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});