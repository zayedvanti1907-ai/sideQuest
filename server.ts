import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("sidequest.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    business_name TEXT,
    phone TEXT,
    email TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/leads", (req, res) => {
    const { name, businessName, phone, email, message } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    try {
      const stmt = db.prepare(`
        INSERT INTO leads (name, business_name, phone, email, message)
        VALUES (?, ?, ?, ?, ?)
      `);
      stmt.run(name, businessName, phone, email, message);
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  app.get("/api/leads", (req, res) => {
    const passkey = req.headers["x-admin-passkey"];
    const expectedPasskey = process.env.ADMIN_PASSKEY || "side2026";

    if (passkey !== expectedPasskey) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
      res.json(leads);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
