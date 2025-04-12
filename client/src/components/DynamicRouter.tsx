import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWebSocket } from '../services/websocket';
import DynamicComponent from './DynamicComponent';

const DynamicRouter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { routes, currentPage, requestPage, requestRoutes, isConnected } = useWebSocket();

  useEffect(() => {
    // Request routes when component mounts and WebSocket is connected
    if (isConnected) {
      requestRoutes();
    }
  }, [isConnected, requestRoutes]);

  useEffect(() => {
    // Find matching route for current path
    if (routes.length > 0) {
      const currentRoute = routes.find(route => route.path === location.pathname);
      if (currentRoute) {
        requestPage(currentRoute.id);
      } else if (location.pathname === '/') {
        // If on root path, try to find a route with path '/'
        const homeRoute = routes.find(route => route.path === '/');
        if (homeRoute) {
          requestPage(homeRoute.id);
        } else {
          // If no home route, use the first route
          requestPage(routes[0].id);
        }
      } else {
        // If no matching route, show a 404 page
        console.warn(`No route found for path: ${location.pathname}`);
      }
    }
  }, [location.pathname, routes, requestPage]);

  if (!currentPage) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dynamic-router">
      <DynamicComponent
        name={currentPage.component.name}
        content={currentPage.component.content}
        props={currentPage.props}
      />
    </div>
  );
};

export default DynamicRouter; 