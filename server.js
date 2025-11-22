import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import { db } from "./index.ts";  


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// Temporary storage for incoming vitals
let vitalsData = [];

// POST /api/vitals
app.post("/api/vitals", async (req, res) => {
  try {
    const packets = req.body;

    if (!Array.isArray(packets)) {
      throw new Error("Expected an array of vitals packets");
    }

    // Filter ONLY packets where spo2 != "0"
    const validPackets = packets.filter(p => p.spo2 && p.spo2 !== "0");

    if (validPackets.length === 0) {
      return res.status(200).json({ message: "No valid spo2 data found" });
    }

    // Insert all valid packets into DB
    await db.insert(vital_data_from_wristband).values(validPackets);

    res.status(200).json({
      message: "Valid spo2 packets saved",
      savedCount: validPackets.length
    });

  } catch (err) {
    console.error("Error processing wristband vitals:", err);
    res.status(500).json({ error: err.message });
  }
});


// GET /api/vitals — return all received vitals
app.get("/api/vitals", (req, res) => {
  try {
    res.status(200).json(vitalsData);
  } catch (err) {
    console.error("Error fetching vitals:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
