import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class BlogRepository {
  async findByApiKey(apiKey: string) {
    return prisma.blogs.findFirst({
      where: { apiKey }
    });
  }

  async getPages(blogId: number, options: { page?: number; pageSize?: number } = {}) {
    return prisma.page.findMany({
      where: { 
        blogId,
        isPublished: true 
      },
      take: options.pageSize,
      skip: options.page ? (options.page - 1) * (options.pageSize || 10) : 0
    });
  }

  async getPageRoutes(blogId: number) {
    return prisma.page.findMany({
      where: { 
        blogId,
        isPublished: true 
      },
      select: {
        id: true,
        path: true,
        title: true,
        componentId: true,
        props: true,
        component: {
          select: {
            id: true,
            name: true,
            content: true,
            props: true
          }
        }
      }
    });
  }

  async getHeaderWidgetData(blogId: number) {
    return prisma.blogs.findUnique({
      where: { id: blogId },
      select: {
        name: true,
        description: true,
        logo: true,
        // Add other header-related fields
      }
    });
  }
} 