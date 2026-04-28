import { Dev_status } from "@prisma/client";
import { prisma } from "../../config/prisma.client.js";
import type { devValidation } from "./index.js";

export const addDevService = async (devData: devValidation.createDevBody) => {
  console.log("Post services start");
  const addedToDb = await prisma.developer_Team.create({
    data: {
      developer_name: devData.developer_name,
      email: devData.email,
      expYearBeforeJoin: devData.expYearBeforeJoin,
      expMonthBeforeJoin: devData.expMonthBeforeJoin,
      joining_date: devData.joining_date,
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

export const fetchDevService = async (body: devValidation.fetchDevBody) => {
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

  const [data, total] = await Promise.all([
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

  const formatted = data.map((dev) => ({
    id: dev.id,
    developer_name: dev.developer_name,
    email: dev.email,
    position: dev.position,
    joining_date: dev.joining_date,
    expYearBeforeJoin: dev.expYearBeforeJoin,
    expMonthBeforeJoin: dev.expMonthBeforeJoin,
    salary: dev.salary,
    isOnLeave: dev.isOnLeave,
    reliving_date: dev.reliving_date,
    status: dev.status,
    techStacks: dev.techskills.map((t) => t.techStack),
  }));

  return {
    data: formatted,
    total,
    page: body.page,
    limit: body.limit,
  };
};

export const devExistService = async (email: string) => {
  console.log("Developer exist service start");
  const isDevExist = await prisma.developer_Team.findFirst({
    where: { status: Dev_status.ACTIVE, email: email },
  });
  console.log("Developer exist service end");
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

export const updateDevService = async (id: string, body) => {
  console.log("update developer service start");
  const updatedDev = await prisma.developer_Team.update({
    where: { id: id },
    data: {
      developer_name: body.developer_name,
      email: body.email,
      reliving_date: body.reliving_date,
      joining_date: body.joining_date,
      techskills: {
        deleteMany: {},
        create: body.techskills.map((id: string) => ({
          techStack: {
            connect: { id },
          },
        })),
      },
      position: body.position,
      salary: body.salary,
    },
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

export const fetchAllDetails = async (id: string) => {
  const response = await prisma.developer_Team.findFirst({
    where: { status: Dev_status.ACTIVE, id: id },
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
  });

  const formatted = {
    id: response?.id,
    developer_name: response?.developer_name,
    email: response?.email,
    position: response?.position,
    joining_date: response?.joining_date,
    expYearBeforeJoin: response?.expYearBeforeJoin,
    expMonthBeforeJoin: response?.expMonthBeforeJoin,
    salary: response?.salary,
    isOnLeave: response?.isOnLeave,
    reliving_date: response?.reliving_date,
    status: response?.status,
    techStacks: response?.techskills.map((t) => t.techStack),
  };

  return formatted;
};
