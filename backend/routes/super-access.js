import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from 'express';
import { db } from '../db/db.js';

const router = express.Router();

// Create a new resource
router.post('/:resource', ClerkExpressRequireAuth(), (req, res) => {
  const { resource } = req.params;
  const data = req.body;
  const sql = `INSERT INTO ${resource} SET ?`;
  db.query(sql, data, (err, result) => {
    res.status(201).json({ message: `${resource} created successfully`, id: result.insertId });
  });
});

// Read all resources
router.get('/:resource', ClerkExpressRequireAuth(), (req, res) => {
  const { resource } = req.params;
  const sql = `SELECT * FROM ${resource}`;
  db.query(sql, (err, results) => {
    res.json(results);
  });
});


// Read a single resource by id
router.get('/:resource/:id', ClerkExpressRequireAuth(), (req, res) => {
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
router.put('/:resource/:id', ClerkExpressRequireAuth({}), (req, res) => {
  const { resource, id } = req.params;
  const data = req.body;
  const sql = `UPDATE ${resource} SET ? WHERE id = ?`;
  db.query(sql, [data, id], (err, result) => {
    res.json({ message: `${resource} updated successfully` });
  });
});


// Delete a resource
router.delete('/:resource/:id', ClerkExpressRequireAuth({}), (req, res) => {
  const { resource, id } = req.params;
  const sql = `DELETE FROM ${resource} WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    res.json({ message: `${resource} deleted successfully` });
  });
});


export default router;