// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import fs from "fs";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Temporary storage for incoming vitals
// let vitalsData = [];

// // POST /api/vitals
// app.post("/api/vitals", async (req, res) => {
//   try {
//     const vitals = req.body;
//     console.log("Vitals received:", vitals);

//     // Store in memory
//     vitalsData.push(vitals);

//     // Optional: Save to file for persistence
//     fs.appendFileSync("vitals.log", JSON.stringify(vitals) + "\n");

//     res.status(200).json({ message: "Vitals received successfully" });
//   } catch (err) {
//     console.error("Error processing vitals:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // GET /api/vitals — return all received vitals
// app.get("/api/vitals", (req, res) => {
//   try {
//     res.status(200).json(vitalsData);
//   } catch (err) {
//     console.error("Error fetching vitals:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Start Express server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// export default app;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let vitalsData = [];

// ✅ POST route (receives vitals)
app.post("/api/vitals", async (req, res) => {
  try {
    const vitals = req.body;
    console.log("Vitals received:", vitals);

    // Save to memory
    vitalsData.push(vitals);

    res.status(200).json({ message: "Vitals received successfully" });
  } catch (err) {
    console.error("Error processing vitals:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET route (returns stored vitals)
app.get("/api/vitals", (req, res) => {
  res.json(vitalsData);
});

// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
