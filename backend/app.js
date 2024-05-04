import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createFundingOpportunities, fundingOpportunities, getUserMeta, managerApplications, pendingManagers, superAccess, userGetApplications } from "./routes/index.js";

dotenv.config({ path: '.env.local' });

const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serving images
app.use('/uploads/funding_opportunities/', express.static('uploads/funding_opportunities/'));

app.get('/', ClerkExpressRequireAuth(), (req, res) => {
  res.json({ message: "Welcome, you're authenticated!" })
});


// Funding opportunities routes
app.use("/", fundingOpportunities);

// Remove super access routes from production
app.use('/db', superAccess);

// Manager routes
app.use('/manager', managerApplications);
app.use('/manager', createFundingOpportunities);

// User routes
app.use('/user', userGetApplications);
app.use('/user', getUserMeta);

// Admin routes
app.use('/admin', pendingManagers);


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