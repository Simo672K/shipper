-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'FINISHED', 'REJECTED');

-- CreateTable
CREATE TABLE "TripPack" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "pricing" DOUBLE PRECISION NOT NULL,
    "typeVehicle" TEXT NOT NULL,

    CONSTRAINT "TripPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripOrder" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "placedBy" UUID NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripOrderAssigned" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL,
    "assignedTo" UUID NOT NULL,

    CONSTRAINT "TripOrderAssigned_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TripOrder_placedBy_key" ON "TripOrder"("placedBy");

-- CreateIndex
CREATE UNIQUE INDEX "TripOrderAssigned_orderId_key" ON "TripOrderAssigned"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "TripOrderAssigned_assignedTo_key" ON "TripOrderAssigned"("assignedTo");

-- AddForeignKey
ALTER TABLE "TripOrder" ADD CONSTRAINT "TripOrder_placedBy_fkey" FOREIGN KEY ("placedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripOrderAssigned" ADD CONSTRAINT "TripOrderAssigned_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "TripOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripOrderAssigned" ADD CONSTRAINT "TripOrderAssigned_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
