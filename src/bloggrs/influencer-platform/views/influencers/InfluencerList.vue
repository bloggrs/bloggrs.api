<template>
  <div class="influencer-list">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Influencers</h1>
          <h2 class="subtitle">Discover and connect with top Instagram creators</h2>
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
              placeholder="Search influencers..." 
              v-model="searchQuery"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoading" class="has-text-centered my-6">
          <div class="loader"></div>
          <p class="mt-3">Loading influencers...</p>
        </div>

        <!-- Error notification -->
        <div v-if="error" class="notification is-danger">
          <button class="delete" @click="error = null"></button>
          <p><strong>Error loading influencers:</strong> {{ error }}</p>
          <p>Please try again later.</p>
        </div>

        <!-- Results counter -->
        <p class="mb-4" v-if="!isLoading && filteredInfluencers.length > 0">
          Found {{ filteredInfluencers.length }} influencers
        </p>

        <!-- No results -->
        <div v-if="!isLoading && filteredInfluencers.length === 0" class="notification is-warning">
          <p><strong>No influencers found.</strong></p>
          <p v-if="searchQuery">Try adjusting your search query.</p>
        </div>

        <!-- Influencer cards -->
        <div class="columns is-multiline">
          <div 
            v-for="influencer in filteredInfluencers" 
            :key="influencer.id" 
            class="column is-one-third"
          >
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <img 
                        :src="influencer.profileImage || 'https://bulma.io/images/placeholders/96x96.png'" 
                        alt="Profile image"
                        class="is-rounded"
                      >
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{ influencer.name }}</p>
                    <p class="subtitle is-6">{{ influencer.handle }}</p>
                  </div>
                </div>

                <div class="content">
                  <p>{{ influencer.bio || 'No bio provided' }}</p>
                  <div class="tags">
                    <span 
                      v-for="category in influencer.categories" 
                      :key="category.id"
                      class="tag is-primary is-light"
                    >
                      {{ category.name }}
                    </span>
                  </div>
                </div>

                <div class="level mt-3 is-mobile">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Followers</p>
                      <p class="title is-5">{{ formatNumber(influencer.followerCount) }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Engagement</p>
                      <p class="title is-5">{{ influencer.engagementRate }}%</p>
                    </div>
                  </div>
                </div>
              </div>
              <footer class="card-footer">
                <a :href="`/influencers/${influencer.id}`" class="card-footer-item">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fas fa-user"></i>
                    </span>
                    <span>View Profile</span>
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
      searchQuery: '',
      error: null,
      isLoading: false,
      influencers: [] // Default empty array
    };
  },
  
  computed: {
    filteredInfluencers() {
      // Get influencers from the data provided by the server
      const influencers = this.influencers || [];
      
      if (!this.searchQuery) {
        return influencers;
      }
      
      const query = this.searchQuery.toLowerCase();
      return influencers.filter(influencer => {
        return (
          (influencer.name && influencer.name.toLowerCase().includes(query)) ||
          (influencer.handle && influencer.handle.toLowerCase().includes(query)) ||
          (influencer.bio && influencer.bio.toLowerCase().includes(query)) ||
          (influencer.categories && influencer.categories.some(category => 
            category.name && category.name.toLowerCase().includes(query)
          ))
        );
      });
    }
  },
  
  methods: {
    formatNumber(num) {
      if (num === undefined || num === null) return '0';
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    }
  },
  
  mounted() {
    console.log('[InfluencerList] Component mounted');
    
    // Copy influencers from initialData if needed
    if (!this.influencers || this.influencers.length === 0) {
      if (window.INITIAL_DATA && window.INITIAL_DATA.influencers) {
        this.influencers = window.INITIAL_DATA.influencers;
        console.log('[InfluencerList] Loaded influencers from INITIAL_DATA:', this.influencers.length);
      } else {
        console.warn('[InfluencerList] No influencers data available');
        this.error = 'Failed to load influencer data';
      }
    }
    
    console.log('[InfluencerList] Current influencers count:', this.influencers?.length || 0);
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