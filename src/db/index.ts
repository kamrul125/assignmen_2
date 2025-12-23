import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.on("connect", () => {
  console.log(" Connected to NeonDB PostgreSQL");
});

pool.on("error", (err) => {
  console.error(" DB error:", err);
  process.exit(1);
});

export default pool;
