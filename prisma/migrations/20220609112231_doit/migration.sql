/*
  Warnings:

  - Added the required column `level` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "level" INTEGER NOT NULL,
ALTER COLUMN "upperLevel" SET DATA TYPE TEXT;
