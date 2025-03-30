/**
 * Base plugin class that ensures all required methods and properties
 */
class BasePlugin {
  constructor(options) {
    // Required properties
    this.id = options.id || 'unknown-plugin';
    this.name = options.name || this.id;
    this.description = options.description || `${this.name} plugin`;
    this.version = options.version || '1.0.0';
    
    // Optional properties
    this.directory = options.directory || null;
    this.dataProviders = options.dataProviders || {};
    this._routes = options.routes || [];
    
    // Bind methods
    this.initialize = this.initialize.bind(this);
    this.routes = this.routes.bind(this);
    this.headTags = this.headTags.bind(this);
    this.render = this.render.bind(this);
  }
  
  /**
   * Initialize the plugin
   * @param {Object} app - Express app
   * @param {Object} config - Configuration
   * @param {Object} pluginSystem - Plugin system
   */
  async initialize(app, config, pluginSystem) {
    console.log(`[${this.id}] Base plugin initialize method called`);
    return true;
  }
  
  /**
   * Get plugin routes
   * @returns {Array} Array of routes
   */
  routes() {
    if (typeof this._routes === 'function') {
      return this._routes();
    }
    return this._routes;
  }
  
  /**
   * Get plugin head tags
   * @returns {Array|string} Head tags
   */
  headTags() {
    return [];
  }
  
  /**
   * Render a route
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  render(req, res, next) {
    // This should be overridden by the plugin
    console.log(`[${this.id}] Using base render method for ${req.path}`);
    
    // Use plugin system's renderRoute if available
    if (req._pluginSystem && req._pluginSystem.renderRoute) {
      return req._pluginSystem.renderRoute(req, res, next);
    }
    
    next();
  }
}

module.exports = BasePlugin; 