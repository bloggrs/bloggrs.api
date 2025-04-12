const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ErrorHandler } = require('../../utils/error');

// State Management DAL
const stateManagementDal = {
  async createComponentState(data) {
    try {
      return await prisma.vueComponentState.create({
        data: {
          instanceId: data.instanceId,
          componentId: data.componentId,
          name: data.name,
          type: data.type,
          scope: data.scope,
          initialValue: data.initialValue
        }
      });
    } catch (error) {
      throw new ErrorHandler(500, 'Error creating component state');
    }
  },

  async getComponentStates(componentId) {
    return await prisma.vueComponentState.findMany({
      where: { componentId },
      include: {
        watchers: true,
        computed: true,
        effects: true
      }
    });
  }
};

// Performance Monitoring DAL
const performanceDal = {
  async createConfig(data) {
    try {
      return await prisma.vuePerformanceConfig.create({
        data: {
          instanceId: data.instanceId,
          lcpThreshold: data.lcpThreshold,
          fidThreshold: data.fidThreshold,
          clsThreshold: data.clsThreshold,
          enableCodeSplitting: data.enableCodeSplitting
        }
      });
    } catch (error) {
      throw new ErrorHandler(500, 'Error creating performance config');
    }
  },

  async recordMetrics(data) {
    try {
      return await prisma.vuePerformanceMetrics.create({
        data: {
          configId: data.configId,
          lcp: data.lcp,
          fid: data.fid,
          cls: data.cls,
          componentLoadTime: data.componentLoadTime
        }
      });
    } catch (error) {
      throw new ErrorHandler(500, 'Error recording metrics');
    }
  }
};

// Image Optimization DAL
const imageDal = {
  async createOptimizationConfig(data) {
    try {
      return await prisma.vueImageOptimization.create({
        data: {
          instanceId: data.instanceId,
          enabled: data.enabled,
          defaultQuality: data.defaultQuality,
          formats: data.formats
        }
      });
    } catch (error) {
      throw new ErrorHandler(500, 'Error creating image optimization config');
    }
  },

  async queueImageProcessing(data) {
    try {
      return await prisma.vueImageProcessingQueue.create({
        data: {
          configId: data.configId,
          path: data.path,
          priority: data.priority,
          preset: data.preset
        }
      });
    } catch (error) {
      throw new ErrorHandler(500, 'Error queueing image for processing');
    }
  }
};

module.exports = {
  stateManagementDal,
  performanceDal,
  imageDal
}; 