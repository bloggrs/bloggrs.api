/**
 * Blog Platform API Service
 * Client-side service for interacting with the blog platform API
 */
class BlogService {
  constructor() {
    this.baseUrl = '/api/plugins/blog-platform';
  }
  
  /**
   * Get all posts with pagination and filtering
   */
  async getPosts(options = {}) {
    const queryParams = new URLSearchParams();
    
    if (options.page) queryParams.append('page', options.page);
    if (options.limit) queryParams.append('limit', options.limit);
    if (options.category) queryParams.append('category', options.category);
    if (options.tag) queryParams.append('tag', options.tag);
    if (options.search) queryParams.append('search', options.search);
    
    const queryString = queryParams.toString();
    const url = `${this.baseUrl}/posts${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  /**
   * Get post by slug
   */
  async getPostBySlug(slug) {
    const response = await fetch(`${this.baseUrl}/posts/${slug}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  /**
   * Get categories with post counts
   */
  async getCategories() {
    const response = await fetch(`${this.baseUrl}/categories`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  /**
   * Get posts by category
   */
  async getPostsByCategory(slug, options = {}) {
    const queryParams = new URLSearchParams();
    
    if (options.page) queryParams.append('page', options.page);
    if (options.limit) queryParams.append('limit', options.limit);
    
    const queryString = queryParams.toString();
    const url = `${this.baseUrl}/categories/${slug}/posts${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch category posts: ${response.statusText}`);
    }
    
    return response.json();
  }
}

// Create and export a singleton instance
const blogService = new BlogService();
export default blogService; 