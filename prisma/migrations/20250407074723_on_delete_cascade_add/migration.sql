-- DropForeignKey
ALTER TABLE "Benifits" DROP CONSTRAINT "Benifits_jobid_fkey";

-- DropForeignKey
ALTER TABLE "Requirements" DROP CONSTRAINT "Requirements_jobid_fkey";

-- DropForeignKey
ALTER TABLE "Responsibilities" DROP CONSTRAINT "Responsibilities_jobid_fkey";

-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_jobid_fkey";

-- AddForeignKey
ALTER TABLE "Responsibilities" ADD CONSTRAINT "Responsibilities_jobid_fkey" FOREIGN KEY ("jobid") REFERENCES "jobopenings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirements" ADD CONSTRAINT "Requirements_jobid_fkey" FOREIGN KEY ("jobid") REFERENCES "jobopenings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benifits" ADD CONSTRAINT "Benifits_jobid_fkey" FOREIGN KEY ("jobid") REFERENCES "jobopenings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_jobid_fkey" FOREIGN KEY ("jobid") REFERENCES "jobopenings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
