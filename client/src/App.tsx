import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useWebSocket } from './services/websocket';
import { DynamicPage } from './components/DynamicPage';
import './styles/components.css';

interface RouteData {
  path: string;
  component: {
    content: string;
    props: Record<string, any>;
  };
}

export function App() {
  const { isConnected, sendMessage, lastMessage } = useWebSocket();
  const [routes, setRoutes] = useState<RouteData[]>([]);

  // Handle initial connection and route subscription
  useEffect(() => {
    if (isConnected) {
      // Request initial routes
      sendMessage({ type: 'getRoutes' });
      
      // Subscribe to route updates
      sendMessage({
        type: 'subscribe',
        channel: 'routes'
      });
    }
  }, [isConnected]);

  // Handle incoming messages
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'response' && lastMessage.endpoint === 'routes') {
      setRoutes(lastMessage.data);
    }
  }, [lastMessage]);

  if (!isConnected) {
    return <div>Connecting to server...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<DynamicPage />}
            />
          ))}
          {/* Fallback route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; 