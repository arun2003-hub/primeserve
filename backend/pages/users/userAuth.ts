
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import pool, { sendOtpEmail } from "../../db"; 

const router = Router();

// Get All Users for Admin Onboarding
router.get("/admin/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT id, username, email, company_name, company_website, company_address, pan_number, mobile_number, status FROM users ORDER BY created_at DESC");
    res.json({ success: true, users: result.rows });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update User Status (Activate / De-activate / Reject)
router.put("/admin/users/status", async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;

    if (!userId || !status) {
      return res.status(400).json({ success: false, message: "User ID and status are required" });
    }

    const updateQuery = "UPDATE users SET status = $1 WHERE id = $2 RETURNING id, username, email, status";
    const result = await pool.query(updateQuery, [status, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: `User status updated to ${status}`,
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating user status:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// 1. Send OTP & Store Pending User Details
router.post("/user/send-otp", async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      companyName,
      companyWebsite,
      companyAddress,
      panNumber,
      mobileNumber,
      password,
    } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($2)",
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Username or Email already exists" });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`🔑 Generated OTP for ${email}: ${generatedOtp}`);

    await sendOtpEmail(email, generatedOtp);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO users (username, email, company_name, company_website, company_address, pan_number, mobile_number, password, status, otp)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Pending', $9)
      ON CONFLICT (email) DO UPDATE 
      SET username = $1, company_name = $3, company_website = $4, company_address = $5, pan_number = $6, mobile_number = $7, password = $8, otp = $9, status = 'Pending'
      RETURNING id, username, email, status;
    `;
    const values = [
      username,
      email,
      companyName || "",
      companyWebsite || "",
      companyAddress || "",
      panNumber || "",
      mobileNumber || "",
      hashedPassword,
      generatedOtp,
    ];

    await pool.query(query, values);

    res.status(200).json({
      success: true,
      message: "OTP generated successfully. Please verify.",
      email,
      debugOtp: generatedOtp
    });
  } catch (error) {
    console.error("Error sending OTP / registering user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// 2. Verify OTP Route
router.post("/user/verify-otp", async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const result = await pool.query("SELECT * FROM users WHERE LOWER(email) = LOWER($1)", [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP. Please try again." });
    }

    await pool.query("UPDATE users SET otp = NULL WHERE id = $1", [user.id]);

    res.json({
      success: true,
      message: "OTP verified successfully! Your account is now waiting for admin approval.",
    });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// User Login (Checks for Active status)
router.post("/user/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email/Username and password are required" });
    }

    const query = "SELECT * FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($1)";
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    if (user.status === "Pending") {
      return res.json({
        success: false,
        message: "Your account registration is pending admin approval. Please wait until admin activates it.",
      });
    }

    if (user.status === "De-active" || user.status === "Rejected") {
      return res.json({
        success: false,
        message: "Your account is deactivated or rejected. Please contact admin.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("User login error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// POST: Change User Password
router.post("/user/change-password", async (req: Request, res: Response) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const userQuery = "SELECT * FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($1)";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    const updateQuery = "UPDATE users SET password = $1 WHERE id = $2";
    await pool.query(updateQuery, [hashedNewPassword, user.id]);

    res.json({
      success: true,
      message: "Password changed successfully and updated in database!",
    });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;