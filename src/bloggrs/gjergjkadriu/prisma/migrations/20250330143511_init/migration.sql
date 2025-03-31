-- CreateTable
CREATE TABLE `Influencer` (
    `id` VARCHAR(191) NOT NULL,
    `handle` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `followers` INTEGER NOT NULL DEFAULT 0,
    `engagementRate` DOUBLE NOT NULL DEFAULT 0,
    `posts` INTEGER NOT NULL DEFAULT 0,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `tagType` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Influencer_handle_key`(`handle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `industry` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campaign` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `budget` DOUBLE NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `brandId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sponsorship` (
    `id` VARCHAR(191) NOT NULL,
    `influencerId` VARCHAR(191) NOT NULL,
    `brandId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `amount` DOUBLE NULL,
    `details` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialProfile` (
    `id` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `followers` INTEGER NOT NULL DEFAULT 0,
    `influencerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Content` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `caption` VARCHAR(191) NULL,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `comments` INTEGER NOT NULL DEFAULT 0,
    `shares` INTEGER NOT NULL DEFAULT 0,
    `impressions` INTEGER NOT NULL DEFAULT 0,
    `influencerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `publishedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CampaignToInfluencer` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CampaignToInfluencer_AB_unique`(`A`, `B`),
    INDEX `_CampaignToInfluencer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sponsorship` ADD CONSTRAINT `Sponsorship_influencerId_fkey` FOREIGN KEY (`influencerId`) REFERENCES `Influencer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sponsorship` ADD CONSTRAINT `Sponsorship_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialProfile` ADD CONSTRAINT `SocialProfile_influencerId_fkey` FOREIGN KEY (`influencerId`) REFERENCES `Influencer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_influencerId_fkey` FOREIGN KEY (`influencerId`) REFERENCES `Influencer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CampaignToInfluencer` ADD CONSTRAINT `_CampaignToInfluencer_A_fkey` FOREIGN KEY (`A`) REFERENCES `Campaign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CampaignToInfluencer` ADD CONSTRAINT `_CampaignToInfluencer_B_fkey` FOREIGN KEY (`B`) REFERENCES `Influencer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
