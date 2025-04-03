const path = require('path');
const dataProviders = require('./data-providers');

class BlogPlatformPlugin {
  constructor() {
    this.id = 'blog-platform';
    this.name = 'Blog Platform';
    this.version = '1.0.0';
    this.description = 'A full-featured blogging platform';
    this.directory = __dirname;
    
    this.config = require('./plugin.json');
    console.log(`[${this.id}] Available data providers:`, Object.keys(dataProviders));
  }

  async initialize(app, config, pluginSystem) {
    console.log(`[${this.id}] Initializing plugin`);
    
    this.pluginSystem = pluginSystem;
    
    try {
      const fs = require('fs');
      const mockDataDir = path.join(__dirname, 'mock-data');
      if (!fs.existsSync(mockDataDir)) {
        fs.mkdirSync(mockDataDir, { recursive: true });
      }
      
      await this.ensureMockDataFiles();
      this.registerApiRoutes(app);
      
      return true;
    } catch (error) {
      console.error(`[${this.id}] Error initializing plugin:`, error);
      return false;
    }
  }

  async ensureMockDataFiles() {
    const fs = require('fs');
    const mockDataDir = path.join(__dirname, 'mock-data');
    
    const mockDataFiles = {
      'home.json': {
        featuredPosts: [
          {
            id: 1,
            title: "Getting Started with Blogging",
            slug: "getting-started-with-blogging",
            excerpt: "Learn the essentials of starting your own blog...",
            coverImage: "https://via.placeholder.com/800x400",
            author: {
              name: "John Doe",
              avatar: "https://randomuser.me/api/portraits/men/1.jpg"
            },
            categories: [
              { id: 1, name: "Tutorials" }
            ],
            createdAt: new Date().toISOString()
          }
        ],
        recentPosts: [
          // Similar structure to featured posts
        ],
        categories: [
          {
            id: 1,
            name: "Tutorials",
            slug: "tutorials",
            _count: { posts: 5 }
          }
        ],
        stats: {
          postCount: 10,
          authorCount: 3,
          categoryCount: 5
        }
      }
    };

    for (const [filename, data] of Object.entries(mockDataFiles)) {
      const filePath = path.join(mockDataDir, filename);
      if (!fs.existsSync(filePath)) {
        try {
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`[${this.id}] Created mock data file: ${filename}`);
        } catch (error) {
          console.error(`[${this.id}] Error creating mock data file ${filename}:`, error);
        }
      }
    }
  }

  routes() {
    console.log(`[${this.id}] Getting routes from plugin.json`);
    return [
      ...this.config.routes || [],
      {
        path: '/post/:id',
        component: 'views/posts/PostDetail.vue',
        dataProvider: 'getPostData'
      }
    ];
  }

  headTags() {
    return this.config.headTags || [];
  }

  getDataProvider(name) {
    const { getHomeData, getPostData, createComment } = require('./data-providers');
    
    const providers = {
      getHomeData: async (req) => {
        try {
          return await getHomeData(req);
        } catch (error) {
          console.error('Error in getHomeData provider:', error);
          return {
            featuredPosts: [],
            recentPosts: [],
            categories: [],
            stats: {
              postCount: 0,
              authorCount: 0,
              categoryCount: 0
            }
          };
        }
      },
      getPostData: async (req) => {
        try {
          return await getPostData(req);
        } catch (error) {
          console.error('Error in getPostData provider:', error);
          return {
            error: error.message,
            post: null,
            lastUpdated: new Date().toISOString()
          };
        }
      },
      createComment: async (req) => {
        try {
          return await createComment(req);
        } catch (error) {
          console.error('Error in createComment provider:', error);
          return {
            success: false,
            error: error.message
          };
        }
      }
    };
    
    return providers[name];
  }

  registerApiRoutes(app) {
    const apiPrefix = `/api/plugins/${this.id}`;
    
    app.get(`${apiPrefix}/debug`, (req, res) => {
      res.json({
        status: 'ok',
        plugin: this.id,
        version: this.version,
        routes: this.config.routes.map(r => r.path),
        dataProviders: Object.keys(dataProviders)
      });
    });
  }
}

module.exports = new BlogPlatformPlugin(); 