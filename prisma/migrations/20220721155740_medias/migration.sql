/*
  Warnings:

  - Added the required column `BlogId` to the `medias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medias` ADD COLUMN `BlogId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `BlogId` ON `medias`(`BlogId`);

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_ibfk_1` FOREIGN KEY (`BlogId`) REFERENCES `blogs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
