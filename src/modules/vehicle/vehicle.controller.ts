import { Request, Response } from "express";
import * as vehicleService from "./vehicle.service";
import { AuthRequest } from "../../middlewares/auth";

// Create Vehicle (Admin only)
export const createVehicle = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        error: "Forbidden: Admin access only",
      });
    }

    const vehicle = await vehicleService.createVehicle(req.body);

    res.status(201).json({
      message: "Vehicle created successfully",
      data: vehicle,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Get All Vehicles (Public)
export const getAllVehicles = async (_req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();

    res.status(200).json({
      data: vehicles,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

//  Get Single Vehicle
export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const vehicle = await vehicleService.getVehicleById(id);

    if (!vehicle) {
      return res.status(404).json({
        error: "Vehicle not found",
      });
    }

    res.status(200).json({
      data: vehicle,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

//  Update Vehicle (Admin only)
export const updateVehicle = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        error: "Forbidden: Admin access only",
      });
    }

    const id = Number(req.params.id);
    const vehicle = await vehicleService.updateVehicle(id, req.body);

    res.status(200).json({
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

//  Delete Vehicle (Admin only)
export const deleteVehicle = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        error: "Forbidden: Admin access only",
      });
    }

    const id = Number(req.params.id);
    const result = await vehicleService.deleteVehicle(id);

    res.status(200).json({
      message: "Vehicle deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};
