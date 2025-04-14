import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class DataProviderRepository {
  async executeQuery(model: string, query: any) {
    return prisma[model].findMany({
      where: query.where,
      select: query.select,
      orderBy: query.orderBy,
      take: query.take,
      skip: query.skip,
      include: query.include
    });
  }
} 