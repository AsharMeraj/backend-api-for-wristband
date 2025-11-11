import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Temporary storage for incoming vitals
let vitalsData = [];

// POST /api/vitals
app.post("/api/vitals", async (req, res) => {
  try {
    console.log("Incoming request headers:", req.headers);
    console.log("Incoming request body:", req.body);

    const vitals = req.body;

    // Validate the body
    if (!vitals || Object.keys(vitals).length === 0) {
      throw new Error("Empty or invalid JSON body");
    }

    // Save to memory
    vitalsData.push(vitals);

    res.status(200).json({ message: "Vitals received successfully" });
  } catch (err) {
    console.error("Error processing vitals:", err.message);
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
