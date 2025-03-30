<template>
  <div class="router-debug">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Router Debug</h1>
          <h2 class="subtitle">Troubleshooting plugin routes</h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="box">
          <h3 class="title is-4">Current Route Information</h3>
          <table class="table is-fullwidth">
            <tbody>
              <tr>
                <th>Current Path</th>
                <td>{{ currentPath }}</td>
              </tr>
              <tr>
                <th>Plugin ID</th>
                <td>{{ pluginId }}</td>
              </tr>
              <tr>
                <th>Route Params</th>
                <td>{{ JSON.stringify(routeParams) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="box">
          <h3 class="title is-4">Available Routes</h3>
          <div v-if="routes.length > 0">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Path</th>
                  <th>Component</th>
                  <th>Data Provider</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="route in routes" :key="route.path">
                  <td>{{ route.path }}</td>
                  <td>{{ route.component }}</td>
                  <td>{{ route.dataProvider || 'None' }}</td>
                  <td>
                    <a :href="route.path" class="button is-small is-primary">Visit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="notification is-warning">
            <p>No routes available.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPath: window.location.pathname,
      pluginId: window.PLUGIN_ID || 'unknown',
      routeParams: window.ROUTE_PARAMS || {}
    };
  },
  
  computed: {
    routes() {
      return this.availableRoutes || [];
    }
  },
  
  mounted() {
    console.log('[RouterDebug] Component mounted');
    this.loadRoutes();
  },
  
  methods: {
    async loadRoutes() {
      try {
        const response = await fetch('/debug/routes');
        const data = await response.json();
        
        if (data.status === 'success') {
          let allRoutes = [];
          
          data.plugins.forEach(plugin => {
            if (plugin.routes && Array.isArray(plugin.routes)) {
              allRoutes = allRoutes.concat(plugin.routes);
            }
          });
          
          this.availableRoutes = allRoutes;
        } else {
          console.error('[RouterDebug] Error loading routes:', data.message);
        }
      } catch (error) {
        console.error('[RouterDebug] Error fetching routes:', error);
      }
    }
  }
};
</script> 