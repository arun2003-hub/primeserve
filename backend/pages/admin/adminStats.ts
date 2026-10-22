import { Router } from 'express';
import pool from '../../db';

const router = Router();

// Get Admin Portal Users Counts
router.get('/admin/stats', async (req, res) => {
  try {
    // Fetch all admin rows to safely check roles without column errors
    const result = await pool.query('SELECT * FROM admins');
    const rows = result.rows;

    let total = rows.length;
    let adminCount = 0;
    let onboardingCount = 0;
    let viewerCount = 0;

    rows.forEach((row) => {
      // Check possible column names (role, user_type, usertype, type)
      const roleVal = (
        row.role || 
        row.user_type || 
        row.usertype || 
        row.type || 
        ''
      ).toString().toLowerCase();

      if (roleVal.includes('onboarding')) {
        onboardingCount++;
      } else if (roleVal.includes('viewer')) {
        viewerCount++;
      } else {
        adminCount++;
      }
    });

    res.json({
      success: true,
      stats: {
        total,
        admin: adminCount,
        onboarding: onboardingCount,
        viewer: viewerCount
      }
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;