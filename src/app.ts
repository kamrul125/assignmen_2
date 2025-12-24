import express, { Application } from "express";
import cors from "cors";


import userRoutes from "./modules/user/user.routes";
import vehicleRoutes from "./modules/vehicle/vehicle.routes";

const app: Application = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Vehicle Rental API is running ");
});


app.use("/api/v1/users", userRoutes);

app.use("/users/register", userRoutes);

app.use("/api/v1/vehicles", vehicleRoutes);

app.use("/cars", vehicleRoutes);



export default app;
