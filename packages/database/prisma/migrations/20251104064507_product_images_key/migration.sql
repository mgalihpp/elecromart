/*
  Warnings:

  - Added the required column `key` to the `ProductImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductImages" ADD COLUMN     "key" TEXT NOT NULL;
