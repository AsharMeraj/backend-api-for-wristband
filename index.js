import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { pgTable, varchar } from "drizzle-orm/pg-core";

// Initialize Neon client inside the function
const sql = neon("postgresql://neondb_owner:npg_jNC6J0lROeLv@ep-wild-firefly-a12vf5uv-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
export const db = drizzle(sql);
