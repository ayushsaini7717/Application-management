/*
  Warnings:

  - You are about to drop the column `Fname` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Fname",
ADD COLUMN     "password" TEXT NOT NULL;
