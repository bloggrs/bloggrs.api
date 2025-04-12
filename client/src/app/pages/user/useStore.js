import { useState, useEffect } from 'react';
import BloggrsStore from './store';
import BloggrsWebSocket from './websocket';

let store = null;

/**
 * Hook for using the Bloggrs store
 * @param {string} apiKey - API key for WebSocket connection
 * @returns {Object} Store state and methods
 */
export function useStore(apiKey) {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Initialize store if not already initialized
    if (!store) {
      const websocket = new BloggrsWebSocket(apiKey);
      store = new BloggrsStore(websocket);
      
      // Load initial data
      store.loadInitialData();
    }
    
    // Subscribe to state changes
    const unsubscribe = store.subscribe(setState);
    
    // Set initial state
    setState(store.getState());
    
    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [apiKey]);
  
  return {
    state,
    store
  };
} 