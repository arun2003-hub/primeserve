import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import pool from "../db";

const server = new McpServer({
  name: "primeserve-mcp",
  version: "1.0.0"
});


// ==========================================
// 1. USERS MANAGEMENT TOOLS
// ==========================================

server.tool(
  "get_all_users",
  "Fetch all users from the database",
  {},
  async () => {
    try {
      const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
      return { content: [{ type: "text", text: JSON.stringify(result.rows, null, 2) }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "get_user_by_id_or_username",
  "Fetch a single user by id or username",
  { identifier: z.string().describe("User ID or username") },
  async ({ identifier }) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id::text = $1 OR username = $1", [identifier]);
      if (result.rows.length === 0) return { content: [{ type: "text", text: "User not found." }], isError: true };
      return { content: [{ type: "text", text: JSON.stringify(result.rows[0], null, 2) }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "add_user",
  "Add a new user to the database",
  {
    username: z.string(),
    email: z.string(),
    password: z.string(),
    company_name: z.string().optional(),
    status: z.string().optional()
  },
  async ({ username, email, password, company_name, status }) => {
    try {
      const result = await pool.query(
        "INSERT INTO users (username, email, password, company_name, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, email, password, company_name || null, status || 'Pending']
      );
      return { content: [{ type: "text", text: `User added successfully: ${JSON.stringify(result.rows[0])}` }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "edit_user",
  "Edit an existing user's details",
  {
    id: z.string(),
    username: z.string().optional(),
    email: z.string().optional(),
    status: z.string().optional()
  },
  async ({ id, username, email, status }) => {
    try {
      const result = await pool.query(
        "UPDATE users SET username = COALESCE($1, username), email = COALESCE($2, email), status = COALESCE($3, status) WHERE id::text = $4 RETURNING *",
        [username || null, email || null, status || null, id]
      );
      if (result.rows.length === 0) return { content: [{ type: "text", text: "User not found." }], isError: true };
      return { content: [{ type: "text", text: `User updated: ${JSON.stringify(result.rows[0])}` }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "delete_user",
  "Delete a user by ID",
  { id: z.string() },
  async ({ id }) => {
    try {
      const result = await pool.query("DELETE FROM users WHERE id::text = $1 RETURNING *", [id]);
      if (result.rows.length === 0) return { content: [{ type: "text", text: "User not found." }], isError: true };
      return { content: [{ type: "text", text: `User deleted successfully.` }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);



// ==========================================
// 2. ADMINS MANAGEMENT TOOLS
// ==========================================

server.tool(
  "get_all_admins",
  "Fetch all admins",
  {},
  async () => {
    try {
      const result = await pool.query("SELECT * FROM admins ORDER BY id ASC");
      return { content: [{ type: "text", text: JSON.stringify(result.rows, null, 2) }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "get_admin_by_username",
  "Fetch an admin by username",
  { username: z.string() },
  async ({ username }) => {
    try {
      const result = await pool.query("SELECT * FROM admins WHERE username = $1", [username]);
      if (result.rows.length === 0) return { content: [{ type: "text", text: "Admin not found." }], isError: true };
      return { content: [{ type: "text", text: JSON.stringify(result.rows[0], null, 2) }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "add_admin",
  "Add a new admin",
  {
    username: z.string(),
    hashed_password: z.string(),
    role: z.string().optional()
  },
  async ({ username, hashed_password, role }) => {
    try {
      const result = await pool.query(
        "INSERT INTO admins (username, hashed_password, role) VALUES ($1, $2, $3) RETURNING *",
        [username, hashed_password, role || 'admin']
      );
      return { content: [{ type: "text", text: `Admin added: ${JSON.stringify(result.rows[0])}` }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "edit_admin",
  "Edit admin details",
  {
    id: z.string(),
    username: z.string().optional(),
    role: z.string().optional()
  },
  async ({ id, username, role }) => {
    try {
      const result = await pool.query(
        "UPDATE admins SET username = COALESCE($1, username), role = COALESCE($2, role) WHERE id::text = $3 RETURNING *",
        [username || null, role || null, id]
      );
      if (result.rows.length === 0) return { content: [{ type: "text", text: "Admin not found." }], isError: true };
      return { content: [{ type: "text", text: `Admin updated: ${JSON.stringify(result.rows[0])}` }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "delete_admin",
  "Delete an admin by ID",
  { id: z.string() },
  async ({ id }) => {
    try {
      const result = await pool.query("DELETE FROM admins WHERE id::text = $1 RETURNING *", [id]);
      if (result.rows.length === 0) return { content: [{ type: "text", text: "Admin not found." }], isError: true };
      return { content: [{ type: "text", text: "Admin deleted successfully." }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);


// ==========================================
// 3. API GROUPS MANAGEMENT TOOLS
// ==========================================

server.tool(
  "get_all_groups",
  "Fetch all API groups",
  {},
  async () => {
    try {
      const result = await pool.query("SELECT * FROM api_groups ORDER BY id ASC");
      return { content: [{ type: "text", text: JSON.stringify(result.rows, null, 2) }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "get_group_by_id",
  "Fetch a group by ID",
  { id: z.string() },
  async ({ id }) => {
    try {
      const result = await pool.query("SELECT * FROM api_groups WHERE id::text = $1", [id]);
      if (result.rows.length === 0) return { content: [{ type: "text", text: "Group not found." }], isError: true };
      return { content: [{ type: "text", text: JSON.stringify(result.rows[0], null, 2) }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "add_group",
  "Add a new API group",
  { name: z.string(), description: z.string().optional() },
  async ({ name, description }) => {
    try {
      const result = await pool.query(
        "INSERT INTO api_groups (name, description) VALUES ($1, $2) RETURNING *",
        [name, description || null]
      );
      return { content: [{ type: "text", text: `Group added: ${JSON.stringify(result.rows[0])}` }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "edit_group",
  "Edit API group details",
  { id: z.string(), name: z.string().optional(), description: z.string().optional() },
  async ({ id, name, description }) => {
    try {
      const result = await pool.query(
        "UPDATE api_groups SET name = COALESCE($1, name), description = COALESCE($2, description) WHERE id::text = $3 RETURNING *",
        [name || null, description || null, id]
      );
      if (result.rows.length === 0) return { content: [{ type: "text", text: "Group not found." }], isError: true };
      return { content: [{ type: "text", text: `Group updated: ${JSON.stringify(result.rows[0])}` }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "delete_group",
  "Delete an API group by ID",
  { id: z.string() },
  async ({ id }) => {
    try {
      const result = await pool.query("DELETE FROM api_groups WHERE id::text = $1 RETURNING *", [id]);
      if (result.rows.length === 0) return { content: [{ type: "text", text: "Group not found." }], isError: true };
      return { content: [{ type: "text", text: "Group deleted successfully." }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);


// ==========================================
// 4. API SUBGROUPS MANAGEMENT TOOLS
// ==========================================

server.tool(
  "get_all_subgroups",
  "Fetch all API subgroups",
  {},
  async () => {
    try {
      const result = await pool.query("SELECT * FROM api_subgroups ORDER BY id ASC");
      return { content: [{ type: "text", text: JSON.stringify(result.rows, null, 2) }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "add_subgroup",
  "Add a new API subgroup",
  { group_id: z.string(), name: z.string(), description: z.string().optional() },
  async ({ group_id, name, description }) => {
    try {
      const result = await pool.query(
        "INSERT INTO api_subgroups (group_id, name, description) VALUES ($1, $2, $3) RETURNING *",
        [group_id, name, description || null]
      );
      return { content: [{ type: "text", text: `Subgroup added: ${JSON.stringify(result.rows[0])}` }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "edit_subgroup",
  "Edit an API subgroup",
  { id: z.string(), name: z.string().optional(), description: z.string().optional() },
  async ({ id, name, description }) => {
    try {
      const result = await pool.query(
        "UPDATE api_subgroups SET name = COALESCE($1, name), description = COALESCE($2, description) WHERE id::text = $3 RETURNING *",
        [name || null, description || null, id]
      );
      if (result.rows.length === 0) return { content: [{ type: "text", text: "Subgroup not found." }], isError: true };
      return { content: [{ type: "text", text: `Subgroup updated: ${JSON.stringify(result.rows[0])}` }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);

server.tool(
  "delete_subgroup",
  "Delete an API subgroup by ID",
  { id: z.string() },
  async ({ id }) => {
    try {
      const result = await pool.query("DELETE FROM api_subgroups WHERE id::text = $1 RETURNING *", [id]);
      if (result.rows.length === 0) return { content: [{ type: "text", text: "Subgroup not found." }], isError: true };
      return { content: [{ type: "text", text: "Subgroup deleted successfully." }] };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }
  }
);


// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("PrimeServe Complete MCP Server running");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});