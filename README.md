# Bloggrs.API - A Pluggable Blog Platform

This repository contains a flexible, plugin-based blog platform built with Express.js and Vue.js. It uses server-side rendering (SSR) to deliver fast, SEO-friendly content while maintaining the interactivity of a modern web application.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bloggrs.api.git
   cd bloggrs.api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` in your browser to see the application.

## Architecture Overview

The application follows a modular architecture with the following key components:

- **Express.js Server**: Handles HTTP requests, API endpoints, and server-side rendering
- **Vue.js Components**: Provides the UI components that are rendered on both server and client
- **Plugin System**: Allows extending functionality through pluggable blog implementations

### Directory Structure

## Plugin System

### How Plugins Work

The blog platform uses a plugin architecture to allow for different blog implementations and themes. Plugins are registered with the `PluginManager` and can provide custom Vue components to render the blog.

Here's how the plugin system works:

1. **Plugin Registration**: Plugins are registered in `src/bloggrs/index.js`
2. **Plugin Selection**: When a user visits the website, the appropriate plugin is selected
3. **SSR Rendering**: The plugin's Vue component is rendered server-side
4. **Client Hydration**: The client takes over for interactivity

### Creating a New Plugin

To create a new blog plugin:

1. Create a new directory in `src/bloggrs/` for your plugin:

```bash
mkdir -p src/bloggrs/my-custom-blog
```

2. Create a Vue component for your blog (e.g., `App.vue`):

```vue
<!-- src/bloggrs/my-custom-blog/App.vue -->
<template>
  <div class="my-custom-blog">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <main>
      <div v-for="post in posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <div class="post-date">{{ post.date }}</div>
        <p>{{ post.excerpt }}</p>
      </div>
    </main>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      title: "My Custom Blog",
      posts: [
        {
          id: 1,
          title: "Getting Started with Bloggrs.API",
          date: "2023-08-15",
          excerpt: "Learn how to create your first plugin..."
        },
        {
          id: 2,
          title: "Advanced Plugin Techniques",
          date: "2023-08-20",
          excerpt: "Take your plugins to the next level..."
        }
      ]
    };
  }
};
</script>

<style>
.my-custom-blog {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.post-date {
  color: #666;
  font-size: 0.9rem;
}
</style>
```

3. Register your plugin in `src/bloggrs/index.js`:

```javascript
// src/bloggrs/index.js
const PluginManager = require('../utils/plugin-manager');

// Register default blog
PluginManager.registerPlugin({
  name: 'default-blog',
  component: require('./default-blog/App.vue')
});

// Register your custom blog
PluginManager.registerPlugin({
  name: 'my-custom-blog',
  component: require('./my-custom-blog/App.vue')
});

// ... other plugins
```

4. Update the route in `app.js` to use your plugin (or create a new route):

```javascript
// src/app.js
app.get('/custom', async (req, res) => {
  try {
    const customPlugin = await PluginManager.getPlugin('my-custom-blog');
    
    if (customPlugin && customPlugin.component) {
      const { renderToString } = require('@vue/server-renderer');
      const { createSSRApp } = require('vue');
      
      const app = createSSRApp(customPlugin.component);
      const html = await renderToString(app);
      
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>My Custom Blog</title>
        </head>
        <body>
          <div id="app">${html}</div>
          <script src="/js/app.js"></script>
        </body>
        </html>
      `);
    } else {
      res.status(404).send('Custom blog plugin not found');
    }
  } catch (error) {
    console.error('Error rendering custom blog:', error);
    res.status(500).send('Error rendering the page');
  }
});
```

## Working with UI Libraries

Bloggrs.API supports integration with various UI libraries. For example, to use Naive UI:

1. Install the required dependencies:
   ```bash
   npm install naive-ui @css-render/vue3-ssr
   ```

2. Create a plugin that uses Naive UI components:

```vue
<!-- src/bloggrs/nativeui-blog/App.vue -->
<template>
  <n-config-provider :theme="darkTheme">
    <n-layout>
      <n-layout-header>
        <div class="header-content">
          <n-h1>My Naive UI Blog</n-h1>
        </div>
      </n-layout-header>
      <n-layout-content>
        <div class="content">
          <n-grid :cols="3" :x-gap="16" :y-gap="16">
            <n-grid-item v-for="post in posts" :key="post.id">
              <n-card>
                <template #header>
                  <div class="card-header">
                    <n-text>{{ post.date }}</n-text>
                  </div>
                </template>
                <n-h3>{{ post.title }}</n-h3>
                <n-p>{{ post.excerpt }}</n-p>
                <template #footer>
                  <n-button>Read More</n-button>
                </template>
              </n-card>
            </n-grid-item>
          </n-grid>
        </div>
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script>
const naive = require('naive-ui');

module.exports = {
  components: {
    NConfigProvider: naive.NConfigProvider,
    NLayout: naive.NLayout,
    NLayoutHeader: naive.NLayoutHeader,
    NLayoutContent: naive.NLayoutContent,
    NCard: naive.NCard,
    NH1: naive.NH1,
    NH3: naive.NH3,
    NP: naive.NP,
    NText: naive.NText,
    NButton: naive.NButton,
    NGrid: naive.NGrid,
    NGridItem: naive.NGridItem
  },
  
  data() {
    return {
      darkTheme: naive.darkTheme,
      posts: [
        {
          id: 1,
          title: "Getting Started with Naive UI",
          date: "2023-08-15",
          excerpt: "Learn how to integrate Naive UI components..."
        },
        {
          id: 2,
          title: "Advanced Themes",
          date: "2023-08-20",
          excerpt: "Customize the look and feel of your blog..."
        },
        {
          id: 3,
          title: "Responsive Layouts",
          date: "2023-08-25",
          excerpt: "Create adaptive layouts for all screen sizes..."
        }
      ]
    };
  }
};
</script>

<style>
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

## Extending Functionality

### Adding API Endpoints

You can add custom API endpoints to fetch data for your blog:

```javascript
// src/app.js
app.get('/api/posts', (req, res) => {
  // This could fetch from a database in a real application
  const posts = [
    {
      id: 1,
      title: "First Post",
      content: "This is the first post.",
      createdAt: "2023-08-01"
    },
    {
      id: 2,
      title: "Second Post",
      content: "This is the second post.",
      createdAt: "2023-08-05"
    }
  ];
  
  res.json(posts);
});
```

### Adding Custom Middleware

You can add custom middleware for authentication, logging, etc.:

```javascript
// src/app.js
// Custom logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Authentication middleware example
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  // Validate token (simplified example)
  if (token === 'valid-token') {
    req.user = { id: 1, name: 'Admin' };
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Protected API endpoint
app.get('/api/admin/posts', authMiddleware, (req, res) => {
  res.json({
    posts: [],
    user: req.user
  });
});
```

## Advanced Plugin Features

### Plugin Configuration

You can make your plugins configurable:

```javascript
// src/bloggrs/index.js
PluginManager.registerPlugin({
  name: 'configurable-blog',
  component: require('./configurable-blog/App.vue'),
  config: {
    title: 'Configurable Blog',
    postsPerPage: 10,
    showAuthor: true,
    theme: 'light'
  }
});
```

Then access the configuration in your plugin:

```vue
<!-- src/bloggrs/configurable-blog/App.vue -->
<template>
  <div :class="['blog-container', config.theme]">
    <h1>{{ config.title }}</h1>
    <!-- Rest of your template -->
  </div>
</template>

<script>
module.exports = {
  props: {
    config: {
      type: Object,
      default: () => ({
        title: 'Default Title',
        postsPerPage: 5,
        showAuthor: false,
        theme: 'light'
      })
    }
  },
  // ... rest of your component
};
</script>
```

## Troubleshooting

### Common Issues

1. **SSR Errors**: If you encounter errors during server-side rendering:
   - Ensure your Vue components don't use browser-specific APIs
   - Check for proper import/require statements
   - Look for undefined variables in your templates

2. **Plugin Not Loading**: If your plugin doesn't appear:
   - Verify it's registered correctly in `src/bloggrs/index.js`
   - Check the console for JavaScript errors
   - Ensure all dependencies are installed

3. **CSS Not Applied**: If styles aren't working:
   - Check if you're using scoped styles or global styles appropriately
   - Verify CSS syntax for errors
   - Ensure the CSS is included in the SSR output

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Special Bulma Plugin

The repository includes a special plugin that demonstrates how to override the default Vue SSR rendering with a complete HTML template using Bulma CSS framework.

### Influencer Platform Plugin

This plugin shows how to create a modern marketing site with:

- Bulma CSS framework
- FontAwesome icons
- Gradient text effects
- Card-based layouts
- Interactive hover effects

#### How It Works

Unlike other plugins that use Vue components for rendering, this plugin serves a complete HTML template directly. This approach is useful when:

1. You want to integrate an existing HTML/CSS template
2. You need to use a CSS framework with built-in JavaScript components
3. You're creating a landing page with minimal interactive requirements

#### Accessing the Plugin

Navigate to `/influencer` in your browser to see the Bulma-based influencer marketing platform.

#### Customizing the Template

The template is defined in `src/utils/bulma-template.js`. You can modify this file to update the content, styles, or layout of the page.

```javascript
// Example: Changing the main headline
function generateTemplate(title) {
  return `
    <!DOCTYPE html>
    <html>
      <head>...</head>
      <body>
        ...
        <h1 class="title is-2">Your Custom Headline Here</h1>
        ...
      </body>
    </html>
  `;
}
```

#### Adding New Pages

To add additional pages with the same Bulma template:

1. Add a new route in `src/app.js`:
   ```javascript
   app.get('/influencer/about', (req, res) => {
     const html = generateTemplate('About Us - Influencer Platform', 'about');
     res.send(html);
   });
   ```

2. Update the `generateTemplate` function to handle different page types:
   ```javascript
   function generateTemplate(title, pageType = 'home') {
     let content = '';
     
     if (pageType === 'about') {
       content = `<section class="section">
         <div class="container">
           <h1 class="title is-2">About Our Platform</h1>
           <!-- About page content -->
         </div>
       </section>`;
     } else {
       // Home page content
     }
     
     return `<!DOCTYPE html>...<body>${content}</body></html>`;
   }
   ```

# Influencer Platform Plugin

A plugin for the Bloggrs platform that adds influencer marketing capabilities.

## Features

- Influencer discovery and management
- Brand campaign management
- Sponsorship tracking
- Rich data model with social profiles and statistics
- Modern UI built with Bulma CSS
- Server-side rendering with Vue.js
- RESTful API for all influencer data

## Installation

This plugin is automatically installed as part of the Bloggrs platform. No additional installation steps are required.

## Configuration

The plugin uses its own PostgreSQL database to store influencer data. The database connection is managed automatically by the plugin system.

### Environment Variables

- `INFLUENCER_PLATFORM_DATABASE_URL`: PostgreSQL connection string for the plugin database. This will be automatically configured during plugin initialization.

## API Routes

The plugin registers the following API routes:

### Influencers

- `GET /api/plugins/influencer-platform/influencers`: Get all influencers
- `GET /api/plugins/influencer-platform/influencers/:id`: Get influencer by ID
- `GET /api/plugins/influencer-platform/influencers/handle/:handle`: Get influencer by handle
- `POST /api/plugins/influencer-platform/influencers`: Create a new influencer
- `PUT /api/plugins/influencer-platform/influencers/:id`: Update an influencer
- `DELETE /api/plugins/influencer-platform/influencers/:id`: Delete an influencer
- `GET /api/plugins/influencer-platform/influencers/search`: Search influencers

### Brands

- `GET /api/plugins/influencer-platform/brands`: Get all brands
- `GET /api/plugins/influencer-platform/brands/:id`: Get brand by ID
- `POST /api/plugins/influencer-platform/brands`: Create a new brand
- `PUT /api/plugins/influencer-platform/brands/:id`: Update a brand
- `DELETE /api/plugins/influencer-platform/