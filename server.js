import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./index.js";
import { vital_data_from_wristband } from "./schema.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/vitals
app.post("/api/vitals", async (req, res) => {
  try {
    const packets = req.body;

    if (!Array.isArray(packets)) {
      return res.status(400).json({ error: "Expected an array of vitals packets" });
    }

    // Only insert packets with valid SPO2
    const validPackets = packets.filter(
      p => p.spo2 && p.spo2 !== "0"
    );

    if (validPackets.length === 0) {
      return res.status(200).json({ message: "No valid spo2 data found" });
    }

    await db.insert(vital_data_from_wristband).values(validPackets);

    res.status(200).json({
      message: "Valid spo2 packets saved",
      savedCount: validPackets.length,
    });

  } catch (err) {
    console.error("Error processing wristband vitals:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/vitals
app.get("/api/vitals", async (req, res) => {
  try {
    const wristbandData = await db.select().from(vital_data_from_wristband);

    res.status(200).json(wristbandData);

  } catch (err) {
    console.error("Error fetching vitals:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
