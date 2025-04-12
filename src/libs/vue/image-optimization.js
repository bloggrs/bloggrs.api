const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ImageOptimizer {
  async createConfig(instanceId, data) {
    try {
      const config = await prisma.vueImageOptimization.create({
        data: {
          instanceId,
          enabled: data.enabled ?? true,
          defaultQuality: data.defaultQuality || 80,
          autoFormat: data.autoFormat ?? true,
          formats: data.formats || ['JPEG', 'WEBP', 'AVIF'],
          maxWidth: data.maxWidth,
          maxHeight: data.maxHeight,
          preserveMetadata: data.preserveMetadata ?? false
        }
      });
      return { success: true, data: config };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createPreset(configId, data) {
    try {
      const preset = await prisma.vueImagePresets.create({
        data: {
          configId,
          name: data.name,
          description: data.description,
          width: data.width,
          height: data.height,
          aspectRatio: data.aspectRatio,
          quality: data.quality || 80,
          format: data.format,
          options: data.options
        }
      });
      return { success: true, data: preset };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async queueOptimization(configId, data) {
    try {
      const queueItem = await prisma.vueImageProcessingQueue.create({
        data: {
          configId,
          path: data.path,
          priority: data.priority || 0,
          preset: data.preset,
          profile: data.profile,
          custom: data.custom
        }
      });
      return { success: true, data: queueItem };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new ImageOptimizer(); 