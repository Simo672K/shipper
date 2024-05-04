/*
  Warnings:

  - You are about to drop the column `fromAddress` on the `TripOrder` table. All the data in the column will be lost.
  - You are about to drop the column `toAddress` on the `TripOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fromAddressId]` on the table `TripOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[toAddressId]` on the table `TripOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TripOrder" DROP COLUMN "fromAddress",
DROP COLUMN "toAddress",
ADD COLUMN     "fromAddressId" UUID,
ADD COLUMN     "toAddressId" UUID;

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "lang" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TripOrder_fromAddressId_key" ON "TripOrder"("fromAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "TripOrder_toAddressId_key" ON "TripOrder"("toAddressId");

-- AddForeignKey
ALTER TABLE "TripOrder" ADD CONSTRAINT "TripOrder_fromAddressId_fkey" FOREIGN KEY ("fromAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripOrder" ADD CONSTRAINT "TripOrder_toAddressId_fkey" FOREIGN KEY ("toAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
