import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./modules/user/user.routes";
import vehicleRoutes from "./modules/vehicle/vehicle.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send({
    message: "Vehicle Rental API is running ",
    endpoints: {
      vehicles: {
        GET: "/cars",
        GET_ID: "/cars/:id",
        POST: "/cars (admin only)",
        PUT: "/cars/:id (admin only)",
        DELETE: "/cars/:id (admin only)"
      },
      users: {
        GET: "/users (admin only)",
        GET_ID: "/users/:id",
        REGISTER: "/users/register",
        LOGIN: "/users/login",
        PUT: "/users/:id",
        DELETE: "/users/:id (admin only)"
      }
    }
  });
});


app.use("/api/v1/users", userRoutes);
app.use("/users/register", userRoutes); 
app.use("/users/login", userRoutes);   


app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/cars", vehicleRoutes);     

export default app;
