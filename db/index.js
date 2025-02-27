import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema.js";

const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

const sql = neon(DATABASE_URL);

const db = drizzle(sql, { schema });

export default db;
