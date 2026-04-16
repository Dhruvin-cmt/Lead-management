import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { techServices } from "./index.js";
import { prisma } from "../../config/prisma.client.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const addTechStack = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, category } = req.body;

    const isExist = await prisma.technology.findFirst({
      where: { name: name, category: category },
    });
    console.log(isExist);

    if (
      isExist &&
      isExist?.isDelete === false &&
      isExist?.category === category
    ) {
      console.log("Technology with this name already registered");
      throw new ApiError(400, "Technology with this name already registered");
    }

    if (
      isExist &&
      isExist.isDelete === true &&
      isExist?.category === category
    ) {
      const restoredTech = await techServices.restoreTech(isExist);
      console.log(restoredTech);
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            restoredTech,
            "Technology added/updated succesFully!"
          )
        );
    }

    const result = await techServices.addNewTech({ name, category });
    console.log("result", result);

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
    console.log(paginateDate);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          paginateDate,
          "Technology details fetch succesFully!"
        )
      );
  }
);

export const deleteTech = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedTech = await techServices.removeTech(id as string);

    return res
      .status(200)
      .json(
        new ApiResponse(200, deletedTech, "Technology deleted succesfully!")
      );
  }
);
