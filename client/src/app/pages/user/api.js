/**
 * API service for Bloggrs
 */
export default class BloggrsAPI {
  /**
   * Create a new API instance
   * @param {string} baseURL - Base URL for API requests
   */
  constructor(baseURL = '/api/v1') {
    this.baseURL = baseURL;
  }

  /**
   * Make an API request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} Response data
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Register a new user
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise} User data
   */
  async register(username, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  }

  /**
   * Login user
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise} User data and token
   */
  async login(username, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  }

  /**
   * Logout user
   * @returns {Promise} Success response
   */
  async logout() {
    return this.request('/auth/logout', {
      method: 'POST'
    });
  }

  /**
   * Get current user
   * @returns {Promise} User data
   */
  async getCurrentUser() {
    return this.request('/auth/me');
  }
} 