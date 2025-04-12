const templates = [
  {
    name: 'Header',
    type: 'layout',
    content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
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
    type: 'layout',
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
            <p>&copy; {{year}} Blog Platform. All rights reserved.</p>
        </div>
    </footer>
    <script src="/js/main.js"></script>
</body>
</html>
    `
  },
  {
    name: 'PostCard',
    type: 'partial',
    content: `
<article class="post-card">
    <div class="post-header">
        <h2 class="post-title">
            <a href="/blog/{{post.slug}}">{{post.title}}</a>
        </h2>
        <div class="post-meta">
            <span class="post-author">
                By {{post.users.first_name}} {{post.users.last_name}}
            </span>
            <span class="post-date">
                {{post.createdAt}}
            </span>
        </div>
    </div>
    <div class="post-content">
        <p>{{post.html_content}}</p>
    </div>
    <div class="post-footer">
        <a href="/blog/{{post.slug}}" class="read-more">Read More</a>
        <div class="post-stats">
            <span class="comments-count">
                <i class="icon-comments"></i>
                {{post.comments_count}} Comments
            </span>
            <span class="likes-count">
                <i class="icon-heart"></i>
                {{post.likes_count}} Likes
            </span>
        </div>
    </div>
</article>
    `
  },
  {
    name: 'Pagination',
    type: 'partial',
    content: `
<div class="pagination">
    {{#if (gt totalPages 1)}}
        <div class="pagination-container">
            {{#if (gt currentPage 1)}}
                <a href="{{baseUrl}}?page={{subtract currentPage 1}}" class="pagination-link prev">
                    &laquo; Previous
                </a>
            {{/if}}

            <div class="pagination-numbers">
                {{#each (range 1 totalPages)}}
                    {{#if (eq this ../currentPage)}}
                        <span class="pagination-number active">{{this}}</span>
                    {{else}}
                        <a href="{{../baseUrl}}?page={{this}}" class="pagination-number">
                            {{this}}
                        </a>
                    {{/if}}
                {{/each}}
            </div>

            {{#if (lt currentPage totalPages)}}
                <a href="{{baseUrl}}?page={{add currentPage 1}}" class="pagination-link next">
                    Next &raquo;
                </a>
            {{/if}}
        </div>
    {{/if}}
</div>
    `
  }
]; 