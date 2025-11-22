import 'dotenv/config';
import express from "express";
import cors from "cors";
import vitalsRouter from "./api/vitals.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/vitals", vitalsRouter);

// Export the app instance for serverless platforms or external servers
export default app;

// Optional: if running locally via Node, start the server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
