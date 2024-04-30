import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import { db } from "../../db/index.js";
const router = express.Router();

router.post("/create-funding-opportunities", ClerkExpressRequireAuth(), (req, res) => {
    const id = req.auth.userId;
    const { title, description, amount, deadline, start_date, end_date } = req.body;
    db.query(
        "INSERT INTO funding_opportunities SET ?",
        {title, description, amount, deadline, start_date, end_date, manager_id: id},
        (err, result) => {
            if (err) {
                console.error("Error inserting into database:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json({ id: result.insertId, title, description, amount, deadline });
        }
    );
});

export default router;