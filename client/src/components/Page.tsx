import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../services/websocket';
import DynamicComponent from './DynamicComponent';

interface PageComponent {
  id: string;
  name: string;
  content: string;
  props: Record<string, any>;
}

interface Page {
  id: string;
  path: string;
  title: string;
  componentId: string;
  props: Record<string, any>;
  component: PageComponent;
}

const Page: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const { sendRequest, lastMessage, isConnected } = useWebSocket();
  const [pageData, setPageData] = React.useState<Page | null>(null);

  useEffect(() => {
    if (isConnected && pageId) {
      sendRequest('getPage', { pageId });
    }
  }, [isConnected, pageId, sendRequest]);

  useEffect(() => {
    if (lastMessage?.type === 'page' && lastMessage.data) {
      setPageData(lastMessage.data);
    }
  }, [lastMessage]);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <h1>{pageData.title}</h1>
      <DynamicComponent
        name={pageData.component.name}
        content={pageData.component.content}
        props={pageData.props}
      />
    </div>
  );
};

export default Page; 