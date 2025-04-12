const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StateManager {
  async createState(instanceId, componentId, data) {
    try {
      const state = await prisma.vueComponentState.create({
        data: {
          instanceId,
          componentId,
          name: data.name,
          type: data.type || 'REACTIVE',
          scope: data.scope || 'LOCAL',
          initialValue: data.initialValue || null,
          deep: data.deep || false,
          immediate: data.immediate || false
        }
      });
      return { success: true, data: state };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addWatcher(stateId, data) {
    try {
      const watcher = await prisma.vueStateWatchers.create({
        data: {
          stateId,
          name: data.name,
          handler: data.handler,
          deep: data.deep || false,
          immediate: data.immediate || false,
          flush: data.flush || 'PRE'
        }
      });
      return { success: true, data: watcher };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async syncState(instanceId, data) {
    try {
      const sync = await prisma.vueStateSync.create({
        data: {
          instanceId,
          source: data.source,
          target: data.target,
          type: data.type || 'TWO_WAY',
          transform: data.transform,
          reverse: data.reverse,
          deep: data.deep || false,
          immediate: data.immediate || true
        }
      });
      return { success: true, data: sync };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new StateManager(); 