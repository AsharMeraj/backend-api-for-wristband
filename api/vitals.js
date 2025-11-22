import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { vital_data_from_wristband } from "../schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Add it to Vercel Environment Variables!");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const packets = req.body;
      if (!Array.isArray(packets))
        return res.status(400).json({ error: "Expected an array" });

      const validPackets = packets.filter(p => p.spo2 && p.spo2 !== "0");

      if (validPackets.length === 0)
        return res.status(200).json({ message: "No valid SPO2 data" });

      await db.insert(vital_data_from_wristband).values(validPackets);

      return res.status(200).json({
        message: "Saved",
        savedCount: validPackets.length,
      });
    }

    if (req.method === "GET") {
      const data = await db.select().from(vital_data_from_wristband);
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Serverless error:", err);
    return res.status(500).json({ error: err.message });
  }
}
