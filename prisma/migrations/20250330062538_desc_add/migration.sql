/*
  Warnings:

  - Added the required column `desc` to the `jobopenings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobopenings" ADD COLUMN     "desc" TEXT NOT NULL;
