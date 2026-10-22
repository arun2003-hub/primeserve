import { Router } from "express";
import pool from "../../db"; 

const router = Router();

// 1. Get all admins list
router.get("/admins", async (req, res) => {
  try {
    // Database-il iruntha admins-ai edukkirom (user_type-ai userType-aga alias sekirom)
    const result = await pool.query("SELECT id, username, user_type AS \"userType\" FROM admins");
    res.json({
      success: true,
      admins: result.rows,
    });
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 2. Add new admin
router.post("/admins", async (req, res) => {
  try {
    const { username, password, userType } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    // Database-il puthu admin-ai insert sekirom
    const result = await pool.query(
      "INSERT INTO admins (username, password, user_type) VALUES ($1, $2, $3) RETURNING id, username, user_type AS \"userType\"",
      [username, password, userType || "admin"]
    );

    res.json({
      success: true,
      message: "Admin added successfully",
      admin: result.rows[0],
    });
  } catch (err) {
    console.error("Error adding admin:", err);
    res.status(500).json({ success: false, message: "Failed to add admin (Username already exists?)" });
  }
});

// 3. Delete admin by ID
router.delete("/admins/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM admins WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting admin:", err);
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
});

export default router;