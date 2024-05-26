/*
  Warnings:

  - You are about to drop the column `Jurusan` on the `riwayat_pendidikan` table. All the data in the column will be lost.
  - Added the required column `jurusan` to the `riwayat_pendidikan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `riwayat_pendidikan` DROP COLUMN `Jurusan`,
    ADD COLUMN `jurusan` VARCHAR(191) NOT NULL;
