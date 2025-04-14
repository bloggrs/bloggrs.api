import { useEffect, useState, useCallback, useRef } from 'react';

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

interface Route {
  id: string;
  path: string;
  title: string;
  componentId: string;
  props: Record<string, any>;
  component: {
    id: string;
    name: string;
    content: string;
    props: Record<string, any>;
  };
}

export interface WebSocketHook {
  isConnected: boolean;
  sendMessage: (message: any) => void;
  lastMessage: any | null;
}

export function useWebSocket(): WebSocketHook {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const sendMessage = (message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      // Add auth token if available
      const token = localStorage.getItem('auth_token');
      if (token) {
        message.token = token;
      }
      wsRef.current.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000/ws?api_key=test_pk_sdm1ht913vm');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      wsRef.current = ws;
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      wsRef.current = null;
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      setLastMessage(data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    isConnected,
    sendMessage,
    lastMessage
  };
} 