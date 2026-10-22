import { Router, Request, Response } from "express";
import pool from "../../db";

const router = Router();

router.get("/user/profile", async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email as string;

    if (!userEmail) {
      return res.status(400).json({ success: false, message: "Email parameter is required" });
    }

    // Supabase DB query execution
    const query = 'SELECT * FROM users WHERE email = $1 OR username = $1';
    const result = await pool.query(query, [userEmail]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found in database" });
    }

    const user = result.rows[0];

    // Response structure
    return res.status(200).json({
      success: true,
      data: {
        userName: user.username || "",
        email: user.email || "",
        companyName: user.company_name || "",
        companyWebsite: user.company_website || "",
        companyAddress: user.company_address || "",
        panNumber: user.pan_number || "",
        mobileNumber: user.mobile_number || "",
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;