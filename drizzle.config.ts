import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema.js", // or wherever your schema file is
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_jNC6J0lROeLv@ep-wild-firefly-a12vf5uv-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});