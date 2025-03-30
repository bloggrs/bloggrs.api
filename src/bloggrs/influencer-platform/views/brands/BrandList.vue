<template>
  <div class="brand-list">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Brands</h1>
          <h2 class="subtitle">Partner with top brands for influencer marketing campaigns</h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Search and filter -->
        <div class="field">
          <p class="control has-icons-left">
            <input 
              class="input is-medium" 
              type="text" 
              placeholder="Search brands..." 
              v-model="searchQuery"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
        </div>

        <!-- Results counter -->
        <p class="mb-4" v-if="filteredBrands.length > 0">
          Found {{ filteredBrands.length }} brands
        </p>

        <!-- No results -->
        <div v-if="filteredBrands.length === 0" class="notification is-warning">
          <p><strong>No brands found.</strong></p>
          <p v-if="searchQuery">Try adjusting your search query.</p>
          <p v-else>No brands are currently registered.</p>
        </div>

        <!-- Brand cards -->
        <div class="columns is-multiline">
          <div 
            v-for="brand in filteredBrands" 
            :key="brand.id" 
            class="column is-one-third"
          >
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <img 
                        :src="brand.logo || 'https://bulma.io/images/placeholders/96x96.png'" 
                        alt="Brand logo"
                      >
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ brand.name }}</p>
                    <p class="subtitle is-6">{{ brand.industry }}</p>
                  </div>
                </div>

                <div class="content">
                  <p>{{ brand.description || 'No description provided' }}</p>
                  <p v-if="brand.website">
                    <a :href="formatWebsiteUrl(brand.website)" target="_blank">
                      <span class="icon-text">
                        <span class="icon">
                          <i class="fas fa-globe"></i>
                        </span>
                        <span>{{ brand.website }}</span>
                      </span>
                    </a>
                  </p>
                </div>

                <div class="level mt-3 is-mobile">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Campaigns</p>
                      <p class="title is-5">{{ brand.campaigns?.length || 0 }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Active</p>
                      <p class="title is-5">{{ getActiveCampaignsCount(brand) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <footer class="card-footer">
                <a :href="`/brands/${brand.id}`" class="card-footer-item">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fas fa-building"></i>
                    </span>
                    <span>View Brand</span>
                  </span>
                </a>
                <a :href="`/brands/${brand.id}/campaigns`" class="card-footer-item">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fas fa-bullhorn"></i>
                    </span>
                    <span>Campaigns</span>
                  </span>
                </a>
              </footer>
            </div>
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
      searchQuery: ''
    };
  },
  
  computed: {
    filteredBrands() {
      // Get brands from the data provided by the server
      const brands = this.brands || [];
      
      if (!this.searchQuery) {
        return brands;
      }
      
      const query = this.searchQuery.toLowerCase();
      return brands.filter(brand => {
        return (
          brand.name.toLowerCase().includes(query) ||
          brand.industry?.toLowerCase().includes(query) ||
          brand.description?.toLowerCase().includes(query)
        );
      });
    }
  },
  
  methods: {
    formatWebsiteUrl(url) {
      if (!url) return '#';
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      return 'https://' + url;
    },
    
    getActiveCampaignsCount(brand) {
      if (!brand.campaigns) return 0;
      return brand.campaigns.filter(c => c.status === 'ACTIVE').length;
    }
  },
  
  mounted() {
    console.log('[BrandList] Component mounted');
    console.log('[BrandList] Server provided brands:', this.brands?.length || 0);
  }
};
</script>