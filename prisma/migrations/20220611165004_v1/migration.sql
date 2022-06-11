/*
  Warnings:

  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "sendDate" DROP DEFAULT,
ALTER COLUMN "deliveryDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT NOT NULL;
