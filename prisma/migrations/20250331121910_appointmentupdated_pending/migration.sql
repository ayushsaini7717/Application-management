-- AlterTable
ALTER TABLE "application" ADD COLUMN     "pending" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "scheduled" BOOLEAN NOT NULL DEFAULT false;
