/*
  Warnings:

  - You are about to drop the column `level` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "level",
ALTER COLUMN "upperLevel" DROP NOT NULL;
