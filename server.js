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
    const vitals = req.body; // JSON payload from Android
    console.log("Vitals received:", vitals);

    // You can save vitals to DB here if needed
    // await db.insert(vital_data).values(vitals);

    res.status(200).json({ message: "Vitals received successfully" });
  } catch (err) {
    console.error("Error processing vitals:", err);
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
