/*
  Warnings:

  - Added the required column `recipient_name` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addresses" ADD COLUMN     "phone" VARCHAR(50),
ADD COLUMN     "recipient_name" VARCHAR(50) NOT NULL;
