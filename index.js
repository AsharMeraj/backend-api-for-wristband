import 'dotenv/config';
import express from "express";
import cors from "cors";
import vitalsRouter from "./api/vitals.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/vitals", vitalsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
