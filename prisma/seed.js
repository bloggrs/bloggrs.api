const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a test user if not exists
  // const user = await prisma.users.create({
  //   data: {
  //     email: "test@example.com",
  //     password: "password123", // In production, this should be hashed
  //     first_name: "Test", 
  //     last_name: "User",
  //     isGuest: false
  //   }
  // });

  // Create a test blog category if not exists
  // const category = await prisma.blogcategories.create({
  //   data: {
  //     name: "Test Category"
  //   }
  // });

  // Create a test blog theme if not exists
  // const theme = await prisma.blogthemes.create({
  //   data: {
  //     name: "Test Theme",
  //     description: "A test theme",
  //     image_url: "https://example.com/theme.jpg"
  //   }
  // });

  // Create a test blog
  const blog = await prisma.blogs.create({
    data: {
      users: { connect: { id: 1 } },
      name: "Test Blog",
      description: "A test blog for development",
      slug: "test-blog", 
      blogthemes: { connect: { id: 1 } },
      blogcategories: { connect: { id: 1 } },
      publickeys: {
        create: {
          id: "test_pk_" + Math.random().toString(36).substring(2)
        }
      }
    },
    include: {
      publickeys: true
    }
  });

  // Create mock components
  const homeComponent = await prisma.PageComponent.create({
    data: {
      name: "HomePage",
      content: `
        <div class="home-page">
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <div class="features">
            {props.features.map(feature => (
              <div class="feature">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      `,
      props: {
        title: "string",
        description: "string",
        features: "array"
      }
    }
  });

  const aboutComponent = await prisma.PageComponent.create({
    data: {
      name: "AboutPage", 
      content: `
        <div class="about-page">
          <h1>{props.title}</h1>
          <div class="about-content">
            <img src="{props.imageUrl}" alt="{props.imageAlt}" />
            <div class="text-content">
              <h2>{props.subtitle}</h2>
              <p>{props.content}</p>
            </div>
          </div>
        </div>
      `,
      props: {
        title: "string",
        subtitle: "string",
        content: "string",
        imageUrl: "string",
        imageAlt: "string"
      }
    }
  });

  // Create pages with the components
  await prisma.Page.create({
    data: {
      path: "/",
      title: "Home",
      blogId: blog.id,
      componentId: homeComponent.id,
      props: {
        title: "Welcome to Our Platform",
        description: "Discover amazing features and capabilities",
        features: [
          {
            id: 1,
            title: "Dynamic Routing",
            description: "Routes managed through database"
          },
          {
            id: 2,
            title: "Real-time Updates", 
            description: "Instant page updates via WebSocket"
          }
        ]
      },
      isPublished: true
    }
  });

  await prisma.Page.create({
    data: {
      path: "/about",
      title: "About Us",
      blogId: blog.id,
      componentId: aboutComponent.id,
      props: {
        title: "About Our Company",
        subtitle: "Our Story",
        content: "We are dedicated to providing the best experience...",
        imageUrl: "https://picsum.photos/800/400",
        imageAlt: "Our team"
      },
      isPublished: true
    }
  });

  console.log(`Created blog with id: ${blog.id}`);
  console.log(`Created API key: ${blog.publickeys[0].id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });