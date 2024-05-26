/*
  Warnings:

  - You are about to drop the column `orang_terdekat` on the `biodata` table. All the data in the column will be lost.
  - Added the required column `kerabat` to the `biodata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `biodata` DROP COLUMN `orang_terdekat`,
    ADD COLUMN `kerabat` VARCHAR(191) NOT NULL;
