/*
  Warnings:

  - You are about to drop the column `experience` on the `Developer_Team` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `Developer_Team` table. All the data in the column will be lost.
  - Added the required column `expMonthBeforeJoin` to the `Developer_Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expYearBeforeJoin` to the `Developer_Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reliving_date` to the `Developer_Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Developer_Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Developer_Team" DROP COLUMN "experience",
DROP COLUMN "isDelete",
ADD COLUMN     "expMonthBeforeJoin" INTEGER NOT NULL,
ADD COLUMN     "expYearBeforeJoin" INTEGER NOT NULL,
ADD COLUMN     "isOnLeave" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reliving_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "salary" DECIMAL(65,30) NOT NULL;
