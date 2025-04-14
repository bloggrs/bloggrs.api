import { PrismaClient } from '@prisma/client';
import { BlogService } from '../blogs/blog.service';
import { PostService } from '../posts/post.service';
import { CategoryService } from '../categories/category.service';
import { ComponentService } from '../components/component.service';

export class ChannelService {
  constructor(
    private blogService: BlogService,
    private postService: PostService,
    private categoryService: CategoryService,
    private componentService: ComponentService
  ) {}

  async getChannelData(channel: string, blogId: number, parameters: any = {}) {
    switch (channel) {
      case 'posts':
        return this.postService.getBlogPosts(blogId, parameters);
      case 'categories':
        return this.categoryService.getBlogCategories(blogId, parameters);
      case 'pages':
        return this.blogService.getBlogPages(blogId, parameters);
      case 'header':
        return this.blogService.getHeaderWidgetData(blogId);
      case 'routes':
        return this.blogService.getPageRoutes(blogId);
      case 'components':
        return this.componentService.getBlogComponents(blogId);
      default:
        throw new Error(`Unknown channel: ${channel}`);
    }
  }
} 