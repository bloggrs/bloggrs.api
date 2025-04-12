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
  const [pageData, setPageData] = useState<any>(null);
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

  // Handle incoming messages
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

  // Merge default component props with page-specific props
  const mergedProps = {
    ...pageData.component.props,
    ...pageData.props
  };

  return (
    <div className="dynamic-page">
      {pageData ? (
        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
      ) : (
        <div>Loading...</div>
      )}
      
      {/* Pagination controls */}
      <div className="pagination">
        <button 
          onClick={() => setParameters(p => ({ ...p, page: p.page - 1 }))}
          disabled={parameters.page === 1}
        >
          Previous
        </button>
        <span>Page {parameters.page}</span>
        <button 
          onClick={() => setParameters(p => ({ ...p, page: p.page + 1 }))}
        >
          Next
        </button>
      </div>
    </div>
  );
} 