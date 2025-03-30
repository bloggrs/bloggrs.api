<template>
  <div class="test-component">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Data Provider Test</h1>
          <h2 class="subtitle">Verifying data flow from server to client</h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="notification is-primary">
          <p>This component is used to test data providers and component data serialization.</p>
          <p><strong>Current route:</strong> {{ $route?.path || window.location.pathname }}</p>
          <p><strong>Plugin ID:</strong> {{ pluginId }}</p>
        </div>
        
        <div class="box">
          <h3 class="title is-4">Initial Data</h3>
          
          <div v-if="hasInitialData">
            <p><strong>Keys available:</strong> {{ Object.keys(initialData).join(', ') }}</p>
            <p><strong>Data:</strong></p>
            <pre style="max-height: 300px; overflow: auto; padding: 1rem; background-color: #f5f5f5; border-radius: 4px; margin-top: 10px;">{{ JSON.stringify(initialData, null, 2) }}</pre>
          </div>
          
          <div v-else class="notification is-warning">
            <p>No initial data available</p>
          </div>
        </div>
        
        <div class="box">
          <h3 class="title is-4">Route Params</h3>
          
          <div v-if="Object.keys(routeParams).length > 0">
            <p><strong>Params:</strong></p>
            <pre style="max-height: 300px; overflow: auto; padding: 1rem; background-color: #f5f5f5; border-radius: 4px; margin-top: 10px;">{{ JSON.stringify(routeParams, null, 2) }}</pre>
          </div>
          
          <div v-else class="notification is-warning">
            <p>No route parameters available</p>
          </div>
        </div>
        
        <div class="buttons">
          <button class="button is-primary" @click="testInfluencersData">Test Influencers Data</button>
          <button class="button is-info" @click="testBrandsData">Test Brands Data</button>
          <button class="button is-success" @click="testHomeData">Test Home Data</button>
        </div>
        
        <div v-if="testResult" class="box">
          <h3 class="title is-4">Test Result</h3>
          <pre style="max-height: 400px; overflow: auto; padding: 1rem; background-color: #f5f5f5; border-radius: 4px; margin-top: 10px;">{{ JSON.stringify(testResult, null, 2) }}</pre>
        </div>
        
        <div v-if="testError" class="notification is-danger">
          <p><strong>Error:</strong> {{ testError }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pluginId: window.PLUGIN_ID || 'unknown',
      initialData: window.INITIAL_DATA || {},
      routeParams: window.ROUTE_PARAMS || {},
      testResult: null,
      testError: null
    };
  },
  
  computed: {
    hasInitialData() {
      return this.initialData && Object.keys(this.initialData).length > 0;
    }
  },
  
  methods: {
    async testInfluencersData() {
      this.testResult = null;
      this.testError = null;
      
      try {
        const response = await fetch('/debug/plugin-data/influencer-platform/getInfluencersData');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        
        this.testResult = await response.json();
      } catch (error) {
        this.testError = `Failed to test influencers data: ${error.message}`;
        console.error(this.testError);
      }
    },
    
    async testBrandsData() {
      this.testResult = null;
      this.testError = null;
      
      try {
        const response = await fetch('/debug/plugin-data/influencer-platform/getBrandsData');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        
        this.testResult = await response.json();
      } catch (error) {
        this.testError = `Failed to test brands data: ${error.message}`;
        console.error(this.testError);
      }
    },
    
    async testHomeData() {
      this.testResult = null;
      this.testError = null;
      
      try {
        const response = await fetch('/debug/plugin-data/influencer-platform/getHomeData');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        
        this.testResult = await response.json();
      } catch (error) {
        this.testError = `Failed to test home data: ${error.message}`;
        console.error(this.testError);
      }
    }
  },
  
  mounted() {
    console.log('[TestComponent] Component mounted');
    console.log('[TestComponent] Initial data:', this.initialData);
    console.log('[TestComponent] Route params:', this.routeParams);
  }
};
</script> 