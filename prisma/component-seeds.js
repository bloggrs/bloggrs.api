const templateSeeds = [
  {
    name: 'Header',
    content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= props.title %></title>
    <link rel="stylesheet" href="/styles/main.css">
</head>
<body>
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
            <div class="footer-bottom">
                <p>&copy; <%= props.year %> Blog Platform. All rights reserved.</p>
            </div>
        </div>
    </footer>
    </body>
    </html>
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
            </div>
        </div>
        <div class="post-content">
            <p><%= post.html_content %></p>
        </div>
    </article>
    `
  }
]; 