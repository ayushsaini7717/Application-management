-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_UserId_fkey";

-- AlterTable
ALTER TABLE "application" ALTER COLUMN "UserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
