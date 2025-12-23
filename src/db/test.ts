import pool from "./index";

const testDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("NeonDB Time:", res.rows[0]);
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    await pool.end();
  }
};

testDB();
