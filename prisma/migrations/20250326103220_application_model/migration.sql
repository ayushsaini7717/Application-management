-- CreateTable
CREATE TABLE "application" (
    "id" TEXT NOT NULL,
    "Fname" TEXT NOT NULL,
    "Lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "application_id_key" ON "application"("id");
