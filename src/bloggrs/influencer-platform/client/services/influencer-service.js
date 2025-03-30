/**
 * Influencer Platform API Service
 * Client-side service for interacting with the influencer platform API
 */
class InfluencerService {
  constructor() {
    this.baseUrl = '/api/plugins/influencer-platform';
  }
  
  /**
   * Get all influencers
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Influencers
   */
  async getInfluencers(options = {}) {
    const queryParams = new URLSearchParams();
    
    if (options.limit) queryParams.append('limit', options.limit);
    if (options.offset) queryParams.append('offset', options.offset);
    if (options.category) queryParams.append('category', options.category);
    if (options.featured !== undefined) queryParams.append('featured', options.featured);
    if (options.verified !== undefined) queryParams.append('verified', options.verified);
    
    const queryString = queryParams.toString();
    const url = `${this.baseUrl}/influencers${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch influencers: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  /**
   * Get influencer by ID
   * @param {string} id - Influencer ID
   * @returns {Promise<Object>} Influencer details
   */
  async getInfluencerById(id) {
    const response = await fetch(`${this.baseUrl}/influencers/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch influencer: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  /**
   * Search influencers
   * @param {Object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  async searchInfluencers(options = {}) {
    const queryParams = new URLSearchParams();
    
    if (options.query) queryParams.append('q', options.query);
    if (options.category) queryParams.append('category', options.category);
    if (options.minFollowers) queryParams.append('minFollowers', options.minFollowers);
    if (options.maxFollowers) queryParams.append('maxFollowers', options.maxFollowers);
    if (options.minEngagementRate) queryParams.append('minEngagementRate', options.minEngagementRate);
    if (options.limit) queryParams.append('limit', options.limit);
    if (options.offset) queryParams.append('offset', options.offset);
    
    const queryString = queryParams.toString();
    const url = `${this.baseUrl}/influencers/search${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to search influencers: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  /**
   * Get campaigns
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Campaigns
   */
  async getCampaigns(options = {}) {
    const queryParams = new URLSearchParams();
    
    if (options.limit) queryParams.append('limit', options.limit);
    if (options.offset) queryParams.append('offset', options.offset);
    if (options.status) queryParams.append('status', options.status);
    
    const queryString = queryParams.toString();
    const url = `${this.baseUrl}/campaigns${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch campaigns: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  /**
   * Get campaign details
   * @param {string} id - Campaign ID
   * @returns {Promise<Object>} Campaign details
   */
  async getCampaignById(id) {
    const response = await fetch(`${this.baseUrl}/campaigns/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch campaign: ${response.statusText}`);
    }
    
    return response.json();
  }
}

// Create and export a singleton instance
const influencerService = new InfluencerService();
export default influencerService; 