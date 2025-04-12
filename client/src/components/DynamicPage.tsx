import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useWebSocket } from '../services/websocket';
import { DynamicComponent } from './DynamicComponent';

interface Post {
  id: number;
  slug: string;
  title: string;
  html_content: string;
  users?: {
    first_name: string;
    last_name: string;
  };
}

interface PageData {
  title: string;
  component?: {
    content: string;
    name: string;
    props: Record<string, any>;
  };
  props: Record<string, any>;
  data?: {
    BlogPostsProvider?: Post[];
  };
  content: string;
}

export function DynamicPage() {
  const location = useLocation();
  const { isConnected, sendMessage, lastMessage } = useWebSocket();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [parameters, setParameters] = useState({
    page: 1,
    pageSize: 10,
    category: null
  });

  useEffect(() => {
    if (isConnected) {
      sendMessage({
        type: 'getPageData',
        path: location.pathname,
        parameters
      });
    }
  }, [isConnected, location.pathname, parameters]);

  useEffect(() => {
    if (lastMessage?.type === 'pageData') {
      setPageData(lastMessage.data);
    }
  }, [lastMessage]);

  if (!isConnected) {
    return <div className="loading">Connecting to server...</div>;
  }

  if (!pageData) {
    return <div className="loading">Loading page content...</div>;
  }

  return (
    <div className="dynamic-page">
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </div>
  );
} 