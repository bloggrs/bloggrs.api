const { PrismaClient } = require('../generated/client');
let prisma;

try {
  prisma = new PrismaClient();
  console.log('Prisma client initialized for seeding');
} catch (error) {
  console.error('Error initializing Prisma client for seeding:', error);
  process.exit(1);
}

/**
 * Seed the database with initial data
 */
async function main() {
  console.log('Starting to seed the database...');
  
  try {
    // Check if we already have data
    const influencerCount = await prisma.influencer.count();
    
    if (influencerCount > 0) {
      console.log(`Database already has ${influencerCount} influencers, skipping seed`);
      return;
    }
    
    console.log('No existing data found, proceeding with seed');
    
    // Create brands
    console.log('Creating brands...');
    const fashionBrand = await prisma.brand.create({
      data: {
        name: 'StyleMatch',
        logo: 'https://via.placeholder.com/150?text=StyleMatch',
        industry: 'Fashion',
        website: 'https://stylematch.example.com',
        description: 'Leading fashion brand for young adults.',
        contactName: 'Emma Johnson',
        contactEmail: 'emma@stylematch.example.com',
        contactPhone: '555-123-4567'
      }
    });
    
    const beautyBrand = await prisma.brand.create({
      data: {
        name: 'GlowUp',
        logo: 'https://via.placeholder.com/150?text=GlowUp',
        industry: 'Beauty',
        website: 'https://glowup.example.com',
        description: 'Premium skincare and beauty products.',
        contactName: 'Michael Chen',
        contactEmail: 'michael@glowup.example.com',
        contactPhone: '555-789-0123'
      }
    });
    
    // Create influencers
    console.log('Creating influencers...');
    const fashionInfluencer = await prisma.influencer.create({
      data: {
        name: 'Alex Morgan',
        handle: 'alexstyle',
        image: 'https://via.placeholder.com/300?text=AlexMorgan',
        bio: 'Fashion enthusiast sharing daily outfit inspiration.',
        category: 'Fashion & Style',
        followers: 850000,
        engagementRate: 3.2,
        posts: 457,
        verified: true,
        featured: true,
        email: 'alex@example.com',
        phone: '555-111-2222',
        location: 'New York, NY',
        tags: ['fashion', 'style', 'outfits'],
        socialProfiles: {
          create: [
            {
              platform: 'Instagram',
              handle: 'alexstyle',
              url: 'https://instagram.com/alexstyle',
              followers: 850000
            },
            {
              platform: 'TikTok',
              handle: 'alexstyletok',
              url: 'https://tiktok.com/@alexstyletok',
              followers: 650000
            }
          ]
        }
      }
    });
    
    const beautyInfluencer = await prisma.influencer.create({
      data: {
        name: 'Jamie Lee',
        handle: 'jamiebeauty',
        image: 'https://via.placeholder.com/300?text=JamieLee',
        bio: 'Beauty guru with a passion for skincare and makeup tips.',
        category: 'Beauty & Makeup',
        followers: 1200000,
        engagementRate: 4.5,
        posts: 612,
        verified: true,
        featured: false,
        email: 'jamie@example.com',
        phone: '555-333-4444',
        location: 'Los Angeles, CA',
        tags: ['beauty', 'makeup', 'skincare'],
        socialProfiles: {
          create: [
            {
              platform: 'Instagram',
              handle: 'jamiebeauty',
              url: 'https://instagram.com/jamiebeauty',
              followers: 1200000
            },
            {
              platform: 'YouTube',
              handle: 'JamieBeautyTV',
              url: 'https://youtube.com/c/JamieBeautyTV',
              followers: 980000
            }
          ]
        }
      }
    });
    
    console.log('Database seeded successfully!');
    console.log(`Created ${await prisma.brand.count()} brands`);
    console.log(`Created ${await prisma.influencer.count()} influencers`);
    console.log(`Created ${await prisma.socialProfile.count()} social profiles`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Execute the seed function
main()
  .catch((e) => {
    console.error('Error in seed script:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma client connection
    await prisma.$disconnect();
  }); 