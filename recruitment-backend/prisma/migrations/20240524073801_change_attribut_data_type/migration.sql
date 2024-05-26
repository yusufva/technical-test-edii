/*
  Warnings:

  - You are about to alter the column `pendapatan` on the `riwayat_pekerjaan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `ipk` on the `riwayat_pendidikan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `riwayat_pekerjaan` MODIFY `pendapatan` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `riwayat_pendidikan` MODIFY `ipk` DECIMAL(65, 30) NOT NULL;
