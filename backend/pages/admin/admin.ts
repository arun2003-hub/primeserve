import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../../db';

const router = express.Router();

// 1. Get all admins (Mapping 'role' to 'userType' for frontend)
router.get('/admins', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, role AS "userType" FROM admins ORDER BY id ASC'
    );
    res.json({ success: true, admins: result.rows });
  } catch (err) {
    console.error('Error fetching admins:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 2. Add new admin (Using 'hashed_password' and 'role' columns)
router.post('/admins', async (req, res) => {
  const { username, password, userType } = req.body;

  try {
    // Username already irukka nu check panrom
    const existing = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Password-ah hash panrom
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Database-la 'hashed_password' and 'role' columns-ku insert panrom
    const insertQuery = `
      INSERT INTO admins (username, hashed_password, role) 
      VALUES ($1, $2, $3) 
      RETURNING id, username, role AS "userType";
    `;
    const newAdmin = await pool.query(insertQuery, [username, hashedPassword, userType || 'admin']);

    res.status(201).json({ success: true, admin: newAdmin.rows[0] });
  } catch (err) {
    console.error('Error adding admin:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 3. Delete admin
router.delete('/admins/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM admins WHERE id = $1', [id]);
    res.json({ success: true, message: 'Admin deleted successfully' });
  } catch (err) {
    console.error('Error deleting admin:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;