import { WebSocket } from 'ws';
import { ChannelService } from './channel.service';
import { BlogService } from '../blogs/blog.service';

export class SubscriptionService {
  constructor(
    private channelService: ChannelService,
    private blogService: BlogService
  ) {}

  async handleSubscribe(ws: WebSocket, apiKey: string, data: any) {
    const { channel } = data;
    
    if (!channel) {
      throw new Error('Channel is required');
    }
    
    const blog = await this.blogService.findByApiKey(apiKey);
    if (!blog) {
      throw new Error('Invalid API key');
    }
    
    // Add channel to WebSocket instance
    (ws as any).channels = (ws as any).channels || new Set();
    (ws as any).channels.add(channel);
    
    // Get initial channel data
    const channelData = await this.channelService.getChannelData(channel, blog.id);
    
    return {
      type: 'subscribed',
      channel,
      data: channelData
    };
  }

  handleUnsubscribe(ws: WebSocket, data: any) {
    const { channel } = data;
    
    if (!channel) {
      throw new Error('Channel is required');
    }
    
    if ((ws as any).channels) {
      (ws as any).channels.delete(channel);
    }
    
    return {
      type: 'unsubscribed',
      channel
    };
  }
} 