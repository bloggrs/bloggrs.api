import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';

export class AuthService {
  constructor(private repository: AuthRepository) {}

  async login(data: { email: string; password: string; blogId: number }) {
    const user = await this.repository.findUserByEmail(data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, blogId: data.blogId },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    await this.repository.createSessionToken({
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    };
  }

  async validateAuth(path: string, blogId: number, token?: string) {
    const authSettings = await this.repository.findAuthSettings(blogId);
    
    if (!authSettings) return true;
    if (!authSettings.requireAuth) return true;

    const publicPaths = authSettings.publicPaths.split(',').map(p => p.trim());
    if (publicPaths.includes(path)) return true;

    if (!token) return false;

    const session = await this.validateSessionToken(token);
    return !!session;
  }

  async validateSessionToken(token: string) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      
      // Check if token exists in database
      const sessionToken = await this.repository.validateSessionToken(token);
      
      if (!sessionToken || sessionToken.expiresAt < new Date()) {
        return null;
      }
      
      return sessionToken;
    } catch (error) {
      return null;
    }
  }
} 