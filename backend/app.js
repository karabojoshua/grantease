import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getUserMeta, superAccess } from "./routes/index.js";

dotenv.config({ path: '.env.local' });

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.get('/', ClerkExpressRequireAuth(), (req, res) => {
  res.json({ message: "Welcome, you're authenticated!" })
});

//Route to get user meta
app.use('/', getUserMeta);

// Remove super access routes from production
app.use('/db', superAccess);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === 'Unauthenticated') {
    res.status(401).json({ error: 'Unauthenticated' });
  } else {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;