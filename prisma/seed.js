const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  // await prisma.page.deleteMany();
  // await prisma.componentTemplate.deleteMany();
  // await prisma.authSettings.deleteMany();
  // await prisma.blog.deleteMany();
  // await prisma.user.deleteMany();

  // // Create a test blog
  // const blog = await prisma.blogs.create({
  //   data: {
  //     name: "My First Blog",
  //     slug: "my-first-blog2", 
  //     description: "A sample blog created during seeding",
  //     blogcategories: {
  //       connect: { id : 1}
  //     },
  //     blogthemes: {
  //       connect: { id : 1}
  //     },
  //     users: {
  //       connect: { id : 1}
  //     },
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   }
  // });

  // Create auth settings
  // await prisma.authSettings.create({
  //   data: {
  //     blogId: 1,
  //     requireAuth: true,
  //     publicPaths: '/, /login, /register, /blog, /about'
  //   }
  // });

  // Create component templates
  // const templates = await prisma.componentTemplate.createMany({
  //   data: [
  //     {
  //       name: "LoginComponent",
  //       content: `
  //         <div class="auth-container">
  //           <div class="auth-box">
  //             <h2>Login</h2>
  //             <form class="auth-form" data-auth="login">
  //               <div class="form-group">
  //                 <label for="email">Email</label>
  //                 <input type="email" id="email" name="email" required />
  //               </div>
  //               <div class="form-group">
  //                 <label for="password">Password</label>
  //                 <input type="password" id="password" name="password" required />
  //               </div>
  //               <div class="form-actions">
  //                 <button type="submit">Login</button>
  //               </div>
  //               <p class="auth-links">
  //                 Don't have an account? <a href="/register">Register</a>
  //               </p>
  //             </form>
  //           </div>
  //         </div>
  //       `
  //     },
  //     {
  //       name: "RegisterComponent",
  //       content: `
  //         <div class="auth-container">
  //           <div class="auth-box">
  //             <h2>Register</h2>
  //             <form class="auth-form" data-auth="register">
  //               <div class="form-group">
  //                 <label for="first_name">First Name</label>
  //                 <input type="text" id="first_name" name="first_name" required />
  //               </div>
  //               <div class="form-group">
  //                 <label for="last_name">Last Name</label>
  //                 <input type="text" id="last_name" name="last_name" required />
  //               </div>
  //               <div class="form-group">
  //                 <label for="email">Email</label>
  //                 <input type="email" id="email" name="email" required />
  //               </div>
  //               <div class="form-group">
  //                 <label for="password">Password</label>
  //                 <input type="password" id="password" name="password" required />
  //               </div>
  //               <div class="form-actions">
  //                 <button type="submit">Register</button>
  //               </div>
  //               <p class="auth-links">
  //                 Already have an account? <a href="/login">Login</a>
  //               </p>
  //             </form>
  //           </div>
  //         </div>
  //       `
  //     },
  //     {
  //       name: "NavbarComponent",
  //       content: `
  //         <nav class="main-nav">
  //           <div class="nav-brand">
  //             <a href="/">{{blog.name}}</a>
  //           </div>
  //           <div class="nav-links">
  //             <a href="/">Home</a>
  //             <a href="/blog">Blog</a>
  //             <a href="/about">About</a>
  //             {{#if user}}
  //               <a href="/dashboard">Dashboard</a>
  //               <button type="button" data-auth="logout">Logout</button>
  //             {{else}}
  //               <a href="/login">Login</a>
  //               <a href="/register">Register</a>
  //             {{/if}}
  //           </div>
  //         </nav>
  //       `
  //     },
  //     {
  //       name: "HomeComponent",
  //       content: `
  //         <div class="home-container">
  //           <%- include('NavbarComponent', { blog: props.blog, user: props.user }) %>
  //           <div class="hero-section">
  //             <h1>Welcome to {{blog.name}}</h1>
  //             <p>Discover amazing content and join our community!</p>
  //           </div>
  //           {{#if posts.length}}
  //             <div class="featured-posts">
  //               <h2>Featured Posts</h2>
  //               <div class="posts-grid">
  //                 {{#each posts}}
  //                   <div class="post-card">
  //                     <h3>{{title}}</h3>
  //                     <p>{{excerpt}}</p>
  //                     <a href="/blog/{{slug}}">Read more</a>
  //                   </div>
  //                 {{/each}}
  //               </div>
  //             </div>
  //           {{/if}}
  //         </div>
  //       `
  //     },
  //     {
  //       name: "DashboardComponent",
  //       content: `
  //         <div class="dashboard-layout">
  //           <%- include('NavbarComponent', { blog: props.blog, user: props.user }) %>
  //           <div class="dashboard-container">
  //             <h1>Welcome, {{user.first_name}}!</h1>
  //             <div class="dashboard-stats">
  //               <div class="stat-card">
  //                 <h3>Your Posts</h3>
  //                 <p>{{stats.posts_count}}</p>
  //               </div>
  //               <div class="stat-card">
  //                 <h3>Total Views</h3>
  //                 <p>{{stats.total_views}}</p>
  //               </div>
  //               <div class="stat-card">
  //                 <h3>Comments</h3>
  //                 <p>{{stats.comments_count}}</p>
  //               </div>
  //             </div>
  //             <div class="dashboard-content">
  //               <h2>Recent Posts</h2>
  //               {{#if posts.length}}
  //                 <div class="posts-list">
  //                   {{#each posts}}
  //                     <div class="post-item">
  //                       <h3>{{title}}</h3>
  //                       <div class="post-meta">
  //                         <span>{{formatDate createdAt}}</span>
  //                         <span>{{views}} views</span>
  //                       </div>
  //                       <div class="post-actions">
  //                         <a href="/dashboard/posts/{{id}}/edit">Edit</a>
  //                         <button data-delete-post="{{id}}">Delete</button>
  //                       </div>
  //                     </div>
  //                   {{/each}}
  //                 </div>
  //               {{else}}
  //                 <p>No posts yet. <a href="/dashboard/posts/new">Create your first post</a></p>
  //               {{/if}}
  //             </div>
  //           </div>
  //         </div>
  //       `
  //     }
  //   ]
  // });

  // First create the components
  const homeComponent = await prisma.component.create({
    data: {
      name: "HomePage",
      content: `
        <div class="home-container">
          <%- include('NavbarComponent', { blog: props.blog, user: props.user }) %>
          <div class="hero-section">
            <h1>Welcome to {{blog.name}}</h1>
            <p>Discover amazing content and join our community!</p>
          </div>
          {{#if posts.length}}
            <div class="featured-posts">
              <h2>Featured Posts</h2>
              <div class="posts-grid">
                {{#each posts}}
                  <div class="post-card">
                    <h3>{{title}}</h3>
                    <p>{{excerpt}}</p>
                    <a href="/blog/{{slug}}">Read more</a>
                  </div>
                {{/each}}
              </div>
            </div>
          {{/if}}
        </div>
      `
    }
  });

  const loginComponent = await prisma.component.create({
    data: {
      name: "LoginPage",
      content: `
        <div class="login-page">
          <%- include('NavbarComponent', { blog: props.blog, user: props.user }) %>
          <div class="auth-container">
            <div class="auth-box">
              <h2>Login</h2>
              <form class="auth-form" data-auth="login">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" name="password" required />
                </div>
                <div class="form-actions">
                  <button type="submit">Login</button>
                </div>
                <p class="auth-links">
                  Don't have an account? <a href="/register">Register</a>
                </p>
              </form>
              </div>
          </div>
        </div>
      `
    }
  });

  const registerComponent = await prisma.component.create({
    data: {
      name: "RegisterPage",
      content: `
        <div class="register-page">
          <%- include('NavbarComponent', { blog: props.blog, user: props.user }) %>
          <div class="auth-container">
            <div class="auth-box">
              <h2>Register</h2>
              <form class="auth-form" data-auth="register">
                <div class="form-group">
                  <label for="first_name">First Name</label>
                  <input type="text" id="first_name" name="first_name" required />
                </div>
                <div class="form-group">
                  <label for="last_name">Last Name</label>
                  <input type="text" id="last_name" name="last_name" required />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" name="password" required />
                </div>
                <div class="form-actions">
                  <button type="submit">Register</button>
                </div>
                <p class="auth-links">
                  Already have an account? <a href="/login">Login</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      `
    }
  });

  const dashboardComponent = await prisma.component.create({
    data: {
      name: "DashboardPage",
      content: `
        <div class="dashboard-page">
          <%- include('NavbarComponent', { blog: props.blog, user: props.user }) %>
          <div class="dashboard-container">
            <h1>Welcome, <%= user.first_name %>!</h1>
            
            <div class="dashboard-stats">
              <div class="stat-card">
                <h3>Total Posts</h3>
                <p><%= data.stats.posts_count %></p>
              </div>
              <div class="stat-card">
                <h3>Total Views</h3>
                <p><%= data.stats.total_views %></p>
              </div>
              <div class="stat-card">
                <h3>Total Comments</h3>
                <p><%= data.stats.comments_count %></p>
              </div>
            </div>

            <div class="recent-posts">
              <h2>Recent Posts</h2>
              <div class="posts-list">
                <% data.posts.forEach(post => { %>
                  <div class="post-item">
                    <h3><%= post.title %></h3>
                    <p><%= post.excerpt %></p>
                    <div class="post-meta">
                      <span>Views: <%= post.views %></span>
                      <span>Published: <%= new Date(post.createdAt).toLocaleDateString() %></span>
                    </div>
                    <a href="/posts/<%= post.id %>/edit" class="edit-link">Edit Post</a>
                  </div>
                <% }) %>
              </div>
            </div>
          </div>
        </div>
      `
    }
  });

  // Now create the pages with component references
  await prisma.page.createMany({
    data: [
      {
      path: "/",
      title: "Home",
        blogId: 2,
        isPublished: true,
      componentId: homeComponent.id,
      props: {
          requireAuth: false,
          dataSources: [
            {
              provider: "HomeDataProvider",
              parameterMap: {
                blogId: "blog.id"
              }
            }
          ]
        }
      },
      {
        path: "/login",
        title: "Login",
        blogId: 1,
        isPublished: true,
        componentId: loginComponent.id,
        props: {
          requireAuth: false
        }
      },
      {
        path: "/register",
        title: "Register",
        blogId: 2,
        isPublished: true,
        componentId: registerComponent.id,
        props: {
          requireAuth: false
        }
      },
      {
        path: "/dashboard",
        title: "Dashboard",
        blogId: 2,
        isPublished: true,
        componentId: dashboardComponent.id,
        props: {
          requireAuth: true,
          dataSources: [
            {
              provider: "DashboardDataProvider",
              parameterMap: {
                blogId: "blog.id",
                userId: "user.id"
              }
            }
          ]
        }
      }
    ]
  });

  // Create auth settings if not exists
  await prisma.authSettings.upsert({
    where: {
      blogId: 2
    },
    update: {},
    create: {
      blogId: 2,
      requireAuth: true,
      publicPaths: ['/', '/login', '/register', '/blog', '/about']
    }
  });

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      first_name: 'Test',
      last_name: 'User',
      blogs: {
        connect: {
          id: 1
        }
      }
    }
  });

  // Create data providers
  await prisma.dataProvider.createMany({
    data: [
      {
        name: "DashboardDataProvider",
        type: "query",
        config: {
          queries: {
            stats: `
              SELECT 
                COUNT(DISTINCT p.id) as posts_count,
                SUM(pa.views) as total_views,
                COUNT(DISTINCT pc.id) as comments_count
              FROM posts p
              LEFT JOIN postanalytics pa ON p.id = pa.postId
              LEFT JOIN postcomments pc ON p.id = pc.postId
              WHERE p.BlogId = :blogId AND p.UserId = :userId
            `,
            posts: `
              SELECT p.*, pa.views
              FROM posts p
              LEFT JOIN postanalytics pa ON p.id = pa.postId
              WHERE p.BlogId = :blogId AND p.UserId = :userId
              ORDER BY p.createdAt DESC
              LIMIT 10
            `
          }
        },
        parameters: {
          blogId: "number",
          userId: "number"
        }
      },
      {
        name: "HomeDataProvider",
        type: "query",
        config: {
          queries: {
            posts: `
              SELECT p.*, u.first_name, u.last_name
              FROM posts p
              JOIN users u ON p.UserId = u.id
              WHERE p.BlogId = :blogId AND p.isPublished = true
              ORDER BY p.createdAt DESC
              LIMIT 6
            `
          }
        },
        parameters: {
          blogId: "number"
        }
      }
    ]
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });