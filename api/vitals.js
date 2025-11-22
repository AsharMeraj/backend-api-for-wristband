import { db } from "../index.js";
import { vital_data_from_wristband } from "../schema.js";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const packets = req.body;

      if (!Array.isArray(packets)) {
        return res.status(400).json({ error: "Expected an array of vitals packets" });
      }

      const validPackets = packets.filter(p => p.spo2 && p.spo2 !== "0");

      if (validPackets.length === 0) {
        return res.status(200).json({ message: "No valid spo2 data found" });
      }

      await db.insert(vital_data_from_wristband).values(validPackets);

      return res.status(200).json({
        message: "Valid spo2 packets saved",
        savedCount: validPackets.length,
      });
    }

    if (req.method === "GET") {
      const data = await db.select().from(vital_data_from_wristband);
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    console.error("Vitals API error:", err);
    return res.status(500).json({ error: err.message });
  }
}
