import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ ERROR: DATABASE_URL is missing or undefined in .env file!");
} else {
  console.log("✅ DATABASE_URL loaded successfully.");
}

// 👇 Export JWT_SECRET from db.ts so other files can use it securely
export const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn("⚠️ WARNING: JWT_SECRET is missing in .env file!");
} else {
  console.log("✅ JWT_SECRET loaded successfully.");
}

// Supabase-ku SSL connection need
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

export const initializeDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to Supabase PostgreSQL database successfully.");
    
    // schema.sql file-i read seithu tables-ai create seiyum
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await client.query(schemaSql);
      console.log("Database schema (tables) initialized successfully from schema.sql.");
    } else {
      console.log("Warning: schema.sql file not found in backend folder.");
    }

    // Status column illavittal, database-il automatic-ah default 'Pending'-a add seiyum
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Pending';
    `);
    console.log("Database user status column verified/updated successfully.");
    
    client.release();
  } catch (err) {
    console.error("Database connection/initialization error:", err);
  }
};

// 👇 Email configuration & sending logic moved here from userauth.ts
export const sendOtpEmail = async (email: string, generatedOtp: string) => {
  const emailUrl = process.env.Email_URL || "https://api.resend.com/emails";
  const apiKey = process.env.Email_API_KEY;

  try {
    const emailResponse = await fetch(emailUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: [email],
        subject: "PrimeServe - Account Registration OTP",
        html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Welcome to PrimeServe</h2>
                <p>Your One-Time Password (OTP) for registration is:</p>
                <h1 style="color: #2563eb; letter-spacing: 2px;">${generatedOtp}</h1>
                <p>Please enter this code to verify your account. Note that your account will require admin approval after verification.</p>
              </div>`,
      }),
    });

    const emailData = await emailResponse.json();
    if (!emailResponse.ok) {
      console.warn("⚠️ Resend API warning (Bypassed):", emailData);
    }
  } catch (emailErr) {
    console.warn("⚠️ Email sending skipped due to network/restriction:", emailErr);
  }
};

export default pool;