<template>
  <div class="brand-detail">
    <div v-if="brand">
      <!-- Hero section with brand info -->
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered">
              <div class="column is-narrow">
                <figure class="image is-96x96">
                  <img 
                    :src="brand.logo || 'https://bulma.io/images/placeholders/96x96.png'" 
                    alt="Brand logo"
                  >
                </figure>
              </div>
              <div class="column">
                <h1 class="title">{{ brand.name }}</h1>
                <h2 class="subtitle">{{ brand.industry }}</h2>
                <p v-if="brand.website">
                  <a :href="formatWebsiteUrl(brand.website)" target="_blank" class="has-text-white">
                    <span class="icon-text">
                      <span class="icon">
                        <i class="fas fa-globe"></i>
                      </span>
                      <span>{{ brand.website }}</span>
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="columns">
            <!-- Main content -->
            <div class="column is-two-thirds">
              <div class="box">
                <h3 class="title is-4">About</h3>
                <p>{{ brand.description || 'No description provided' }}</p>
                
                <hr>
                
                <h3 class="title is-4">Active Campaigns</h3>
                <div v-if="activeCampaigns && activeCampaigns.length > 0">
                  <div v-for="campaign in activeCampaigns" :key="campaign.id" class="box">
                    <article class="media">
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>{{ campaign.name }}</strong>
                            <br>
                            <small>
                              Budget: ${{ formatNumber(campaign.budget) }}
                              | Dates: {{ formatDate(campaign.startDate) }} - {{ formatDate(campaign.endDate) }}
                            </small>
                            <br>
                            {{ campaign.description }}
                          </p>
                          <div class="tags mt-2">
                            <span class="tag is-primary">{{ campaign.objective }}</span>
                            <span class="tag is-success">ACTIVE</span>
                          </div>
                        </div>
                      </div>
                      <div class="media-right">
                        <a :href="`/campaigns/${campaign.id}`" class="button is-primary is-small">View</a>
                      </div>
                    </article>
                  </div>
                </div>
                <div v-else class="notification is-light">
                  <p>No active campaigns found for this brand.</p>
                  <a href="/campaigns/new" class="button is-primary is-small mt-2">Create Campaign</a>
                </div>
                
                <hr>
                
                <h3 class="title is-4">Past Campaigns</h3>
                <div v-if="pastCampaigns && pastCampaigns.length > 0">
                  <div v-for="campaign in pastCampaigns" :key="campaign.id" class="box">
                    <article class="media">
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>{{ campaign.name }}</strong>
                            <br>
                            <small>
                              Budget: ${{ formatNumber(campaign.budget) }}
                              | Dates: {{ formatDate(campaign.startDate) }} - {{ formatDate(campaign.endDate) }}
                            </small>
                            <br>
                            {{ campaign.description }}
                          </p>
                          <div class="tags mt-2">
                            <span class="tag is-primary">{{ campaign.objective }}</span>
                            <span class="tag is-info">COMPLETED</span>
                          </div>
                        </div>
                      </div>
                      <div class="media-right">
                        <a :href="`/campaigns/${campaign.id}`" class="button is-info is-small">View</a>
                      </div>
                    </article>
                  </div>
                </div>
                <div v-else class="notification is-light">
                  <p>No past campaigns found for this brand.</p>
                </div>
              </div>
            </div>
            
            <!-- Sidebar -->
            <div class="column is-one-third">
              <!-- Statistics card -->
              <div class="box">
                <h3 class="title is-4">Statistics</h3>
                <div class="level">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Total Campaigns</p>
                      <p class="title is-4">{{ (activeCampaigns?.length || 0) + (pastCampaigns?.length || 0) }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Active</p>
                      <p class="title is-4">{{ activeCampaigns?.length || 0 }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="level">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Total Budget</p>
                      <p class="title is-5">${{ formatNumber(getTotalBudget()) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Contact card -->
              <div class="box">
                <h3 class="title is-4">Contact</h3>
                <div class="field">
                  <label class="label">Contact Person</label>
                  <p>{{ brand.contactName || 'Not specified' }}</p>
                </div>
                
                <div class="field">
                  <label class="label">Email</label>
                  <p>
                    <a :href="`mailto:${brand.contactEmail}`">{{ brand.contactEmail || 'Not provided' }}</a>
                  </p>
                </div>
                
                <div class="field">
                  <label class="label">Phone</label>
                  <p>
                    <a :href="`tel:${brand.contactPhone}`">{{ brand.contactPhone || 'Not provided' }}</a>
                  </p>
                </div>
                
                <div class="field mt-4">
                  <button class="button is-primary is-fullwidth">
                    <span class="icon">
                      <i class="fas fa-envelope"></i>
                    </span>
                    <span>Contact Brand</span>
                  </button>
                </div>
              </div>
              
              <!-- Actions card -->
              <div class="box">
                <h3 class="title is-4">Actions</h3>
                <div class="buttons">
                  <a href="/campaigns/new" class="button is-primary is-fullwidth">
                    <span class="icon">
                      <i class="fas fa-plus"></i>
                    </span>
                    <span>Create New Campaign</span>
                  </a>
                  
                  <button class="button is-info is-fullwidth">
                    <span class="icon">
                      <i class="fas fa-edit"></i>
                    </span>
                    <span>Edit Brand</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Loading state -->
    <div v-else-if="isLoading" class="section">
      <div class="container has-text-centered">
        <div class="loader"></div>
        <p class="mt-3">Loading brand profile...</p>
      </div>
    </div>
    
    <!-- Error state -->
    <div v-else class="section">
      <div class="container">
        <div class="notification is-danger">
          <p><strong>Error:</strong> Failed to load brand data.</p>
          <button class="button is-white mt-3" @click="goToBrands">
            Go back to brands list
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    };
  },
  
  methods: {
    formatNumber(num) {
      if (!num) return '0';
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },
    
    formatWebsiteUrl(url) {
      if (!url) return '#';
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      return 'https://' + url;
    },
    
    getTotalBudget() {
      let total = 0;
      
      if (this.activeCampaigns) {
        this.activeCampaigns.forEach(c => {
          total += c.budget || 0;
        });
      }
      
      if (this.pastCampaigns) {
        this.pastCampaigns.forEach(c => {
          total += c.budget || 0;
        });
      }
      
      return total;
    },
    
    goToBrands() {
      window.location.href = '/brands';
    }
  },
  
  mounted() {
    console.log('[BrandDetail] Component mounted with data:', {
      brand: this.brand ? this.brand.id : null,
      activeCampaigns: this.activeCampaigns?.length || 0,
      pastCampaigns: this.pastCampaigns?.length || 0
    });
  }
};
</script>

<style>
.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3273dc;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 