import express from "express";
import { db } from "../db/index.js";
const router = express.Router();

router.get("/funding-opportunities", (req, res) => {
    db.query("SELECT * FROM funding_opportunities", (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.json(result);
    });
});


export default router;