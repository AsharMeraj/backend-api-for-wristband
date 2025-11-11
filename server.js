import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/vitals equivalent to Next.js POST handler
app.post("/api/vitals", async (req, res) => {
  try {
    const vitals = req.body;
    console.log("Vitals received:", vitals); // <-- This prints JSON to console
    res.status(200).json({ message: "Vitals received successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/api/vitals", (req, res) => {
  res.json({ message: "Use POST to send vitals data" });
});


// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
