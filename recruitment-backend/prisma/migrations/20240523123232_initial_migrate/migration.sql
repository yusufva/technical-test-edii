-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL DEFAULT 2,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biodata` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `posisi` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(17) NOT NULL,
    `ttl` VARCHAR(191) NOT NULL,
    `kelamin` VARCHAR(191) NOT NULL,
    `agama` VARCHAR(191) NOT NULL,
    `golongan_darah` VARCHAR(2) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `alamat_ktp` VARCHAR(191) NOT NULL,
    `alamat_domisili` VARCHAR(191) NOT NULL,
    `telpon` VARCHAR(15) NOT NULL,
    `orang_terdekat` VARCHAR(191) NOT NULL,
    `skill` VARCHAR(191) NOT NULL,
    `kesiapan` BIT(1) NOT NULL,
    `expektasi_gaji` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riwayat_pelatihan` (
    `id` INTEGER NOT NULL,
    `kursus` VARCHAR(191) NOT NULL,
    `sertifikat` BIT(1) NOT NULL,
    `tahun` VARCHAR(191) NOT NULL,
    `biodata_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riwayat_pendidikan` (
    `id` INTEGER NOT NULL,
    `jenjang` VARCHAR(191) NOT NULL,
    `institusi` VARCHAR(191) NOT NULL,
    `Jurusan` VARCHAR(191) NOT NULL,
    `lulus` VARCHAR(191) NOT NULL,
    `ipk` VARCHAR(191) NOT NULL,
    `biodata_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riwayat_pekerjaan` (
    `id` INTEGER NOT NULL,
    `perusahaan` VARCHAR(191) NOT NULL,
    `posisi` VARCHAR(191) NOT NULL,
    `pendapatan` VARCHAR(191) NOT NULL,
    `tahun` VARCHAR(191) NOT NULL,
    `biodata_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `riwayat_pelatihan` ADD CONSTRAINT `riwayat_pelatihan_biodata_id_fkey` FOREIGN KEY (`biodata_id`) REFERENCES `biodata`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `riwayat_pendidikan` ADD CONSTRAINT `riwayat_pendidikan_biodata_id_fkey` FOREIGN KEY (`biodata_id`) REFERENCES `biodata`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `riwayat_pekerjaan` ADD CONSTRAINT `riwayat_pekerjaan_biodata_id_fkey` FOREIGN KEY (`biodata_id`) REFERENCES `biodata`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
