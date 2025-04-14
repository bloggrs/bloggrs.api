import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WebSocketService from '../services/WebSocketService';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  comments_count: number;
  likes_count: number;
}

interface PageData {
  id: number;
  path: string;
  title: string;
  component?: {
    name: string;
    content: string;
    props: Record<string, any>;
  };
  props?: Record<string, any>;
  posts?: Post[];
}

export default function DynamicPage() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const ws = WebSocketService.getInstance();

    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.type === 'PAGE_DATA') {
        setPageData(message.data);
      } else if (message.type === 'ERROR') {
        // Handle authentication errors
        if (message.data.type === 'AUTH_REQUIRED') {
          // Store the attempted URL to redirect back after login
          sessionStorage.setItem('redirectAfterLogin', location.pathname);
          navigate(message.data.redirect);
        }
      }
    };

    ws.addEventListener(handleMessage);

    // Request page data with auth token if available
    ws.send({
      type: 'PAGE_REQUEST',
      path: location.pathname,
      blogId: 1, // Get this from your config
      token: localStorage.getItem('authToken') // Include token if available
    });

    return () => {
      ws.removeEventListener(handleMessage);
    };
  }, [location.pathname, navigate]);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  // Render the dynamic component if available
  if (pageData.component) {
    return (
      <div className="dynamic-page">
        <div dangerouslySetInnerHTML={{ __html: pageData.component.content }} />
      </div>
    );
  }

  // Render posts if available
  if (pageData.posts) {
    return (
      <div className="dynamic-page">
        <div className="posts-container">
          {pageData.posts.map((post) => (
            <div key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <div className="post-meta">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post.comments_count} comments</span>
                <span>{post.likes_count} likes</span>
              </div>
              <div className="post-content">{post.content}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback
  return <div>No content available</div>;
} 