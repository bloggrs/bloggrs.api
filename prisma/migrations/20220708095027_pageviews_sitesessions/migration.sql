-- CreateTable
CREATE TABLE `sitesessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `BlogId` INTEGER NOT NULL,
    `endedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pageviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pathname` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `SiteSessionId` INTEGER NOT NULL,

    UNIQUE INDEX `pageviews_pathname_key`(`pathname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sitesessions` ADD CONSTRAINT `sitesessions_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `blogs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sitesessions` ADD CONSTRAINT `sitesessions_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pageviews` ADD CONSTRAINT `pageviews_SiteSessionId_fkey` FOREIGN KEY (`SiteSessionId`) REFERENCES `sitesessions`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
