import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../../db";

const router = Router();

router.post("/admin/adduser", async (req: Request, res: Response) => {
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
      return res.status(400).json({ success: false, message: "Username, email and password are required" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Username or Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Admin add panravangalkku direct-ah 'Active' status
    const query = `
      INSERT INTO users (username, email, company_name, company_website, company_address, pan_number, mobile_number, password, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Active')
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
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: "User added successfully as Active!",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding user from admin panel:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;