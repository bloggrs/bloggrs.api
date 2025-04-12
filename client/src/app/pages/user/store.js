/**
 * Store for managing Bloggrs application state
 */
export default class BloggrsStore {
  /**
   * Create a new store instance
   */
  constructor() {
    this.state = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    };
    
    this.subscribers = new Set();
  }

  /**
   * Get the current state
   * @returns {Object} Current state
   */
  getState() {
    return this.state;
  }

  /**
   * Update the state
   * @param {Object} newState - New state to merge
   */
  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    };
    
    this.notifySubscribers();
  }

  /**
   * Subscribe to state changes
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Notify all subscribers of state changes
   */
  notifySubscribers() {
    this.subscribers.forEach(callback => {
      callback(this.state);
    });
  }

  /**
   * Set the authenticated user
   * @param {Object} user - User object
   */
  setUser(user) {
    this.setState({
      user,
      isAuthenticated: !!user,
      error: null
    });
  }

  /**
   * Set loading state
   * @param {boolean} isLoading - Loading state
   */
  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  /**
   * Set error state
   * @param {string} error - Error message
   */
  setError(error) {
    this.setState({ error });
  }

  /**
   * Clear error state
   */
  clearError() {
    this.setState({ error: null });
  }

  /**
   * Reset store to initial state
   */
  reset() {
    this.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  }
} 