const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LazyLoadManager {
  async createConfig(instanceId, data) {
    try {
      const config = await prisma.vueLazyLoadConfig.create({
        data: {
          instanceId,
          enabled: data.enabled ?? true,
          defaultStrategy: data.defaultStrategy || 'VIEWPORT',
          threshold: data.threshold || 0.1,
          rootMargin: data.rootMargin || '50px',
          minLoadDelay: data.minLoadDelay,
          maxConcurrent: data.maxConcurrent || 3
        }
      });
      return { success: true, data: config };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addComponent(configId, componentId, data) {
    try {
      const component = await prisma.vueLazyLoadComponents.create({
        data: {
          configId,
          componentId,
          strategy: data.strategy || 'VIEWPORT',
          placeholder: data.placeholder,
          minHeight: data.minHeight,
          loadingClass: data.loadingClass,
          errorClass: data.errorClass,
          suspense: data.suspense ?? false,
          fallback: data.fallback
        }
      });
      return { success: true, data: component };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new LazyLoadManager(); 