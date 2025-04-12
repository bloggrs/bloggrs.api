import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../services/websocket';
import { DynamicComponent } from './DynamicComponent';

interface PageData {
  title: string;
  component: {
    content: string;
    props: Record<string, any>;
  };
  props: Record<string, any>;
}

export function DynamicPage() {
  const { path } = useParams();
  const { isConnected, sendMessage, lastMessage } = useWebSocket();
  const [pageData, setPageData] = useState<PageData | null>(null);

  // Request page data when connected
  useEffect(() => {
    if (isConnected) {
      sendMessage({
        type: 'getPage',
        path: path || '/'
      });

      sendMessage({
        type: 'subscribe',
        channel: `page:${path}`
      });
    }
  }, [isConnected, path]);

  // Handle incoming messages
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'response' && lastMessage.endpoint === 'page') {
      setPageData(lastMessage.data);
    }
  }, [lastMessage]);

  if (!isConnected) {
    return <div>Connecting to server...</div>;
  }

  if (!pageData) {
    return <div>Loading page content...</div>;
  }

  return (
    <DynamicComponent
      content={pageData.component.content}
      props={pageData.props}
    />
  );
} 