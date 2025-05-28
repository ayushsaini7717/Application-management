/*
  Warnings:

  - Added the required column `JobId` to the `application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "application" ADD COLUMN     "JobId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_JobId_fkey" FOREIGN KEY ("JobId") REFERENCES "jobopenings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
