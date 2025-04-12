import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useWebSocket } from '../services/websocket';
import { DynamicComponent } from './DynamicComponent';

interface PageData {
  title: string;
  component: {
    content: string;
    name: string;
    props: Record<string, any>;
  };
  props: Record<string, any>;
}

export function DynamicPage() {
  const location = useLocation();
  const { isConnected, sendMessage, lastMessage } = useWebSocket();
  const [pageData, setPageData] = useState<PageData | null>(null);

  // Request page data when connected
  useEffect(() => {
    if (isConnected) {
      sendMessage({
        type: 'getPage',
        path: location.pathname || '/'
      });
    }
  }, [isConnected, location.pathname]);

  // Handle incoming messages
  useEffect(() => {
    if (lastMessage?.type === 'response' && lastMessage?.endpoint === 'page') {
      setPageData(lastMessage.data);
    }
  }, [lastMessage]);

  if (!isConnected) {
    return <div className="loading">Connecting to server...</div>;
  }

  if (!pageData) {
    return <div className="loading">Loading page content...</div>;
  }

  // Merge default component props with page-specific props
  const mergedProps = {
    ...pageData.component.props,
    ...pageData.props
  };

  return (
    <div className={`dynamic-component ${pageData.component.name.toLowerCase()}`}>
      <DynamicComponent
        content={pageData.component.content}
        props={mergedProps}
      />
    </div>
  );
} 