import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import cors from 'cors';
import express from 'express';
import mysql2 from 'mysql2';
const app = express();
const PORT = 3000;

// MySQL database configuration
let dbConfig;
if (process.env.DATABASE_URL) {
  dbConfig = process.env.DATABASE_URL;
} else {
  dbConfig = {
    host: '127.0.0.1',
    user: 'username',
    password: 'password',
    database: 'db_name',
    port: 3307
  }
}
const db = mysql2.createConnection(dbConfig);

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors());


// Create a new resource
app.post('/:resource',ClerkExpressRequireAuth(), (req, res) => {
  const { resource } = req.params;
  const data = req.body;
  const sql = `INSERT INTO ${resource} SET ?`;
  db.query(sql, data, (err, result) => {
    if (err) {
      console.error(`Error creating ${resource}:`, err);
      res.status(500).json({ error: `Error creating ${resource}` });
      return;
    }
    res.status(201).json({ message: `${resource} created successfully`, id: result.insertId });
  });
});

// Read all resources
app.get('/:resource',ClerkExpressRequireAuth(),(req, res) => {
  const { resource } = req.params;
  const sql = `SELECT * FROM ${resource}`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(`Error fetching ${resource}:`, err);
      res.status(500).json({ error: `Error fetching ${resource}` });
      return;
    }
    res.json(results);
  });
});

// Read a single resource by id
app.get('/:resource/:id',ClerkExpressRequireAuth(), (req, res) => {
  const { resource, id } = req.params;
  const sql = `SELECT * FROM ${resource} WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(`Error fetching ${resource}:`, err);
      res.status(500).json({ error: `Error fetching ${resource}` });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: `${resource} not found` });
      return;
    }
    res.json(result[0]);
  });
});

// Update a resource
app.put('/:resource/:id',ClerkExpressRequireAuth({}), (req, res) => {
  const { resource, id } = req.params;
  const data = req.body;
  const sql = `UPDATE ${resource} SET ? WHERE id = ?`;
  db.query(sql, [data, id], (err, result) => {
    if (err) {
      console.error(`Error updating ${resource}:`, err);
      res.status(500).json({ error: `Error updating ${resource}` });
      return;
    }
    res.json({ message: `${resource} updated successfully` });
  });
});

// Delete a resource
app.delete('/:resource/:id',ClerkExpressRequireAuth({}), (req, res) => {
  const { resource, id } = req.params;
  const sql = `DELETE FROM ${resource} WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(`Error deleting ${resource}:`, err);
      res.status(500).json({ error: `Error deleting ${resource}` });
      return;
    }
    res.json({ message: `${resource} deleted successfully` });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
