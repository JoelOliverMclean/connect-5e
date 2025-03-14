import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import * as relations from "./relations";

const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

const sql = neon(DATABASE_URL);

const db = drizzle(sql, { schema: { ...schema, ...relations } });

export default db;
