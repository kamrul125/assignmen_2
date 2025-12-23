import { Router } from "express";
import * as vehicleController from "./vehicle.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

//  Public routes
router.get("/", vehicleController.getAllVehicles);
router.get("/:id", vehicleController.getVehicleById);

//  Admin only routes
router.post("/", auth, vehicleController.createVehicle);
router.put("/:id", auth, vehicleController.updateVehicle);
router.delete("/:id", auth, vehicleController.deleteVehicle);

export default router;
