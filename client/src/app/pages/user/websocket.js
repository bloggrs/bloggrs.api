/**
 * WebSocket client for Bloggrs
 */
export default class BloggrsWebSocket {
  /**
   * Create a new WebSocket client
   * @param {string} apiKey - API key for authentication
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.socket = null;
    this.subscriptions = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // Start with 1 second
  }

  /**
   * Connect to the WebSocket server
   */
  connect() {
    if (this.socket) {
      return;
    }

    this.socket = new WebSocket('wss://api.bloggrs.com/ws');

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.reconnectDelay = 1000;
      
      // Authenticate
      this.send({
        type: 'auth',
        apiKey: this.apiKey
      });
      
      // Resubscribe to all channels
      this.subscriptions.forEach((_, channel) => {
        this.subscribe(channel);
      });
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.socket = null;
      
      // Attempt to reconnect
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        this.reconnectDelay *= 2; // Exponential backoff
        
        setTimeout(() => {
          this.connect();
        }, this.reconnectDelay);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  /**
   * Handle incoming WebSocket messages
   * @param {Object} data - Message data
   */
  handleMessage(data) {
    const { type, channel, payload } = data;
    
    if (type === 'event' && channel) {
      const handlers = this.subscriptions.get(channel);
      if (handlers) {
        handlers.forEach(handler => handler(payload));
      }
    }
  }

  /**
   * Send a message to the WebSocket server
   * @param {Object} data - Message data
   */
  send(data) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected');
      return;
    }
    
    this.socket.send(JSON.stringify(data));
  }

  /**
   * Subscribe to a channel
   * @param {string} channel - Channel name
   * @param {Function} handler - Event handler
   */
  subscribe(channel, handler) {
    if (!this.subscriptions.has(channel)) {
      this.subscriptions.set(channel, new Set());
      
      this.send({
        type: 'subscribe',
        channel
      });
    }
    
    this.subscriptions.get(channel).add(handler);
  }

  /**
   * Unsubscribe from a channel
   * @param {string} channel - Channel name
   * @param {Function} handler - Event handler
   */
  unsubscribe(channel, handler) {
    const handlers = this.subscriptions.get(channel);
    if (handlers) {
      handlers.delete(handler);
      
      if (handlers.size === 0) {
        this.subscriptions.delete(channel);
        
        this.send({
          type: 'unsubscribe',
          channel
        });
      }
    }
  }

  /**
   * Disconnect from the WebSocket server
   */
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
} 