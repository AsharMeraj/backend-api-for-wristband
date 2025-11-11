import fs from "fs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/vitals equivalent to Next.js POST handler

app.post("/api/vitals", async (req, res) => {
  const vitals = req.body;
  fs.appendFileSync("vitals.log", JSON.stringify(vitals) + "\n");
  console.log("Vitals received:", vitals);
  res.status(200).json({ message: "Vitals received successfully" });
});



app.get("/api/vitals", (req, res) => {
  res.json({ message: "Use POST to send vitals data" });
});


// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
