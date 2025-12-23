import pool from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = 10;

export const createUser = async (name: string, email: string, password: string, role = "customer") => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
    [name, email, hashedPassword, role]
  );

  return result.rows[0];
};

export const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
  const user = result.rows[0];

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Password incorrect");

  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};
