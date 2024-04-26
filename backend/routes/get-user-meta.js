import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import { db } from "../db.js";
const router = express.Router();

router.get("/user-meta", ClerkExpressRequireAuth(), (req, res) => {
  const userId = req.auth.userId;
  db.query("SELECT * FROM user WHERE userId = ?", [userId], (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.length === 0) {
      // First user to sign in becomes an admin
      db.query("SELECT COUNT(*) as count FROM user", (err, countResult) => {
        if (err) {
          console.error("Error querying database:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        const role = countResult[0].count === 0 ? "admin" : "user";
        db.query(
          "INSERT INTO user SET ?",
          { userId, role },
          (err, insertResult) => {
            if (err) {
              console.error("Error inserting into database:", err);
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }
            res.json({ userId, role, isBanned: 0 });
          }
        );
      });
    } else {
      res.json(result[0]);
    }
  });
});

export default router;
