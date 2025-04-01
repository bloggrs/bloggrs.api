# Blog Platform Plugin

A full-featured blog platform plugin for the Bloggrs API system. This plugin provides functionality for managing blog posts, authors, categories, tags, and comments.

## Features

- Blog post management with support for drafts and published content
- Author profiles and management
- Category and tag organization
- Comment system with moderation
- Featured posts functionality
- View count tracking
- SEO-friendly slugs
- Cover image support
- Rich text content

## Installation

1. Ensure you have the required dependencies:
```bash
npm install @prisma/client
```

2. Set up your database configuration in `.env`:
```env
DATABASE_URL="mysql://my_user:my_password@localhost:3306/bloggrs_blog_platform_plugin"
```

3. Generate Prisma client:
```bash
npx prisma generate
```

4. Run migrations:
```bash
npx prisma migrate dev
```

## Structure # bloggrs-blog-platform-plugin
