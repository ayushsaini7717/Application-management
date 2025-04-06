/*
  Warnings:

  - You are about to drop the column `desc` on the `jobopenings` table. All the data in the column will be lost.
  - Added the required column `experience` to the `jobopenings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_desc` to the `jobopenings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_desc` to the `jobopenings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobopenings" DROP COLUMN "desc",
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "full_desc" TEXT NOT NULL,
ADD COLUMN     "short_desc" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Responsibilities" (
    "id" TEXT NOT NULL,
    "responsibility" TEXT NOT NULL,
    "jobid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Requirements" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "jobid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Benifits" (
    "id" TEXT NOT NULL,
    "benifit" TEXT NOT NULL,
    "Jobid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" TEXT NOT NULL,
    "Skill" TEXT NOT NULL,
    "Jobid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Responsibilities_id_key" ON "Responsibilities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Requirements_id_key" ON "Requirements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Benifits_id_key" ON "Benifits"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_id_key" ON "Skills"("id");

-- AddForeignKey
ALTER TABLE "Responsibilities" ADD CONSTRAINT "Responsibilities_jobid_fkey" FOREIGN KEY ("jobid") REFERENCES "jobopenings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirements" ADD CONSTRAINT "Requirements_jobid_fkey" FOREIGN KEY ("jobid") REFERENCES "jobopenings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benifits" ADD CONSTRAINT "Benifits_Jobid_fkey" FOREIGN KEY ("Jobid") REFERENCES "jobopenings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_Jobid_fkey" FOREIGN KEY ("Jobid") REFERENCES "jobopenings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
