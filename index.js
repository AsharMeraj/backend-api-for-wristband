import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Initialize Neon client inside the function
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
