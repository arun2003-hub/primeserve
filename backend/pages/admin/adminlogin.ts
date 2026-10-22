import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool, { JWT_SECRET } from "../../db"; 

const router = Router();

router.post('/admin/login', async (req: Request, res: Response) => {
  console.log("--- LOGIN REQUEST RECEIVED ---");
  console.log("Request Body:", req.body);

  
  if (!JWT_SECRET) {
    console.error("❌ FATAL ERROR: JWT_SECRET is missing in environment variables!");
    return res.status(500).json({ 
      success: false, 
      message: "Server configuration error: JWT secret is missing." 
    });
  }

  const { email, username, password } = req.body;
  const loginIdentifier = email || username; 
  
  if (!loginIdentifier || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const query = 'SELECT * FROM admins WHERE username = $1';
    const result = await pool.query(query, [loginIdentifier]);

    if (result.rows.length === 0) {
      console.log("❌ User not found in database for:", loginIdentifier);
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const admin = result.rows[0];
    console.log("✅ User found in DB:", admin.username);

    const isMatch = await bcrypt.compare(password, admin.hashed_password);

    if (!isMatch) {
      console.log("❌ Password mismatch!");
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // 👇 db.ts-il irunthu vantha JWT_SECRET-ai use panni Token generate seiyappadugirathu
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role || 'admin' },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("🎉 Login successful for:", admin.username);
    res.json({ 
      success: true, 
      message: 'Login successful',
      token,
      admin: {
        username: admin.username,
        role: admin.role || 'admin'
      }
    });
  } catch (err) {
    console.error('Server login error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;



// import { Router, Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import pool, { JWT_SECRET } from "../../db"; 

// const router = Router();

// router.post('/admin/login', async (req: Request, res: Response) => {
//   console.log("--- ADMIN LOGIN REQUEST ---");
//   console.log("Request Body:", req.body);

//   if (!JWT_SECRET) {
//     console.error("❌ FATAL ERROR: JWT_SECRET is missing!");
//     return res.status(500).json({ 
//       success: false, 
//       message: "Server configuration error: JWT secret is missing." 
//     });
//   }

//   // Strictly extracting username and password
//   const { username, password } = req.body;
  
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'Username and password are required' });
//   }

//   try {
//     // Database-la username mattum check panrom
//     const query = 'SELECT * FROM admins WHERE username = $1';
//     const result = await pool.query(query, [username]);

//     if (result.rows.length === 0) {
//       console.log("❌ Admin not found for username:", username);
//       return res.status(401).json({ success: false, message: 'Invalid username or password' });
//     }

//     const admin = result.rows[0];
//     console.log("✅ Admin found in DB:", admin.username);

//     const isMatch = await bcrypt.compare(password, admin.hashed_password);

//     if (!isMatch) {
//       console.log("❌ Password mismatch!");
//       return res.status(401).json({ success: false, message: 'Invalid username or password' });
//     }

//     const token = jwt.sign(
//       { id: admin.id, username: admin.username, role: admin.role || 'admin' },
//       JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     console.log("🎉 Login successful for admin:", admin.username);
//     res.json({ 
//       success: true, 
//       message: 'Login successful',
//       token,
//       admin: {
//         username: admin.username,
//         role: admin.role || 'admin'
//       }
//     });
//   } catch (err) {
//     console.error('Server login error:', err);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// });

// export default router;