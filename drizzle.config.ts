import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema.ts", // or wherever your schema file is
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});