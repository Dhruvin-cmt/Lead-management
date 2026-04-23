import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { techServices } from "./index.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Tech_category } from "@prisma/client";

export const addTechStack = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, category } = req.body;

    const isExist = await techServices.userExist(name, category);
    console.log(isExist);

    if (isExist && isExist?.isDelete === false) {
      console.log("Technology with this name already registered");
      throw new ApiError(400, "Technology with this name already registered");
    }

    const result = await techServices.addNewTech({ name, category });
    // console.log("result", result);

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Technology added succesFully!"));
  }
);

export const getAllTech = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const paginateDate = await techServices.getTech(limit, page);
    const totalData = await techServices.getDocCount();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { paginateDate, totalData, page, limit },
          "Technology details fetch succesFully!"
        )
      );
  }
);

export const deleteTech = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "ID did not found");
    }

    const isValid = await techServices.validateUser(id as string);
    if (!isValid) {
      console.log("User did not found!");
      throw new ApiError(400, "Technology did not found");
    }

    const deletedTech = await techServices.removeTech(isValid.id as string);

    return res
      .status(200)
      .json(
        new ApiResponse(200, deletedTech, "Technology deleted succesfully!")
      );
  }
);

export const getAllCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryData = Object.values(Tech_category);
    return res
      .status(200)
      .json(
        new ApiResponse(200, categoryData, "Tech Category fetch succesfully!")
      );
  }
);
