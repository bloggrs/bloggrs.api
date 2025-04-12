const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PerformanceManager {
  async createConfig(instanceId, data) {
    try {
      const config = await prisma.vuePerformanceConfig.create({
        data: {
          instanceId,
          lcpThreshold: data.lcpThreshold || 2500,
          fidThreshold: data.fidThreshold || 100,
          clsThreshold: data.clsThreshold || 0.1,
          ttfbThreshold: data.ttfbThreshold || 600,
          fcpThreshold: data.fcpThreshold || 1800,
          enableCodeSplitting: data.enableCodeSplitting ?? true,
          enableTreeShaking: data.enableTreeShaking ?? true,
          enableLazyLoading: data.enableLazyLoading ?? true,
          enablePreloading: data.enablePreloading ?? false
        }
      });
      return { success: true, data: config };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async recordMetrics(configId, data) {
    try {
      const metrics = await prisma.vuePerformanceMetrics.create({
        data: {
          configId,
          lcp: data.lcp,
          fid: data.fid,
          cls: data.cls,
          ttfb: data.ttfb,
          fcp: data.fcp,
          tbt: data.tbt,
          tti: data.tti,
          componentLoadTime: data.componentLoadTime,
          componentRenderTime: data.componentRenderTime,
          jsSize: data.jsSize,
          cssSize: data.cssSize
        }
      });
      return { success: true, data: metrics };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new PerformanceManager(); 