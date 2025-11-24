import 'dotenv/config';
import express from "express";
import cors from "cors";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { vital_data_from_wristband } from "./db/schema.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env");
}

// Initialize Neon + Drizzle
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

// POST /api/vitals
app.post("/api/vitals", async (req, res) => {
  try {
      const packets = req.body;
      if (!Array.isArray(packets))
        return res.status(400).json({ error: "Expected array" });
  
      // Transform packets: make spo2 = 0 an empty string
      const transformedPackets = packets.map(p => ({
        ...p,
        spo2: p.spo2 === "0" || p.spo2 === 0 ? "" : p.spo2,
      }));
  
      // Keep only the last packet (latest)
      const latestPacket = transformedPackets[transformedPackets.length - 1];
  
      if (!latestPacket) {
        return res.status(200).json({ message: "No data to save" });
      }
  
      // Delete previous row(s)
      await db.delete(vital_data_from_wristband);
  
      // Insert latest packet
      await db.insert(vital_data_from_wristband).values(latestPacket);
  
      res.status(200).json({ message: "Saved latest packet", savedData: latestPacket });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });



// GET /api/vitals
app.get("/api/vitals", async (req, res) => {
  try {
    const data = await db.select().from(vital_data_from_wristband);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching vitals:", err);
    res.status(500).json({ error: err.message });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Wristband API is running!");
});

// Start server if not in serverless
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Default export for serverless
export default app;
