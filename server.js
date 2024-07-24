const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 5432;

// Connect to your PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'finances',
  // password: 'yourPassword',
  port: 5432,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('http://localhost:5432/submitRequest', async (req, res) => {
  const { firstname, lastname, email, service, details } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customer_requests(firstname, lastname, email, service, details) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [firstname, lastname, email, service, details]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
