module.exports = {
  id: 'blog-platform',
  routes() {
    return [
      {
        path: '/',
        component: 'views/Home.vue',
        dataProvider: 'getHomeData'
      },
    ];
  },
  getDataProvider(name) {
    const { getHomeData } = require('./data-providers');
    
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
      }
    };
    
    return providers[name];
  }
}; 