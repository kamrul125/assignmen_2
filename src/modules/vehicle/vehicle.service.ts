import pool from "../../db";
import { Vehicle } from "./vehicle.model";

// 🔹 Create Vehicle (Admin)
export const createVehicle = async (payload: Vehicle) => {
  const { name, type, price_per_day } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles (name, type, price_per_day)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, type, price_per_day]
  );

  return result.rows[0];
};

// 🔹 Get All Vehicles (Public)
export const getAllVehicles = async () => {
  const result = await pool.query(
    `SELECT * FROM vehicles ORDER BY created_at DESC`
  );
  return result.rows;
};

// 🔹 Get Single Vehicle
export const getVehicleById = async (id: number) => {
  const result = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

// 🔹 Update Vehicle (Admin)
export const updateVehicle = async (
  id: number,
  payload: Partial<Vehicle>
) => {
  const { name, type, price_per_day, availability } = payload;

  const result = await pool.query(
    `UPDATE vehicles
     SET name = $1,
         type = $2,
         price_per_day = $3,
         availability = $4
     WHERE id = $5
     RETURNING *`,
    [name, type, price_per_day, availability, id]
  );

  return result.rows[0];
};

// 🔹 Delete Vehicle (Admin)
export const deleteVehicle = async (id: number) => {
  await pool.query(
    `DELETE FROM vehicles WHERE id = $1`,
    [id]
  );

  return { message: "Vehicle deleted successfully" };
};
