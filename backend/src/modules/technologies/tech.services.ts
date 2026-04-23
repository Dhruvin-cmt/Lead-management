import type { Tech_category } from "@prisma/client";
import { prisma } from "../../config/prisma.client.js";
import type { techStackData } from "./tech.validation.js";

export const addNewTech = async (info: techStackData) => {
  console.log("Tech services start");
  const addToDB = await prisma.technology.create({
    data: {
      name: info.name,
      category: info.category,
    },
  });
  return addToDB;
};

export const getTech = async (limit: number, page: number) => {
  console.log("Get all Tech details services start");
  const result = await prisma.technology.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: { isDelete: false },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

export const removeTech = async (techId: string) => {
  console.log("Remove tech services start");
  const removedTech = await prisma.technology.update({
    where: { id: techId },
    data: { isDelete: true },
  });
  return removedTech;
};

export const getDocCount = async () => {
  console.log("Count service start");
  const docCount = await prisma.technology.count({
    where: {
      isDelete: false,
    },
  });
  return docCount;
};

export const userExist = async (name: string, category: Tech_category) => {
  console.log("User exist service start");
  const userisExist = await prisma.technology.findFirst({
    where: { name: name, category: category, isDelete: false },
  });

  return userisExist;
};

export const validateUser = async (id: string) => {
  console.log("User validation service start");
  const validUser = await prisma.technology.findFirst({
    where: { id: id, isDelete: false },
  });
  return validUser;
};
