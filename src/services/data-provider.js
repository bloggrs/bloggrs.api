const { PrismaClient } = require('@prisma/client');
const ejs = require('ejs');
const path = require('path');
const prisma = new PrismaClient();

class DataProviderService {
  constructor() {
    this.cache = new Map();
  }

  async executeProvider(providerId, parameters = {}) {
    const provider = await prisma.dataProvider.findUnique({
      where: { id: providerId }
    });

    if (!provider) {
      throw new Error(`Provider ${providerId} not found`);
    }

    // Check cache
    const cacheKey = this.getCacheKey(providerId, parameters);
    if (provider.cacheTime && this.cache.has(cacheKey)) {
      const { data, timestamp } = this.cache.get(cacheKey);
      if (Date.now() - timestamp < provider.cacheTime * 1000) {
        return data;
      }
    }

    // Execute provider based on type
    let data;
    switch (provider.type) {
      case 'query':
        data = await this.executeQueryProvider(provider, parameters);
        break;
      case 'rest':
        data = await this.executeRestProvider(provider, parameters);
        break;
      default:
        throw new Error(`Unsupported provider type: ${provider.type}`);
    }

    // Cache result if needed
    if (provider.cacheTime) {
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
    }

    return data;
  }

  async executeQueryProvider(provider, parameters) {
    const { query, model } = provider.config;
    
    // Build where clause from parameters
    const where = {};
    Object.entries(parameters).forEach(([key, value]) => {
      if (provider.parameters[key]) {
        where[key] = value;
      }
    });

    // Execute query with pagination if specified
    const result = await prisma[model].findMany({
      where,
      skip: parameters.skip || 0,
      take: parameters.take || 10,
      orderBy: parameters.orderBy || { createdAt: 'desc' }
    });

    return result;
  }

  async renderTemplate(templatePath, data) {
    const template = await ejs.renderFile(
      path.resolve(process.cwd(), templatePath),
      data
    );
    return template;
  }

  getCacheKey(providerId, parameters) {
    return `${providerId}:${JSON.stringify(parameters)}`;
  }
}

module.exports = new DataProviderService(); 