import type { Technology } from "@prisma/client";
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

export const restoreTech = async (info: Technology) => {
  console.log("Update service start");
  const restoreToDB = await prisma.technology.update({
    where: { id: info.id },
    data: { isDelete: false, createdAt: new Date() },
  });
  return restoreToDB;
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
  return removedTech
};
