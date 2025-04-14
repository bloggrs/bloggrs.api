import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useWebSocket } from './services/websocket';
import DynamicPage from './components/DynamicPage';
import './styles/components.css';
import { AuthProvider } from './context/AuthContext';

interface RouteData {
  path: string;
  title: string;
  componentId: string;
}

export function App() {
  const { isConnected, sendMessage, lastMessage } = useWebSocket();
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);

  // Request routes when connected
  useEffect(() => {
    if (isConnected) {
      setIsLoadingRoutes(true);
      sendMessage({ type: 'getRoutes' });
    }
  }, [isConnected]);

  // Handle incoming messages
  useEffect(() => {
    if (lastMessage?.type === 'response' && lastMessage?.endpoint === 'routes') {
      setRoutes(lastMessage.data);
      setIsLoadingRoutes(false);
    }
  }, [lastMessage]);

  if (!isConnected) {
    return <div className="loading">Connecting to server...</div>;
  }

  if (isLoadingRoutes) {
    return <div className="loading">Loading available pages...</div>;
  }

  return (
    <AuthProvider>
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
            {!isLoadingRoutes && (
              <Route 
                path="*" 
                element={<div className="error">Page not found</div>} 
              />
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App; 