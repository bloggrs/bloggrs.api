const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.users.create({
  //   data: {
  //     email: "test@example.com",
  //     password: "password123", // In production, this should be hashed
  //     first_name: "Test", 
  //     last_name: "User",
  //     isGuest: false
  //   }
  // });

  // const category = await prisma.blogcategories.create({
  //   data: {
  //     name: "Test Category"
  //   }
  // });

  // const theme = await prisma.blogthemes.create({
  //   data: {
  //     name: "Test Theme",
  //     description: "A test theme",
  //     image_url: "https://example.com/theme.jpg"
  //   }
  // });

  // Create a test blog
  // const blog = await prisma.blogs.create({
  //   data: {
  //     users: { connect: { id: 1 } },
  //     name: "Test Blog",
  //     description: "A test blog for development",
  //     slug: "test-blog", 
  //     blogthemes: { connect: { id: 1 } },
  //     blogcategories: { connect: { id: 1 } },
  //     publickeys: {
  //       create: {
  //         id: "test_pk_" + Math.random().toString(36).substring(2)
  //       }
  //     }
  //   },
  //   include: {
  //     publickeys: true
  //   }
  // });

  // // Create mock components
  // const homeComponent = await prisma.PageComponent.create({
  //   data: {
  //     name: "HomePage",
  //     content: `
  //       <div class="home-page">
  //         <h1>{props.title}</h1>
  //         <p>{props.description}</p>
  //         <div class="features">
  //           {props.features.map(feature => (
  //             <div class="feature">
  //               <h3>{feature.title}</h3>
  //               <p>{feature.description}</p>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     `,
  //     props: {
  //       title: "string",
  //       description: "string",
  //       features: "array"
  //     }
  //   }
  // });

  // const aboutComponent = await prisma.PageComponent.create({
  //   data: {
  //     name: "AboutPage", 
  //     content: `
  //       <div class="about-page">
  //         <h1>{props.title}</h1>
  //         <div class="about-content">
  //           <img src="{props.imageUrl}" alt="{props.imageAlt}" />
  //           <div class="text-content">
  //             <h2>{props.subtitle}</h2>
  //             <p>{props.content}</p>
  //           </div>
  //         </div>
  //       </div>
  //     `,
  //     props: {
  //       title: "string",
  //       subtitle: "string",
  //       content: "string",
  //       imageUrl: "string",
  //       imageAlt: "string"
  //     }
  //   }
  // });

  // const blogListComponent = await prisma.PageComponent.create({
  //   data: {
  //     name: "BlogListPage",
  //     content: `
  //       <%- include('client/components/Header') %>
  //       <div class="blog-list-page">
  //         <h1><%= props.title %></h1>
  //         <div class="posts-container">
  //           <% props.posts.forEach(function(post) { %>
  //             <%- include('client/components/PostCard', { post }) %>
  //           <% }); %>
  //         </div>
  //         <%- include('client/components/Pagination', { 
  //           currentPage: props.currentPage,
  //           totalPages: props.totalPages,
  //           baseUrl: props.baseUrl 
  //         }) %>
  //       </div>
  //       <%- include('client/components/Footer') %>
  //     `,
  //     props: {
  //       title: "string",
  //       posts: "array",
  //       currentPage: "number",
  //       totalPages: "number",
  //       baseUrl: "string"
  //     }
  //   }
  // });

  // // Create some samplawait prisma.blogs.create({
  //   data: {
  //     users: { connect: { id: 1 } },
  //     name: "Test Blog",
  //     description: "A test blog for development",
  //     slug: "test-blog", 
  //     blogthemes: { connect: { id: 1 } },
  //     blogcategories: { connect: { id: 1 } },
  //     publickeys: {
  //       create: {
  //         id: "test_pk_" + Math.random().toString(36).substring(2)
  //       }
  //     }
  //   },
  //   include: {
  //     publickeys: true
  //   }
  // });

  // // Create mock components
  // const homeComponent = await prisma.PageComponent.create({
  //   data: {
  //     name: "HomePage",
  //     content: `
  //       <div class="home-page">
  //         <h1>{props.title}</h1>
  //         <p>{props.description}</p>
  //         <div class="features">
  //           {props.features.map(feature => (
  //             <div class="feature">
  //               <h3>{feature.title}</h3>
  //               <p>{feature.description}</p>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     `,
  //     props: {
  //       title: "string",
  //       description: "string",
  //       features: "array"
  //     }
  //   }
  // });

  // const aboutComponent = await prisma.PageComponent.create({
  //   data: {
  //     name: "AboutPage", 
  //     content: `
  //       <div class="about-page">
  //         <h1>{props.title}</h1>
  //         <div class="about-content">
  //           <img src="{props.imageUrl}" alt="{props.imageAlt}" />
  //           <div class="text-content">
  //             <h2>{props.subtitle}</h2>
  //             <p>{props.content}</p>
  //           </div>
  //         </div>
  //       </div>
  //     `,
  //     props: {
  //       title: "string",
  //       subtitle: "string",
  //       content: "string",
  //       imageUrl: "string",
  //       imageAlt: "string"
  //     }
  //   }
  // });

  // const blogListComponent = await prisma.PageComponent.create({
  //   data: {
  //     name: "BlogListPage",
  //     content: `
  //       <%- include('client/components/Header') %>
  //       <div class="blog-list-page">
  //         <h1><%= props.title %></h1>
  //         <div class="posts-container">
  //           <% props.posts.forEach(function(post) { %>
  //             <%- include('client/components/PostCard', { post }) %>
  //           <% }); %>
  //         </div>
  //         <%- include('client/components/Pagination', { 
  //           currentPage: props.currentPage,
  //           totalPages: props.totalPages,
  //           baseUrl: props.baseUrl 
  //         }) %>
  //       </div>
  //       <%- include('client/components/Footer') %>
  //     `,
  //     props: {
  //       title: "string",
  //       posts: "array",
  //       currentPage: "number",
  //       totalPages: "number",
  //       baseUrl: "string"
  //     }
  //   }
  // });

  // Create some sample posts first
  const samplePosts = await Promise.all([
    prisma.posts.create({
    data: {
        popularity: 1,
        title: "First Blog Post",
        html_content: "This is the content of our first blog post...",
        slug: "first-blog-post",
        status: "PUBLISHED",
        blogs: { connect: { id: 1 } },
        users: { connect: { id: 1 } }
      }
    }),
    prisma.posts.create({
    data: {
        popularity: 1,
        title: "Second Blog Post",
        html_content: "This is the content of our second blog post...",
        slug: "second-blog-post",
        status: "PUBLISHED",
        blogs: { connect: { id: 1 } },
        users: { connect: { id: 1 } }
      }
    })
  ]);

  // Create component templates
  const templates = [
    {
      name: 'Header',
      content: `
        <header class="site-header">
            <nav class="main-nav">
                <div class="nav-brand">
                    <a href="/" class="logo">Blog</a>
                </div>
                <div class="nav-links">
                    <a href="/" class="nav-link">Home</a>
                    <a href="/blog" class="nav-link">Blog</a>
                    <a href="/about" class="nav-link">About</a>
                </div>
                <div class="nav-search">
                    <form action="/search" method="GET" class="search-form">
                        <input type="text" name="q" placeholder="Search posts..." class="search-input">
                        <button type="submit" class="search-button">Search</button>
                    </form>
                </div>
            </nav>
        </header>
        <main class="main-content">
      `
    },
    {
      name: 'Footer',
      content: `
        </main>
        <footer class="site-footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About Us</h3>
                    <p>A dynamic blog platform built with modern technologies.</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Connect With Us</h3>
                    <div class="social-links">
                        <a href="#" class="social-link"><i class="icon-twitter"></i></a>
                        <a href="#" class="social-link"><i class="icon-facebook"></i></a>
                        <a href="#" class="social-link"><i class="icon-instagram"></i></a>
                        <a href="#" class="social-link"><i class="icon-linkedin"></i></a>
              </div>
          </div>
        </div>
            <div class="footer-bottom">
                <p>&copy; <%= props.year %> Blog Platform. All rights reserved.</p>
            </div>
        </footer>
      `
    },
    {
      name: 'PostCard',
      content: `
        <article class="post-card">
            <div class="post-header">
                <h2 class="post-title">
                    <a href="/blog/<%= post.slug %>"><%= post.title %></a>
                </h2>
                <div class="post-meta">
                    <span class="post-author">
                        By <%= post.users.first_name %> <%= post.users.last_name %>
                    </span>
                    <span class="post-date">
                        <%= new Date(post.createdAt).toLocaleDateString() %>
                    </span>
                </div>
            </div>
            <div class="post-content">
                <p><%= post.html_content %></p>
            </div>
            <div class="post-footer">
                <a href="/blog/<%= post.slug %>" class="read-more">Read More</a>
                <div class="post-stats">
                    <span class="comments-count">
                        <i class="icon-comments"></i>
                        <%= post.comments_count || 0 %> Comments
                    </span>
                    <span class="likes-count">
                        <i class="icon-heart"></i>
                        <%= post.likes_count || 0 %> Likes
                    </span>
                </div>
            </div>
        </article>
      `
    },
    {
      name: 'Pagination',
      content: `
        <div class="pagination">
            <% if (props.totalPages > 1) { %>
                <div class="pagination-container">
                    <% if (props.currentPage > 1) { %>
                        <a href="<%= props.baseUrl %>?page=<%= props.currentPage - 1 %>" class="pagination-link prev">
                            &laquo; Previous
                        </a>
                    <% } %>

                    <div class="pagination-numbers">
                        <% for(let i = 1; i <= props.totalPages; i++) { %>
                            <% if (i === props.currentPage) { %>
                                <span class="pagination-number active"><%= i %></span>
                            <% } else { %>
                                <a href="<%= props.baseUrl %>?page=<%= i %>" class="pagination-number">
                                    <%= i %>
                                </a>
                            <% } %>
                        <% } %>
                    </div>

                    <% if (props.currentPage < props.totalPages) { %>
                        <a href="<%= props.baseUrl %>?page=<%= props.currentPage + 1 %>" class="pagination-link next">
                            Next &raquo;
                        </a>
                    <% } %>
          </div>
            <% } %>
        </div>
      `
    }
  ];

  // Create the templates in the database
  for (const template of templates) {
    await prisma.ComponentTemplate.create({
      data: template
    });
  }

  console.log(`Created ${templates.length} component templates`);

  // Create pages with the components
  // await prisma.Page.create({
  //   data: {
  //     path: "/",
  //     title: "Home",
  //     blogId: 1,
  //     componentId: 1,
  //     props: {
  //       title: "Welcome to Our Platform",
  //       description: "Discover amazing features and capabilities",
  //       features: [
  //         {
  //           id: 1,
  //           title: "Dynamic Routing",
  //           description: "Routes managed through database"
  //         },
  //         {
  //           id: 2,
  //           title: "Real-time Updates", 
  //           description: "Instant page updates via WebSocket"
  //         }
  //       ]
  //     },
  //     isPublished: true
  //   }
  // });

  // await prisma.Page.create({
  //   data: {
  //     path: "/about",
  //     title: "About Us",
  //     blogId: 1,
  //     componentId: 2,
  //     props: {
  //       title: "About Our Company",
  //       subtitle: "Our Story",
  //       content: "We are dedicated to providing the best experience...",
  //       imageUrl: "https://picsum.photos/800/400",
  //       imageAlt: "Our team"
  //     },
  //     isPublished: true
  //   }
  // });

  // // Create blog listing page
  // await prisma.Page.create({
  //   data: {
  //     path: "/blog",
  //     title: "Blog Posts",
  //     blogId: 1,
  //     componentId: 1,
  //     props: {
  //       title: "Latest Blog Posts",
  //       // The actual posts will be fetched dynamically using the DataProvider
  //       currentPage: 1,
  //       totalPages: 1,
  //       baseUrl: "/blog"
  //     },
  //     isPublished: true
  //   }
  // });

  // // Create a DataProvider for fetching posts
  // const postsProvider = await prisma.DataProvider.create({
  //   data: {
  //     name: "BlogPostsProvider",
  //     type: "query",
  //     config: {
  //       model: "posts",
  //       select: {
  //         id: true,
  //         title: true,
  //         content: true,
  //         slug: true,
  //         createdAt: true,
  //         users: {
  //           select: {
  //             first_name: true,
  //             last_name: true
  //           }
  //         }
  //       },
  //       where: {
  //         status: "PUBLISHED"
  //       },
  //       orderBy: {
  //         createdAt: "desc"
  //       },
  //       pagination: true
  //     },
  //     parameters: {
  //       page: {
  //         type: "number",
  //         default: 1
  //       },
  //       perPage: {
  //         type: "number",
  //         default: 10
  //       },
  //       blogId: {
  //         type: "number",
  //         required: true
  //       }
  //     }
  //   }
  // });

  // // Link the DataProvider to the Page
  // await prisma.PageDataSource.create({
  //   data: {
  //     pageId: 1,
  //     providerId: 1,
  //     parameterMap: {
  //       blogId: "context.1",
  //       page: "query.page",
  //       perPage: "10"
  //     }
  //   }
  // });

  console.log(`Created blog with id: ${1}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });