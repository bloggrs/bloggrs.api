/*
  Warnings:

  - Added the required column `BlogThemeId` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blogs` ADD COLUMN `BlogThemeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `blogthemes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `BlogThemeId` ON `blogs`(`BlogThemeId`);

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_ibfk_3` FOREIGN KEY (`BlogThemeId`) REFERENCES `blogthemes`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
