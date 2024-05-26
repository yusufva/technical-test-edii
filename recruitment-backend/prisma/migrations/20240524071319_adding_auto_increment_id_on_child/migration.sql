/*
  Warnings:

  - You are about to drop the column `user_id` on the `biodata` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `biodata` DROP FOREIGN KEY `biodata_user_id_fkey`;

-- AlterTable
ALTER TABLE `biodata` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `riwayat_pekerjaan` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `riwayat_pelatihan` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `riwayat_pendidikan` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AddForeignKey
ALTER TABLE `biodata` ADD CONSTRAINT `biodata_id_fkey` FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
