/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Tech_category" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'TOOL', 'DATA_SCIENCE');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Technology" (
    "name" TEXT NOT NULL,
    "category" "Tech_category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("name")
);
