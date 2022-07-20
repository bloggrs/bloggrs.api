-- CreateTable
CREATE TABLE `posttags` (
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `TagId` INTEGER NOT NULL,
    `PostId` INTEGER NOT NULL,

    INDEX `PostId`(`PostId`),
    PRIMARY KEY (`TagId`, `PostId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `name`(`name`),
    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posttags` ADD CONSTRAINT `posttags_ibfk_1` FOREIGN KEY (`TagId`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posttags` ADD CONSTRAINT `posttags_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
