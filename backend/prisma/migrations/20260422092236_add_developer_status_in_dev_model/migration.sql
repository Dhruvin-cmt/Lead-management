-- CreateEnum
CREATE TYPE "Dev_status" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Developer_Team" ADD COLUMN     "status" "Dev_status" NOT NULL DEFAULT 'ACTIVE';
