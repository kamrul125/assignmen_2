import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./modules/user/user.routes";
import vehicleRoutes from "./modules/vehicle/vehicle.routes";

//  app declare প্রথমে
const app: Application = express(); 

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Vehicle Rental API is running ");
});

export default app;
