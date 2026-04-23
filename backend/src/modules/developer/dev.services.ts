import { Dev_status } from "@prisma/client";
import { prisma } from "../../config/prisma.client.js";
import type { devValidation } from "./index.js";

export const addDevService = async (devData : devValidation.createDevBody) => {
  console.log("Post services start");
  const addedToDb = await prisma.developer_Team.create({
    data: {
      developer_name: devData.developer_name,
      email: devData.email,
      expYearBeforeJoin: devData.expYearBeforeJoin,
      expMonthBeforeJoin: devData.expMonthBeforeJoin,
      techskills: {
        create: devData.techskills.map((id: string) => ({
          techStack: {
            connect: { id },
          },
        })),
      },
      position: devData.position,
      salary: devData.salary,
    },
  });

  return addedToDb;
};

export const fetchDevService = async (body : devValidation.fetchDevBody) => {
  console.log("Fetch Developer Service Start");

  const where: any = {
    status: Dev_status.ACTIVE,
  };

  if (body.search) {
    where.developer_name = {
      contains: body.search,
      mode: "insensitive",
    };
  }

  return Promise.all([
    prisma.developer_Team.findMany({
      skip: (body.page - 1) * body.limit,
      take: body.limit,
      where,
      include: {
        techskills: {
          select: {
            techStack: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.developer_Team.count({
      where,
    }),
  ]);
};

export const devExistService = async (email: string) => {
  console.log("Developer exist service start");
  const isDevExist = await prisma.developer_Team.findFirst({
    where: { status: Dev_status.ACTIVE, email: email },
  });
  return isDevExist;
};

export const deleteDevService = async (id: string) => {
  console.log("Deletion service start");
  const delDeveloper = await prisma.developer_Team.update({
    where: { id: id },
    data: { status: Dev_status.INACTIVE, reliving_date: new Date() },
  });
  return delDeveloper;
};

export const fetchByIdService = async (id: string) => {
  console.log("Fetch Dev By Id Service start");
  const getById = await prisma.developer_Team.findFirst({
    where: { id: id, status: Dev_status.ACTIVE },
  });
  return getById;
};

export const updateDevService = async (
  id: string,
  body: devValidation.updateDevBody
) => {
  console.log("update developer service start");
  const updatedDev = await prisma.developer_Team.update({
    where: { id: id },
    data: body,
  });
  return updatedDev;
};

export const syncDeveloperStatusService = async (id?: string) => {
  console.log("Sync Status service start");
  const date = new Date();

  if (id === undefined) {
    console.log("Perform multi status sync");
    return await prisma.developer_Team.updateMany({
      where: {
        reliving_date: {
          not: null,
          lt: date,
        },
        status: Dev_status.ACTIVE,
      },
      data: {
        status: Dev_status.INACTIVE,
      },
    });
  } else {
    console.log("Perform Single status sync");
    return await prisma.developer_Team.updateMany({
      where: {
        reliving_date: {
          not: null,
          lt: date,
        },
        id: id,
        status: Dev_status.ACTIVE,
      },
      data: {
        status: Dev_status.INACTIVE,
      },
    });
  }
};
