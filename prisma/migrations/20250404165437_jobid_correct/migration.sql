/*
  Warnings:

  - You are about to drop the column `Jobid` on the `Benifits` table. All the data in the column will be lost.
  - You are about to drop the column `Jobid` on the `Skills` table. All the data in the column will be lost.
  - Added the required column `jobid` to the `Benifits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobid` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Benifits" DROP CONSTRAINT "Benifits_Jobid_fkey";

-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_Jobid_fkey";

-- AlterTable
ALTER TABLE "Benifits" DROP COLUMN "Jobid",
ADD COLUMN     "jobid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "Jobid",
ADD COLUMN     "jobid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Benifits" ADD CONSTRAINT "Benifits_jobid_fkey" FOREIGN KEY ("jobid") REFERENCES "jobopenings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_jobid_fkey" FOREIGN KEY ("jobid") REFERENCES "jobopenings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
