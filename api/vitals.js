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

// router.post("/api/vitals", async (req, res) => {
//   try {
//     const packets = req.body;
//     if (!Array.isArray(packets))
//       return res.status(400).json({ error: "Expected array" });

//     const validPackets = packets.filter(p => p.spo2 && p.spo2 !== "0");
//     if (validPackets.length === 0)
//       return res.status(200).json({ message: "No valid SPO2 data" });

//     await db.insert(vital_data_from_wristband).values(validPackets);
//     res.status(200).json({ message: "Saved", savedCount: validPackets.length });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });
router.post("/api/vitals", async (req, res) => {
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


router.get("/api/vitals", async (req, res) => {
  try {
    const data = await db.select().from(vital_data_from_wristband);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
