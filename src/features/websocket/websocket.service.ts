import { WebSocket } from 'ws';
import { AuthService } from '../auth/auth.service';
import { PageService } from '../pages/page.service';

export class WebSocketService {
  private connections: Map<string, Set<WebSocket>> = new Map();

  constructor(
    private authService: AuthService,
    private pageService: PageService
  ) {}

  async handleConnection(ws: WebSocket, apiKey: string) {
    if (!apiKey) {
      ws.close(1008, 'API key is required');
      return;
    }

    this.addConnection(apiKey, ws);
    this.setupMessageHandler(ws, apiKey);
    this.setupCloseHandler(ws, apiKey);
    
    ws.send(JSON.stringify({ 
      type: 'connected', 
      message: 'Connected to Bloggrs WebSocket API' 
    }));
  }

  private addConnection(apiKey: string, ws: WebSocket) {
    if (!this.connections.has(apiKey)) {
      this.connections.set(apiKey, new Set());
    }
    this.connections.get(apiKey)!.add(ws);
  }

  private setupMessageHandler(ws: WebSocket, apiKey: string) {
    ws.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message);
        await this.handleMessage(ws, apiKey, data);
      } catch (error: any) {
        ws.send(JSON.stringify({
          type: 'error',
          message: error.message || 'Invalid message format'
        }));
      }
    });
  }

  private setupCloseHandler(ws: WebSocket, apiKey: string) {
    ws.on('close', () => {
      if (this.connections.has(apiKey)) {
        this.connections.get(apiKey)!.delete(ws);
        if (this.connections.get(apiKey)!.size === 0) {
          this.connections.delete(apiKey);
        }
      }
    });
  }

  private async handleMessage(ws: WebSocket, apiKey: string, data: any) {
    switch (data.type) {
      case 'PAGE_REQUEST':
        await this.handlePageRequest(ws, data);
        break;
      case 'AUTH_REQUEST':
        await this.handleAuthRequest(ws, data);
        break;
      default:
        throw new Error('Unknown message type');
    }
  }

  private async handlePageRequest(ws: WebSocket, data: any) {
    const { path, blogId, token } = data;

    const isAuthorized = await this.authService.validateAuth(path, blogId, token);
    if (!isAuthorized) {
      ws.send(JSON.stringify({
        type: 'ERROR',
        data: {
          type: 'AUTH_REQUIRED',
          redirect: '/login'
        }
      }));
      return;
    }

    const pageData = await this.pageService.getPageData(path, {
      blogId,
      user: token ? (await this.authService.validateSessionToken(token))?.user : null
    });

    ws.send(JSON.stringify({
      type: 'PAGE_DATA',
      data: pageData
    }));
  }

  private async handleAuthRequest(ws: WebSocket, data: any) {
    const { action, ...authData } = data;

    try {
      let result;
      switch (action) {
        case 'login':
          result = await this.authService.login(authData);
          break;
        default:
          throw new Error('Unknown auth action');
      }

      ws.send(JSON.stringify({
        type: 'AUTH_RESPONSE',
        data: result
      }));
    } catch (error: any) {
      ws.send(JSON.stringify({
        type: 'ERROR',
        message: error.message
      }));
    }
  }
} 