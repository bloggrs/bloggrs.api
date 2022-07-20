/*
  Warnings:

  - You are about to drop the `pageviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sitesessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pageviews` DROP FOREIGN KEY `pageviews_SiteSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `sitesessions` DROP FOREIGN KEY `sitesessions_BlogId_fkey`;

-- DropForeignKey
ALTER TABLE `sitesessions` DROP FOREIGN KEY `sitesessions_UserId_fkey`;

-- DropTable
DROP TABLE `pageviews`;

-- DropTable
DROP TABLE `sitesessions`;

-- CreateTable
CREATE TABLE `medias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fieldName` VARCHAR(255) NOT NULL,
    `originalName` VARCHAR(255) NOT NULL,
    `encoding` VARCHAR(255) NOT NULL,
    `mimetype` VARCHAR(255) NOT NULL,
    `size` INTEGER NOT NULL,
    `media_url` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
