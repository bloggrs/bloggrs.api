type MessageHandler = (event: MessageEvent) => void;

class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;
  private messageHandlers: Set<MessageHandler> = new Set();

  private constructor() {
    this.connect();
  }

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  private connect() {
    // Use environment variable or default to localhost
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    this.ws = new WebSocket(wsUrl);

    this.ws.onmessage = (event: MessageEvent) => {
      this.messageHandlers.forEach(handler => handler(event));
    };

    this.ws.onclose = () => {
      // Attempt to reconnect after 1 second
      setTimeout(() => this.connect(), 1000);
    };
  }

  addEventListener(handler: MessageHandler) {
    this.messageHandlers.add(handler);
  }

  removeEventListener(handler: MessageHandler) {
    this.messageHandlers.delete(handler);
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(typeof data === 'string' ? data : JSON.stringify(data));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', data);
    }
  }
}

export default WebSocketService; 