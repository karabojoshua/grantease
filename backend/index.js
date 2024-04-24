import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import cors from 'cors';
import express from 'express';
import mysql2 from 'mysql2';
const app = express();
const PORT = process.env.PORT || 3000;

// MySQL database configuration
let dbConfig;
if (process.env.DATABASE_URL) {
  dbConfig = process.env.DATABASE_URL;
} else {
  dbConfig = {
    host: process.env.AZURE_MYSQL_HOST,
    user: process.env.AZURE_MYSQL_USER,
    password: process.env.AZURE_MYSQL_PASSWORD,
    database: process.env.AZURE_MYSQL_DATABASE,
    port: process.env.AZURE_MYSQL_PORT,
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


app.get('/user-meta', ClerkExpressRequireAuth(), (req, res) => {
  const userId = req.auth.userId;
  db.query('SELECT * FROM user WHERE userId = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.length === 0) {
      // First user to sign in becomes an admin
      db.query("SELECT COUNT(*) as count FROM user", (err, countResult) => {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        const role = countResult[0].count === 0 ? 'admin' : 'user';
        db.query('INSERT INTO user SET ?', { userId, role }, (err, insertResult) => {
          if (err) {
            console.error('Error inserting into database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.json({ userId, role });
        });
      });
    } else {
      res.json(result[0]);
    }
  });
});

// Create a new resource
app.post('/:resource',ClerkExpressRequireAuth(), (req, res) => {
  const { resource } = req.params;
  const data = req.body;
  const sql = `INSERT INTO ${resource} SET ?`;
  db.query(sql, data, (err, result) => {
    res.status(201).json({ message: `${resource} created successfully`, id: result.insertId });
  });
});

// Read all resources
app.get('/:resource',ClerkExpressRequireAuth(),(req, res) => {
  const { resource } = req.params;
  const sql = `SELECT * FROM ${resource}`;
  db.query(sql, (err, results) => {
    res.json(results);
  });
});

// Read a single resource by id
app.get('/:resource/:id',ClerkExpressRequireAuth(), (req, res) => {
  const { resource, id } = req.params;
  const sql = `SELECT * FROM ${resource} WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
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
    res.json({ message: `${resource} updated successfully` });
  });
});

// Delete a resource
app.delete('/:resource/:id',ClerkExpressRequireAuth({}), (req, res) => {
  const { resource, id } = req.params;
  const sql = `DELETE FROM ${resource} WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    res.json({ message: `${resource} deleted successfully` });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === 'Unauthenticated') {
    res.status(401).json({ error: 'Unauthenticated' });
  } else {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
