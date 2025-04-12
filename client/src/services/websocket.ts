import { useEffect, useState, useCallback } from 'react';

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
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  const sendMessage = useCallback((message: any) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected, message not sent:', message);
    }
  }, [socket, isConnected]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000/ws?api_key=test_pk_sdm1ht913vm');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      setSocket(null);
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