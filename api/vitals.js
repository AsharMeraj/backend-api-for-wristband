// api/vitals.js
import { Router } from "express";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { vital_data_from_wristband } from "../db/schema.ts";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set!");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const router = Router();

router.post("/", async (req, res) => {
  try {
    const packets = req.body;
    if (!Array.isArray(packets))
      return res.status(400).json({ error: "Expected array" });

    const validPackets = packets.filter(p => p.spo2 && p.spo2 !== "0");
    if (validPackets.length === 0)
      return res.status(200).json({ message: "No valid SPO2 data" });

    await db.insert(vital_data_from_wristband).values(validPackets);
    res.status(200).json({ message: "Saved", savedCount: validPackets.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await db.select().from(vital_data_from_wristband);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
