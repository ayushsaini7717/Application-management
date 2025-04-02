/*
  Warnings:

  - Added the required column `date` to the `application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "application" ADD COLUMN     "date" TEXT NOT NULL,
ALTER COLUMN "position" DROP DEFAULT;
