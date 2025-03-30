<template>
  <div class="influencer-list section">
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
          <button @click="loadInfluencers" class="button is-danger is-light">
            <span class="icon"><i class="fas fa-sync"></i></span>
            <span>Retry</span>
          </button>
          <button @click="loadTestData" class="button is-info is-light">
            <span class="icon"><i class="fas fa-vial"></i></span>
            <span>Load Sample Data</span>
          </button>
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

      <!-- Pagination -->
      <nav v-if="influencers.length > 0" class="pagination is-centered mt-6" role="navigation" aria-label="pagination">
        <a 
          @click="prevPage" 
          class="pagination-previous" 
          :disabled="currentPage <= 1"
        >Previous</a>
        <a 
          @click="nextPage" 
          class="pagination-next" 
          :disabled="influencers.length < pageSize"
        >Next page</a>
        <ul class="pagination-list">
          <li v-for="page in visiblePages" :key="page">
            <a 
              class="pagination-link" 
              :class="{ 'is-current': page === currentPage }"
              @click="goToPage(page)"
            >{{ page }}</a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Add/Edit Influencer Modal -->
    <div class="modal" :class="{ 'is-active': showAddModal || showEditModal }">
      <div class="modal-background" @click="closeModals"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ showEditModal ? 'Edit Influencer' : 'Add New Influencer' }}
          </p>
          <button class="delete" aria-label="close" @click="closeModals"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Handle *</label>
            <div class="control has-icons-left">
              <input
                v-model="formData.handle"
                class="input"
                type="text"
                placeholder="@username"
                required
              >
              <span class="icon is-small is-left">
                <i class="fas fa-at"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Name *</label>
            <div class="control has-icons-left">
              <input
                v-model="formData.name"
                class="input"
                type="text"
                placeholder="Full Name"
                required
              >
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Bio</label>
            <div class="control">
              <textarea
                v-model="formData.bio"
                class="textarea"
                placeholder="Short biography"
              ></textarea>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Image URL</label>
                <div class="control has-icons-left">
                  <input
                    v-model="formData.image"
                    class="input"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-image"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Category</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="formData.category">
                      <option value="">Select a category</option>
                      <option v-for="category in categories" :key="category">{{ category }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Followers</label>
                <div class="control has-icons-left">
                  <input
                    v-model.number="formData.followers"
                    class="input"
                    type="number"
                    min="0"
                    placeholder="0"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-users"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Engagement Rate (%)</label>
                <div class="control has-icons-left">
                  <input
                    v-model.number="formData.engagementRate"
                    class="input"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-chart-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Posts</label>
                <div class="control has-icons-left">
                  <input
                    v-model.number="formData.posts"
                    class="input"
                    type="number"
                    min="0"
                    placeholder="0"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-image"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Tag Type</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="formData.tagType">
                      <option value="">None</option>
                      <option value="Featured">Featured</option>
                      <option value="Verified">Verified</option>
                      <option value="Premium">Premium</option>
                      <option value="Trending">Trending</option>
                      <option value="Rising">Rising</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="formData.verified">
                <span class="ml-2">Verified Account</span>
              </label>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="formData.featured">
                <span class="ml-2">Featured Influencer</span>
              </label>
            </div>
          </div>

          <!-- Social Profiles Section -->
          <div class="mt-5 mb-3">
            <h3 class="title is-5">Social Profiles</h3>
            <div v-for="(profile, index) in formData.socialProfiles" :key="index" class="box mb-3">
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Platform</label>
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select v-model="profile.platform">
                          <option value="Instagram">Instagram</option>
                          <option value="TikTok">TikTok</option>
                          <option value="YouTube">YouTube</option>
                          <option value="Twitter">Twitter</option>
                          <option value="Facebook">Facebook</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Username</label>
                    <div class="control">
                      <input
                        v-model="profile.username"
                        class="input"
                        type="text"
                        placeholder="Username"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">URL</label>
                    <div class="control">
                      <input
                        v-model="profile.url"
                        class="input"
                        type="text"
                        placeholder="https://platform.com/username"
                      >
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Followers</label>
                    <div class="control">
                      <input
                        v-model.number="profile.followers"
                        class="input"
                        type="number"
                        min="0"
                        placeholder="0"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="has-text-right">
                <button @click="removeProfile(index)" class="button is-small is-danger is-light">
                  <span class="icon">
                    <i class="fas fa-times"></i>
                  </span>
                  <span>Remove Profile</span>
                </button>
              </div>
            </div>
            
            <div class="has-text-centered mt-4">
              <button @click="addProfile" class="button is-info is-light">
                <span class="icon">
                  <i class="fas fa-plus"></i>
                </span>
                <span>Add Social Profile</span>
              </button>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="saveInfluencer" class="button is-primary">Save</button>
          <button @click="closeModals" class="button">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" :class="{ 'is-active': showDeleteModal }">
      <div class="modal-background" @click="showDeleteModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head has-background-danger-light">
          <p class="modal-card-title">Confirm Deletion</p>
          <button class="delete" aria-label="close" @click="showDeleteModal = false"></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure you want to delete the influencer <strong>{{ selectedInfluencer?.handle }}</strong>?</p>
          <p class="mt-3">This action cannot be undone and will remove all data associated with this influencer.</p>
        </section>
        <footer class="modal-card-foot">
          <button @click="deleteInfluencer" class="button is-danger">Delete Influencer</button>
          <button @click="showDeleteModal = false" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
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
      ]
    };
  },
  computed: {
    visiblePages() {
      const range = [];
      const rangeSize = 5;
      const halfRange = Math.floor(rangeSize / 2);
      
      let start = this.currentPage - halfRange;
      if (start < 1) start = 1;
      
      let end = start + rangeSize - 1;
      if (end > this.totalPages) {
        end = this.totalPages;
        start = Math.max(1, end - rangeSize + 1);
      }
      
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      
      return range;
    }
  },
  methods: {
    async loadInfluencers() {
      console.log('loadInfluencers method called');
      this.loading = true;
      this.error = null;
      
      try {
        console.log('Constructing API URL...');
        
        // Construct query parameters
        const params = new URLSearchParams();
        params.append('limit', this.pageSize);
        params.append('offset', (this.currentPage - 1) * this.pageSize);
        
        if (this.searchQuery) {
          params.append('query', this.searchQuery);
        }
        
        if (this.categoryFilter) {
          params.append('category', this.categoryFilter);
        }
        
        if (this.verifiedFilter) {
          params.append('verified', 'true');
        }
        
        if (this.featuredFilter) {
          params.append('featured', 'true');
        }
        
        const apiUrl = `/api/plugins/influencer-platform/influencers?${params.toString()}`;
        console.log(`Fetching from URL: ${apiUrl}`);
        
        // Fetch influencers
        console.log('Starting fetch request...');
        try {
          // Try the API first
          const response = await fetch(apiUrl);
          console.log(`Fetch response received, status: ${response.status}`);
          
          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log(`Received ${data.length} influencers from API`);
          this.influencers = data;
        } catch (apiError) {
          console.error('API request failed, trying static file:', apiError);
          
          // Fall back to static file
          const staticResponse = await fetch('/data/mock-influencers.json');
          if (!staticResponse.ok) {
            throw new Error('Both API and static file failed to load');
          }
          
          const staticData = await staticResponse.json();
          console.log(`Loaded ${staticData.length} influencers from static file`);
          this.influencers = staticData;
        }
        
        // Estimate total pages
        if (data.length < this.pageSize) {
          this.totalPages = this.currentPage;
        } else {
          this.totalPages = this.currentPage + 1;
        }
        
        console.log('Influencers loaded successfully');
      } catch (err) {
        console.error('Error loading influencers:', err);
        this.error = err.message || 'Failed to load influencers';
        
        // Try loading test data as fallback
        this.loadTestData();
      } finally {
        this.loading = false;
        console.log('Loading state set to false');
      }
    },
    
    // Add test data method to provide fallback data
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
    
    resetFilters() {
      this.searchQuery = '';
      this.categoryFilter = '';
      this.verifiedFilter = false;
      this.featuredFilter = false;
      this.currentPage = 1;
      this.loadInfluencers();
    },
    
    // Pagination methods
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadInfluencers();
      }
    },
    
    nextPage() {
      if (this.influencers.length === this.pageSize) {
        this.currentPage++;
        this.loadInfluencers();
      }
    },
    
    goToPage(page) {
      this.currentPage = page;
      this.loadInfluencers();
    },
    
    // Formatting helpers
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
    
    // CRUD operations
    viewInfluencer(id) {
      // Navigate to influencer details page
      window.location.href = `/influencers/${id}`;
    },
    
    editInfluencer(influencer) {
      this.selectedInfluencer = influencer;
      this.formData = { ...influencer };
      if (!this.formData.socialProfiles) {
        this.formData.socialProfiles = [];
      }
      this.showEditModal = true;
    },
    
    confirmDelete(influencer) {
      this.selectedInfluencer = influencer;
      this.showDeleteModal = true;
    },
    
    async deleteInfluencer() {
      if (!this.selectedInfluencer) return;
      
      try {
        const response = await fetch(`/api/plugins/influencer-platform/influencers/${this.selectedInfluencer.id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        // Remove from local list
        this.influencers = this.influencers.filter(i => i.id !== this.selectedInfluencer.id);
        this.showDeleteModal = false;
        this.selectedInfluencer = null;
        
        // Show success message
        alert('Influencer deleted successfully');
      } catch (err) {
        console.error('Error deleting influencer:', err);
        alert(`Failed to delete influencer: ${err.message}`);
      }
    },
    
    async saveInfluencer() {
      // Validate required fields
      if (!this.formData.handle || !this.formData.name) {
        alert('Handle and Name are required fields');
        return;
      }
      
      try {
        // Prepare the data
        const influencerData = {
          ...this.formData,
          // Make sure socialProfiles have the correct field names
          socialProfiles: this.formData.socialProfiles.map(profile => ({
            platform: profile.platform,
            handle: profile.handle || profile.username, // Support both field names
            url: profile.url,
            followers: profile.followers || 0
          }))
        };
        
        let url = '/api/plugins/influencer-platform/influencers';
        let method = 'POST';
        
        // If editing, use PUT instead
        if (this.showEditModal && this.selectedInfluencer) {
          url = `${url}/${this.selectedInfluencer.id}`;
          method = 'PUT';
        }
        
        console.log(`Saving influencer to ${url} with method ${method}`);
        console.log('Data:', JSON.stringify(influencerData, null, 2));
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(influencerData)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server responded with status: ${response.status} - ${errorText}`);
        }
        
        const savedInfluencer = await response.json();
        console.log('Saved influencer:', savedInfluencer);
        
        // Update the list
        if (this.showEditModal) {
          // Replace the edited item
          const index = this.influencers.findIndex(i => i.id === savedInfluencer.id);
          if (index !== -1) {
            this.influencers.splice(index, 1, savedInfluencer);
          }
        } else {
          // Add new item to the list
          this.influencers.unshift(savedInfluencer);
          if (this.influencers.length > this.pageSize) {
            this.influencers.pop();
          }
        }
        
        // Close the modal and reset form
        this.closeModals();
        
        // Show success message
        alert(`Influencer ${this.showEditModal ? 'updated' : 'created'} successfully`);
      } catch (err) {
        console.error('Error saving influencer:', err);
        alert(`Failed to save influencer: ${err.message}`);
      }
    },
    
    // Social profiles
    addProfile() {
      this.formData.socialProfiles.push({
        platform: 'Instagram',
        handle: '',  // Changed from username to handle to match your schema
        url: '',
        followers: 0
      });
    },
    
    removeProfile(index) {
      this.formData.socialProfiles.splice(index, 1);
    },
    
    // UI helpers
    closeModals() {
      this.showAddModal = false;
      this.showEditModal = false;
      this.showDeleteModal = false;
      this.selectedInfluencer = null;
      this.formData = {
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
      };
    }
  },
  mounted() {
    console.log('InfluencerList component mounted');
    try {
      this.loadInfluencers();
    } catch (error) {
      console.error('Error in mounted hook:', error);
      this.error = `Failed to load influencers: ${error.message}`;
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.influencer-card {
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.influencer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
}

.influencer-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bold;
  border-radius: 4px;
  z-index: 1;
}

.category-tag {
  display: inline-block;
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 10px;
  color: #4a4a4a;
}

.influencer-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.stat-item .icon {
  margin-right: 4px;
  color: #7957d5;
}

.card-footer-item {
  cursor: pointer;
  transition: background-color 0.3s;
}

.card-footer-item:hover {
  background-color: #f5f5f5;
}

.influencer-card {
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.influencer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
}

.influencer-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bold;
  border-radius: 4px;
  z-index: 1;
}

.category-tag {
  display: inline-block;
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 10px;
  color: #4a4a4a;
}

.influencer-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.stat-item .icon {
  margin-right: 4px;
  color: #7957d5;
}

.card-footer-item {
  cursor: pointer;
  transition: background-color 0.3s;
}

.card-footer-item:hover {
  background-color: #f5f5f5;
}

.card-footer-item .icon {
  margin-right: 4px;
}

.card-content {
  flex-grow: 1;
}

.pagination-link.is-current {
  background-color: #3273dc;
  border-color: #3273dc;
}

.modal-card {
  width: 80%;
  max-width: 800px;
}

@media screen and (max-width: 768px) {
  .modal-card {
    width: 95%;
  }
  
  .column.is-3 {
    width: 50%;
  }
}

@media screen and (max-width: 480px) {
  .column.is-3 {
    width: 100%;
  }
}
</style>