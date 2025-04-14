import { DataProviderRepository } from './data-provider.repository';

export class DataProviderService {
  constructor(private repository: DataProviderRepository) {}

  async executeProvider(provider: any, parameters: Record<string, any>) {
    switch (provider.type) {
      case 'query':
        return this.executeQueryProvider(provider, parameters);
      case 'rest':
        return this.executeRestProvider(provider, parameters);
      default:
        throw new Error(`Unsupported provider type: ${provider.type}`);
    }
  }

  private async executeQueryProvider(provider: any, parameters: Record<string, any>) {
    const result: Record<string, any> = {};
    
    for (const [key, query] of Object.entries(provider.config.queries)) {
      const queryConfig = this.buildQueryConfig(query as string, parameters);
      result[key] = await this.repository.executeQuery(provider.config.model, queryConfig);
    }

    return result;
  }

  private async executeRestProvider(provider: any, parameters: Record<string, any>) {
    // Implement REST API calls
    throw new Error('REST provider not implemented');
  }

  private buildQueryConfig(query: string, parameters: Record<string, any>) {
    // Transform SQL-like query into Prisma query configuration
    // This is a simplified example - you'll need to implement proper SQL parsing
    return {
      where: {},
      select: {},
      orderBy: {},
      ...parameters
    };
  }
} 