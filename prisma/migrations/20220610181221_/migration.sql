-- CreateTable
CREATE TABLE `blogcategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `blogcategories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blogcontacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `BlogId` INTEGER NOT NULL,

    INDEX `blogcontacts_BlogId_idx`(`BlogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blogpostcategories` (
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CategoryId` INTEGER NOT NULL,
    `BlogId` INTEGER NOT NULL,

    INDEX `blogpostcategories_BlogId_idx`(`BlogId`),
    PRIMARY KEY (`CategoryId`, `BlogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `craftjs_json_state` TEXT NULL,
    `logo_url` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UserId` INTEGER NOT NULL,
    `BlogCategoryId` INTEGER NOT NULL,

    UNIQUE INDEX `blogs_slug_key`(`slug`),
    INDEX `blogs_BlogCategoryId_idx`(`BlogCategoryId`),
    INDEX `blogs_UserId_idx`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blocks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `isChild` BOOLEAN NOT NULL DEFAULT false,
    `PageId` INTEGER NOT NULL,

    INDEX `blocks_PageId_idx`(`PageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `children` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `BlockId` INTEGER NOT NULL,

    INDEX `children_BlockId_idx`(`BlockId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blockchildrens` (
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `BlockId` INTEGER NOT NULL,
    `ChildrenId` INTEGER NOT NULL,

    INDEX `blockchildrens_BlockId_idx`(`BlockId`),
    PRIMARY KEY (`BlockId`, `ChildrenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blockattributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    `BlockId` INTEGER NOT NULL,

    UNIQUE INDEX `blockattributes_id_key_key`(`id`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `categories_name_key`(`name`),
    UNIQUE INDEX `categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `craftjs_json_state` TEXT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `BlogId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,

    INDEX `pages_BlogId_idx`(`BlogId`),
    INDEX `pages_UserId_idx`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postcategories` (
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CategoryId` INTEGER NOT NULL,
    `PostId` INTEGER NOT NULL,

    INDEX `postcategories_PostId_idx`(`PostId`),
    PRIMARY KEY (`CategoryId`, `PostId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postcomments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `PostId` INTEGER NULL,
    `UserId` INTEGER NOT NULL,

    INDEX `postcomments_PostId_idx`(`PostId`),
    INDEX `postcomments_UserId_idx`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postlikes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `PostId` INTEGER NULL,
    `UserId` INTEGER NOT NULL,

    INDEX `postlikes_PostId_idx`(`PostId`),
    INDEX `postlikes_UserId_idx`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `html_content` TEXT NOT NULL,
    `status` ENUM('ARCHIVED', 'DRAFT', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `BlogId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,

    INDEX `posts_BlogId_idx`(`BlogId`),
    INDEX `posts_UserId_idx`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `referrals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('BLOG') NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `BlogId` INTEGER NULL,
    `UserId` INTEGER NOT NULL,

    INDEX `referrals_BlogId_idx`(`BlogId`),
    INDEX `referrals_UserId_idx`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secretkeys` (
    `id` CHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `BlogId` INTEGER NOT NULL,

    INDEX `secretkeys_BlogId_idx`(`BlogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publickeys` (
    `id` CHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `BlogId` INTEGER NOT NULL,

    INDEX `publickeys_BlogId_idx`(`BlogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teammembers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UserId` INTEGER NOT NULL,
    `BlogId` INTEGER NOT NULL,

    INDEX `teammembers_BlogId_idx`(`BlogId`),
    INDEX `teammembers_UserId_idx`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `isGuest` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `blogcontacts` ADD CONSTRAINT `blogcontacts_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `blogs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogpostcategories` ADD CONSTRAINT `blogpostcategories_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogpostcategories` ADD CONSTRAINT `blogpostcategories_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_BlogCategoryId_fkey` FOREIGN KEY (`BlogCategoryId`) REFERENCES `blogcategories`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blocks` ADD CONSTRAINT `blocks_PageId_fkey` FOREIGN KEY (`PageId`) REFERENCES `pages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `children` ADD CONSTRAINT `children_BlockId_fkey` FOREIGN KEY (`BlockId`) REFERENCES `blocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blockchildrens` ADD CONSTRAINT `blockchildrens_BlockId_fkey` FOREIGN KEY (`BlockId`) REFERENCES `blocks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blockchildrens` ADD CONSTRAINT `blockchildrens_ChildrenId_fkey` FOREIGN KEY (`ChildrenId`) REFERENCES `children`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blockattributes` ADD CONSTRAINT `blockattributes_BlockId_fkey` FOREIGN KEY (`BlockId`) REFERENCES `blocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pages` ADD CONSTRAINT `pages_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `blogs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pages` ADD CONSTRAINT `pages_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postcategories` ADD CONSTRAINT `postcategories_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postcategories` ADD CONSTRAINT `postcategories_PostId_fkey` FOREIGN KEY (`PostId`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postcomments` ADD CONSTRAINT `postcomments_PostId_fkey` FOREIGN KEY (`PostId`) REFERENCES `posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postcomments` ADD CONSTRAINT `postcomments_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postlikes` ADD CONSTRAINT `postlikes_PostId_fkey` FOREIGN KEY (`PostId`) REFERENCES `posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postlikes` ADD CONSTRAINT `postlikes_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `blogs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `blogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `secretkeys` ADD CONSTRAINT `secretkeys_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `blogs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publickeys` ADD CONSTRAINT `publickeys_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `blogs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teammembers` ADD CONSTRAINT `teammembers_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `blogs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teammembers` ADD CONSTRAINT `teammembers_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
