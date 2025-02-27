import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

const drizzleConfig = {
  schema: "./db/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: { url: DATABASE_URL },
};

export default defineConfig(drizzleConfig);
