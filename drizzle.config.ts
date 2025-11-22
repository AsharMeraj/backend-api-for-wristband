import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema.js", // or wherever your schema file is
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});