import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(express.json());

app.post('/logs', async (req, res) => {
  try {
    const { json } = req.body;
    const result = await pool.query(
      'INSERT INTO log (json) VALUES ($1) RETURNING *',
      [json]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM log ORDER BY inserted_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
