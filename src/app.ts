import express, { Application } from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import vehicleRoutes from "./modules/vehicle/vehicle.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Vehicle Rental API is running 🚗",
    base: "/api/v1",
    endpoints: {
      auth: {
        signup: "POST /api/v1/auth/signup",
        signin: "POST /api/v1/auth/signin",
      },
      vehicles: {
        getAll: "GET /api/v1/vehicles",
        getOne: "GET /api/v1/vehicles/:id",
        create: "POST /api/v1/vehicles (admin)",
        update: "PUT /api/v1/vehicles/:id (admin)",
        delete: "DELETE /api/v1/vehicles/:id (admin)",
      },
    },
  });
});

// ✅ AUTH ROUTES (EXAMINER REQUIRED)
app.use("/api/v1/auth", authRoutes);

// ✅ VEHICLE ROUTES
app.use("/api/v1/vehicles", vehicleRoutes);

// (optional alias for demo)
app.use("/cars", vehicleRoutes);

export default app;
