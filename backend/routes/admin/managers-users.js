import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import { db } from "../../db/index.js";
const router = express.Router();

router.get("/users", ClerkExpressRequireAuth(), async (req, res) => {
    db.query("SELECT * FROM user;", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(result);
        }
    });
});

router.get("/pending-managers", ClerkExpressRequireAuth(), async (req, res) => {
    db.query("SELECT * FROM user WHERE role = 'fund_manager_pending'; ", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(result);
        }
    });
});

router.put("/toggle-ban-many/:id", async (req, res) => {
    db.query("UPDATE user SET is_banned = ? WHERE id = ?", [req.body.is_banned, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.json({ message: "User banned status updated successfully" });
        }
    });
});

router.post("/update-roles", ClerkExpressRequireAuth(), async (req, res) => {
    const { ids, newRole } = req.body;

    if (!ids || !newRole) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    db.query("UPDATE user SET role = ? WHERE id IN (?)", [newRole, ids], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.json({ message: "Roles updated successfully" });
        }
    });
});


export default router;