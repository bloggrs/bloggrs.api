import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.users.findUnique({
      where: { email }
    });
  }

  async createSessionToken(data: { token: string; userId: number; expiresAt: Date }) {
    return prisma.sessionToken.create({
      data
    });
  }

  async findAuthSettings(blogId: number) {
    return prisma.authSettings.findUnique({
      where: { blogId }
    });
  }

  async validateSessionToken(token: string) {
    return prisma.sessionToken.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        user: true
      }
    });
  }
} 