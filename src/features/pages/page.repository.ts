import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PageRepository {
  async findPage(path: string, options: { isPublished?: boolean, blogId?: number } = {}) {
    return prisma.page.findFirst({
      where: {
        path,
        isPublished: options.isPublished ?? true,
        ...(options.blogId ? { blogId: options.blogId } : {})
      },
      include: {
        component: true,
        PageDataSource: {
          include: {
            provider: true
          }
        }
      }
    });
  }

  async getTemplates() {
    return prisma.componentTemplate.findMany();
  }
} 