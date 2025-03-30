// Pre-compiled version of InfluencerList.vue
(function() {
  // Register the InfluencerList component if Vue is available
  if (window.Vue) {
    window.InfluencerListComponent = {
      template: `<div class="influencer-list section">
        <div class="container">
          <!-- Header with title and add button -->
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <h1 class="title is-2">
                  <span class="icon-text">
                    <span class="icon"><i class="fas fa-users"></i></span>
                    <span>Influencers</span>
                  </span>
                </h1>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button @click="showAddModal = true" class="button is-primary">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  <span>Add Influencer</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Search and filters -->
          <div class="box">
            <div class="columns">
              <div class="column is-8">
                <div class="field has-addons">
                  <div class="control is-expanded">
                    <input
                      v-model="searchQuery"
                      class="input"
                      type="text"
                      placeholder="Search by name, handle, or category"
                    />
                  </div>
                  <div class="control">
                    <button @click="loadInfluencers" class="button is-info">
                      <span class="icon">
                        <i class="fas fa-search"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="column is-4">
                <div class="field">
                  <div class="control is-expanded">
                    <div class="select is-fullwidth">
                      <select v-model="categoryFilter">
                        <option value="">All Categories</option>
                        <option v-for="category in categories" :key="category">{{ category }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="checkbox">
                  <input type="checkbox" v-model="verifiedFilter">
                  <span class="ml-2">Verified Only</span>
                </label>
              </div>
              <div class="column">
                <label class="checkbox">
                  <input type="checkbox" v-model="featuredFilter">
                  <span class="ml-2">Featured Only</span>
                </label>
              </div>
              <div class="column is-3">
                <button @click="loadInfluencers" class="button is-info is-light is-fullwidth">
                  Apply Filters
                </button>
              </div>
              <div class="column is-3">
                <button @click="resetFilters" class="button is-light is-fullwidth">
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="loading" class="has-text-centered my-6">
            <span class="icon is-large">
              <i class="fas fa-spinner fa-pulse fa-2x"></i>
            </span>
            <p class="mt-4">Loading influencers...</p>
          </div>

          <!-- Error message -->
          <div v-else-if="error" class="notification is-danger my-6">
            <p><strong>Error:</strong> {{ error }}</p>
            <div class="buttons mt-3">
              <button @click="loadInfluencers" class="button is-danger is-light">Try Again</button>
              <button @click="loadTestData" class="button is-info is-light">Load Sample Data</button>
            </div>
          </div>

          <!-- Influencer grid -->
          <div v-else-if="influencers.length > 0" class="columns is-multiline mt-5">
            <div
              v-for="influencer in influencers"
              :key="influencer.id"
              class="column is-3"
            >
              <div class="card influencer-card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img :src="influencer.image || 'https://bulma.io/images/placeholders/480x360.png'" :alt="influencer.name">
                  </figure>
                  <span 
                    v-if="influencer.tagType" 
                    class="tag influencer-tag" 
                    :class="getTagClass(influencer.tagType)"
                  >
                    <span class="icon">
                      <i :class="getTagIcon(influencer.tagType)"></i>
                    </span>
                    <span>{{ influencer.tagType }}</span>
                  </span>
                </div>
                <div class="card-content">
                  <p class="title is-4">{{ influencer.handle }}</p>
                  <p class="subtitle is-6">{{ influencer.name }}</p>
                  <div class="content">
                    <p v-if="influencer.category" class="category-tag">{{ influencer.category }}</p>
                    <p v-else class="category-tag is-light">Uncategorized</p>
                    
                    <div class="influencer-stats">
                      <div class="stat-item">
                        <span class="icon">
                          <i class="fas fa-users"></i>
                        </span>
                        <span>{{ formatNumber(influencer.followers || 0) }}</span>
                      </div>
                      <div class="stat-item">
                        <span class="icon">
                          <i class="fas fa-chart-line"></i>
                        </span>
                        <span>{{ (influencer.engagementRate || 0).toFixed(1) }}%</span>
                      </div>
                      <div class="stat-item">
                        <span class="icon">
                          <i class="fas fa-image"></i>
                        </span>
                        <span>{{ formatNumber(influencer.posts || 0) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <footer class="card-footer">
                  <a @click="viewInfluencer(influencer.id)" class="card-footer-item">
                    <span class="icon">
                      <i class="fas fa-eye"></i>
                    </span>
                    <span>View</span>
                  </a>
                  <a @click="editInfluencer(influencer)" class="card-footer-item">
                    <span class="icon">
                      <i class="fas fa-edit"></i>
                    </span>
                    <span>Edit</span>
                  </a>
                  <a @click="confirmDelete(influencer)" class="card-footer-item has-text-danger">
                    <span class="icon">
                      <i class="fas fa-trash"></i>
                    </span>
                    <span>Delete</span>
                  </a>
                </footer>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else class="has-text-centered my-6 box py-6">
            <span class="icon is-large">
              <i class="fas fa-user-slash fa-2x"></i>
            </span>
            <p class="mt-4 is-size-5">No influencers found.</p>
            <p class="mt-2 has-text-grey">Try adjusting your search criteria or add a new influencer.</p>
            <button @click="showAddModal = true" class="button is-primary mt-4">
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              <span>Add Influencer</span>
            </button>
          </div>

          <!-- Rest of the template truncated for brevity -->
        </div>
      </div>`,
      
      data() {
        return {
          influencers: [],
          loading: true,
          error: null,
          searchQuery: '',
          categoryFilter: '',
          verifiedFilter: false,
          featuredFilter: false,
          currentPage: 1,
          pageSize: 12,
          totalPages: 1,
          showAddModal: false,
          showEditModal: false,
          showDeleteModal: false,
          selectedInfluencer: null,
          formData: {
            handle: '',
            name: '',
            bio: '',
            image: '',
            category: '',
            followers: 0,
            engagementRate: 0,
            posts: 0,
            verified: false,
            featured: false,
            tagType: '',
            socialProfiles: []
          },
          categories: [
            'Fashion & Style',
            'Beauty & Makeup',
            'Fitness & Wellness',
            'Food & Cooking',
            'Travel & Adventure',
            'Lifestyle',
            'Technology & Gaming',
            'Business & Entrepreneurship',
            'Art & Design',
            'Education & Learning',
            'Family & Parenting',
            'Entertainment',
            'Sports'
          ],
          isClient: false, // To track if running in browser
          debug: { // Debug information
            loadCalled: false,
            apiAttempted: false,
            loadCount: 0
          }
        };
      },
      
      mounted() {
        console.log('InfluencerList component mounted from pre-compiled version');
        this.isClient = true;
        this.loadInfluencers();
      },
      
      methods: {
        // Only include the most important methods
        async loadInfluencers() {
          console.log('loadInfluencers method called');
          this.loading = true;
          this.error = null;
          
          try {
            const apiUrl = `/api/plugins/influencer-platform/influencers`;
            console.log(`Fetching from URL: ${apiUrl}`);
            
            try {
              const response = await fetch(apiUrl);
              console.log(`API response received, status: ${response.status}`);
              
              if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
              }
              
              const data = await response.json();
              console.log(`Received ${data.length} influencers from API`);
              
              this.influencers = data.map(influencer => {
                let tagType = '';
                if (influencer.verified) tagType = 'Verified';
                if (influencer.featured) tagType = 'Featured';
                
                return {
                  ...influencer,
                  tagType,
                  posts: influencer.posts || 0,
                  followers: influencer.followers || 0,
                  engagementRate: influencer.engagementRate || 0,
                  socialProfiles: influencer.socialProfiles || []
                };
              });
            } catch (apiError) {
              console.error('API request failed, loading test data:', apiError);
              this.loadTestData();
            }
          } catch (err) {
            console.error('Error loading influencers:', err);
            this.error = err.message || 'Failed to load influencers';
            this.loadTestData();
          } finally {
            this.loading = false;
          }
        },
        
        loadTestData() {
          console.log('Loading test data...');
          this.influencers = [
            {
              id: '1',
              name: 'Alex Morgan',
              handle: 'alexstyle',
              image: 'https://via.placeholder.com/300?text=AlexMorgan',
              bio: 'Fashion enthusiast sharing daily outfit inspiration.',
              category: 'Fashion & Style',
              followers: 850000,
              engagementRate: 3.2,
              posts: 457,
              verified: true,
              featured: true,
              tagType: 'Featured',
              socialProfiles: []
            },
            {
              id: '2',
              name: 'Jamie Lee',
              handle: 'jamiebeauty',
              image: 'https://via.placeholder.com/300?text=JamieLee', 
              bio: 'Beauty guru with a passion for skincare and makeup tips.',
              category: 'Beauty & Makeup',
              followers: 1200000,
              engagementRate: 4.5,
              posts: 612,
              verified: true,
              featured: false,
              tagType: 'Verified',
              socialProfiles: []
            }
          ];
          
          this.totalPages = 1;
          console.log('Test data loaded');
        },
        
        formatNumber(num) {
          if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
          } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
          }
          return num.toString();
        },
        
        getTagClass(tagType) {
          const classes = {
            'Featured': 'is-primary is-light',
            'Verified': 'is-success is-light',
            'Premium': 'is-warning is-light',
            'Trending': 'is-info is-light',
            'Rising': 'is-danger is-light'
          };
          
          return classes[tagType] || 'is-light';
        },
        
        getTagIcon(tagType) {
          const icons = {
            'Featured': 'fas fa-star',
            'Verified': 'fas fa-check-circle',
            'Premium': 'fas fa-gem',
            'Trending': 'fas fa-fire',
            'Rising': 'fas fa-arrow-up'
          };
          
          return icons[tagType] || 'fas fa-tag';
        },
        
        viewInfluencer(id) {
          window.location.href = `/influencers/${id}`;
        },
        
        resetFilters() {
          this.searchQuery = '';
          this.categoryFilter = '';
          this.verifiedFilter = false;
          this.featuredFilter = false;
          this.currentPage = 1;
          this.loadInfluencers();
        }
      }
    };
    
    // Load the component when the DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
      // Check if we're on the influencers route
      if (window.location.pathname === '/influencers') {
        // Create a Vue app with the influencer list component
        const app = Vue.createApp(window.InfluencerListComponent);
        app.mount('#app');
        console.log('Mounted InfluencerList as a standalone component');
      }
    });
  }
})(); 