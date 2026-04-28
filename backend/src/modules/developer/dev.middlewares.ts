import { asyncHandler } from "../../utils/asyncHandler.js";
import type { Request, Response, NextFunction } from "express";
import { devServices } from "./index.js";

export const syncDeveloperStatusService = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Sync Status middleware start");
    const { id } = req.params;
    console.log(id);
    const date = new Date();

    await devServices.syncDeveloperStatusService(id as string);
    console.log("Middleware succesfully Passed")
    next();
  }
);
