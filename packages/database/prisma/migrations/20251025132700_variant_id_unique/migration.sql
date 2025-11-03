/*
  Warnings:

  - A unique constraint covering the columns `[variant_id]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inventory_variant_id_key" ON "Inventory"("variant_id");
