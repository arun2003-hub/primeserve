import { Router, Request, Response } from "express";
import pool from "../../db";

const router = Router();

// GET: Fetch all users for Admin Onboarding page
router.get("/admin/users", async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT 
        id, 
        username, 
        email, 
        company_name, 
        company_address, 
        company_website, 
        pan_number, 
        mobile_number,
        COALESCE(status, 'Pending') AS status 
      FROM users 
      ORDER BY id DESC;
    `;
    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      users: result.rows,
    });
  } catch (error) {
    console.error("Error fetching onboarding users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", users: [] });
  }
});

// PUT: Update User Status (Activate / De-active / Reject)
router.put("/admin/users/status", async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;

    if (!userId || !status) {
      return res.status(400).json({ success: false, message: "User ID and Status are required" });
    }

    const query = "UPDATE users SET status = $1 WHERE id = $2 RETURNING id, username, status";
    const result = await pool.query(query, [status, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
});

export default router;