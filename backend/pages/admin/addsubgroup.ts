import { Router, Request, Response } from "express";
import pool from "../../db";

const router = Router();

// GET: Fetch all subgroups for a specific group
router.get("/groups/:groupId/subgroups", async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const result = await pool.query(
      "SELECT * FROM api_subgroups WHERE group_id = $1 ORDER BY id ASC",
      [groupId]
    );
    res.json({ subgroups: result.rows });
  } catch (error) {
    console.error("Error fetching subgroups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: Add Subgroup endpoint
router.post("/groups/:groupId/subgroups", async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Subgroup name is required" });
    }

    const query = `
      INSERT INTO api_subgroups (group_id, name, description) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const values = [groupId, name, description || ""];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Subgroup saved to database successfully",
      subgroup: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving subgroup to database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: Update Subgroup endpoint
router.put("/subgroups/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Subgroup name is required" });
    }

    const query = `
      UPDATE api_subgroups 
      SET name = $1, description = $2 
      WHERE id = $3 
      RETURNING *;
    `;
    const values = [name, description || "", id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Subgroup not found" });
    }

    res.json({
      message: "Subgroup updated successfully",
      subgroup: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating subgroup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: Delete Subgroup endpoint
router.delete("/subgroups/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM api_subgroups WHERE id = $1 RETURNING *;", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Subgroup not found" });
    }

    res.json({
      message: "Subgroup deleted successfully",
      subgroup: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting subgroup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;