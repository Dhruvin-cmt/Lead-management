/*
  Warnings:

  - Added the required column `email` to the `Developer_Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Developer_Team" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "reliving_date" DROP NOT NULL;
