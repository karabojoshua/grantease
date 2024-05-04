import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import { db } from "../../db/index.js";
const router = express.Router();


router.post("/post-application", ClerkExpressRequireAuth(), (req, res) => {
    const applicant_id = req.auth.userId;
    const { fund_id} = req.body;

    db.query(
        "INSERT INTO funding_applications SET ?",
        {applicant_id, fund_id, status: "pending"},
        (err, result) => {
            if (err) {
                console.error("Error inserting into database:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json({ id: result.insertId, applicant_id, fund_id});
        }
    );

})