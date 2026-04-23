import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { devServices } from "./index.js";
import { devValidation } from "./index.js";
import { error } from "console";
import { ApiError } from "../../utils/ApiError.js";

export const addDeveloper = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = devValidation.createDeveloperSchema.parse(req.body);

    const isExist = await devServices.devExistService(req.body.email);
    if (isExist) {
      console.log("error", error);
      throw new ApiError(400, "Developer with same email already exist!");
    }

    const result = await devServices.addDevService(body);
    // console.log(result);

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Developer registered Succesfully!"));
  }
);

export const getDevelopers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";

    const body = devValidation.getDeveloperQuerySchema.parse({
      page,
      limit,
      search,
    });
    const result = await devServices.fetchDevService(body);
    // console.log(result);

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Fetch all developers succesfully!"));
  }
);

export const removeDev = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const isIdDelete = await devServices.fetchByIdService(id as string);
    if (!isIdDelete) {
      console.log("Developer not Valid");
      throw new ApiError(400, "Developer is not exist or invalid");
    }

    const devRemoved = await devServices.deleteDevService(id as string);

    return res
      .status(200)
      .json(new ApiResponse(200, devRemoved, "Developer removed succesfully!"));
  }
);

export const updateDev = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const body = devValidation.updateDeveloperSchema.parse(req.body);

    const existDev = await devServices.fetchByIdService(id as string);
    if (!existDev) {
      console.log("Developer not Valid");
      throw new ApiError(400, "Developer is not exist or invalid");
    }

    const finalData = {
      ...existDev,
      ...body,
    };
    // console.log(finalData);

    if (
      finalData.reliving_date &&
      finalData.joining_date &&
      finalData.reliving_date <= finalData.joining_date
    ) {
      throw new ApiError(400, "Relieving date must be after joining date");
    }
    const result = await devServices.updateDevService(id as string, body);
    // console.log(result);

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Developer Updated!"));
  }
);
