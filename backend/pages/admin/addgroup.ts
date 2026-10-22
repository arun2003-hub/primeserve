import { Router, Request, Response } from "express";
import pool from "../../db";

const router = Router();

// GET: Fetch all API groups from database
router.get("/groups", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM api_groups ORDER BY id ASC");
    res.json({ groups: result.rows });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: Add Group endpoint
router.post("/add-group", async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Group name is required" });
    }

    const query = `
      INSERT INTO api_groups (name, description, apis) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const values = [name, description || "", 0];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Group saved to database successfully",
      group: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving group to database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: Update Group endpoint
router.put("/groups/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Group name is required" });
    }

    const query = `
      UPDATE api_groups 
      SET name = $1, description = $2 
      WHERE id = $3 
      RETURNING *;
    `;
    const values = [name, description || "", id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.json({
      message: "Group updated successfully",
      group: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: Delete Group endpoint
router.delete("/groups/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM api_groups WHERE id = $1 RETURNING *;", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.json({
      message: "Group deleted successfully",
      group: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;