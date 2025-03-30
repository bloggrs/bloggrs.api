<template>
  <div class="influencer-detail section">
    <div class="container">
      <!-- Breadcrumb navigation -->
      <nav class="breadcrumb mb-5" aria-label="breadcrumbs">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/influencers">Influencers</a></li>
          <li class="is-active"><a href="#" aria-current="page">{{ influencer.handle || 'Influencer Details' }}</a></li>
        </ul>
      </nav>
      
      <!-- Loading indicator -->
      <div v-if="loading" class="has-text-centered my-6">
        <span class="icon is-large">
          <i class="fas fa-spinner fa-pulse fa-2x"></i>
        </span>
        <p class="mt-4">Loading influencer details...</p>
      </div>
      
      <!-- Error message -->
      <div v-else-if="error" class="notification is-danger my-6">
        <p><strong>Error:</strong> {{ error }}</p>
        <button @click="loadInfluencer" class="button is-danger is-light mt-3">Try Again</button>
        <a href="/influencers" class="button is-light mt-3 ml-2">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span>Back to Influencers</span>
        </a>
      </div>
      
      <!-- Influencer content -->
      <div v-else-if="influencer.id" class="columns">
        <!-- Left column with info and stats -->
        <div class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="influencer.image || 'https://bulma.io/images/placeholders/1280x960.png'" 
                     :alt="influencer.name">
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
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ influencer.handle }}</p>
                  <p class="subtitle is-6">{{ influencer.name }}</p>
                </div>
              </div>
              
              <div class="content">
                <p v-if="influencer.bio">{{ influencer.bio }}</p>
                <p v-else class="has-text-grey-light">No biography provided</p>
                
                <p v-if="influencer.category" class="category-tag mt-3">{{ influencer.category }}</p>
              </div>
              
              <div class="notification is-light mt-4">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Followers</p>
                      <p class="title is-5">{{ formatNumber(influencer.followers) }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Engagement</p>
                      <p class="title is-5">{{ influencer.engagementRate.toFixed(1) }}%</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Posts</p>
                      <p class="title is-5">{{ formatNumber(influencer.posts) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a @click="editInfluencer" class="card-footer-item">
                <span class="icon">
                  <i class="fas fa-edit"></i>
                </span>
                <span>Edit</span>
              </a>
              <a @click="confirmDelete" class="card-footer-item has-text-danger">
                <span class="icon">
                  <i class="fas fa-trash"></i>
                </span>
                <span>Delete</span>
              </a>
            </footer>
          </div>
          
          <!-- Social profiles -->
          <div class="box mt-5">
            <h3 class="title is-5">
              <span class="icon-text">
                <span class="icon">
                  <i class="fas fa-share-alt"></i>
                </span>
                <span>Social Profiles</span>
              </span>
            </h3>
            
            <div v-if="influencer.socialProfiles && influencer.socialProfiles.length > 0">
              <div v-for="profile in influencer.socialProfiles" :key="profile.id" class="social-profile-item">
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span class="icon-text">
                        <span class="icon">
                          <i :class="getSocialIcon(profile.platform)"></i>
                        </span>
                        <span class="platform-name">{{ profile.platform }}</span>
                      </span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="followers">{{ formatNumber(profile.followers) }} followers</span>
                    </div>
                  </div>
                </div>
                
                <p class="username">
                  <a :href="profile.url" target="_blank" rel="noopener noreferrer">
                    {{ profile.username }}
                    <span class="icon is-small">
                      <i class="fas fa-external-link-alt"></i>
                    </span>
                  </a>
                </p>
              </div>
            </div>
            
            <div v-else class="has-text-centered py-4">
              <p class="has-text-grey">No social profiles added yet</p>
            </div>
          </div>
        </div>
        
        <!-- Right column with campaigns and content -->
        <div class="column is-8">
          <!-- Campaigns section -->
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <span class="icon-text">
                  <span class="icon">
                    <i class="fas fa-bullhorn"></i>
                  </span>
                  <span>Campaigns</span>
                </span>
              </p>
            </header>
            <div class="card-content">
              <div v-if="influencer.campaigns && influencer.campaigns.length > 0">
                <div class="table-container">
                  <table class="table is-fullwidth is-hoverable">
                    <thead>
                      <tr>
                        <th>Campaign</th>
                        <th>Brand</th>
                        <th>Status</th>
                        <th>Dates</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="campaign in influencer.campaigns" :key="campaign.id">
                        <td>{{ campaign.title }}</td>
                        <td>{{ campaign.brand?.name || 'Unknown Brand' }}</td>
                        <td>
                          <span class="tag" :class="getCampaignStatusClass(campaign.status)">
                            {{ campaign.status }}
                          </span>
                        </td>
                        <td>
                          <span v-if="campaign.startDate && campaign.endDate">
                            {{ formatDate(campaign.startDate) }} - {{ formatDate(campaign.endDate) }}
                          </span>
                          <span v-else-if="campaign.startDate">
                            From {{ formatDate(campaign.startDate) }}
                          </span>
                          <span v-else class="has-text-grey-light">
                            Not scheduled
                          </span>
                        </td>
                        <td>
                          <a :href="`/campaigns/${campaign.id}`" class="button is-small">
                            <span class="icon is-small">
                              <i class="fas fa-eye"></i>
                            </span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div v-else class="has-text-centered py-4">
                <p class="has-text-grey">No campaigns yet</p>
                <button class="button is-primary is-light mt-3">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  <span>Add to Campaign</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Sponsorships section -->
          <div class="card mt-5">
            <header class="card-header">
              <p class="card-header-title">
                <span class="icon-text">
                  <span class="icon">
                    <i class="fas fa-handshake"></i>
                  </span>
                  <span>Sponsorships</span>
                </span>
              </p>
            </header>
            <div class="card-content">
              <div v-if="influencer.sponsorships && influencer.sponsorships.length > 0">
                <div class="table-container">
                  <table class="table is-fullwidth is-hoverable">
                    <thead>
                      <tr>
                        <th>Brand</th>
                        <th>Period</th>
                        <th>Status</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="sponsorship in influencer.sponsorships" :key="sponsorship.id">
                        <td>{{ sponsorship.brand?.name || 'Unknown Brand' }}</td>
                        <td>
                          <span v-if="sponsorship.startDate && sponsorship.endDate">
                            {{ formatDate(sponsorship.startDate) }} - {{ formatDate(sponsorship.endDate) }}
                          </span>
                          <span v-else-if="sponsorship.startDate">
                            From {{ formatDate(sponsorship.startDate) }}
                          </span>
                          <span v-else class="has-text-grey-light">
                            Not specified
                          </span>
                        </td>
                        <td>
                          <span class="tag" :class="getSponsorshipStatusClass(sponsorship.status)">
                            {{ sponsorship.status }}
                          </span>
                        </td>
                        <td>
                          <span v-if="sponsorship.amount">
                            ${{ sponsorship.amount.toLocaleString() }}
                          </span>
                          <span v-else class="has-text-grey-light">
                            Not disclosed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div v-else class="has-text-centered py-4">
                <p class="has-text-grey">No sponsorships recorded</p>
                <button class="button is-primary is-light mt-3">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  <span>Add Sponsorship</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Content analytics -->
          <div class="card mt-5">
            <header class="card-header">
              <p class="card-header-title">
                <span class="icon-text">
                  <span class="icon">
                    <i class="fas fa-chart-bar"></i>
                  </span>
                  <span>Content Analytics</span>
                </span>
              </p>
            </header>
            <div class="card-content">
              <div class="notification is-info is-light">
                <p>Content analytics functionality will be available in the next version.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty state (if influencer not found) -->
      <div v-else class="has-text-centered my-6 box py-6">
        <span class="icon is-large">
          <i class="fas fa-user-slash fa-2x"></i>
        </span>
        <p class="mt-4 is-size-5">Influencer not found.</p>
        <p class="mt-2 has-text-grey">The influencer you're looking for doesn't exist or has been removed.</p>
        <a href="/influencers" class="button is-primary mt-4">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span>Back to Influencers</span>
        </a>
      </div>
    </div>
    
    <!-- Edit Influencer Modal -->
    <div class="modal" :class="{ 'is-active': showEditModal }">
      <div class="modal-background" @click="showEditModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Influencer</p>
          <button class="delete" aria-label="close" @click="showEditModal = false"></button>
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
          <button @click="saveInfluencer" class="button is-primary">Save Changes</button>
          <button @click="showEditModal = false" class="button">Cancel</button>
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
          <p>Are you sure you want to delete the influencer <strong>{{ influencer.handle }}</strong>?</p>
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
      influencer: {},
      loading: true,
      error: null,
      showEditModal: false,
      showDeleteModal: false,
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
  mounted() {
    // Extract ID from URL path
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    
    if (id) {
      this.loadInfluencer(id);
    } else {
      this.error = 'No influencer ID provided';
      this.loading = false;
    }
  },
  methods: {
    async loadInfluencer(id) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch(`/api/plugins/influencer-platform/influencers/${id}`);
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        this.influencer = data;
        
        // Initialize form data with influencer data
        this.formData = {
          handle: data.handle,
          name: data.name,
          bio: data.bio || '',
          image: data.image || '',
          category: data.category || '',
          followers: data.followers || 0,
          engagementRate: data.engagementRate || 0,
          posts: data.posts || 0,
          verified: data.verified || false,
          featured: data.featured || false,
          tagType: data.tagType || '',
          socialProfiles: data.socialProfiles ? [...data.socialProfiles] : []
        };
      } catch (err) {
        this.error = err.message || 'Failed to load influencer details';
        console.error('Error loading influencer:', err);
      } finally {
        this.loading = false;
      }
    },
    
    // Formatting helpers
    formatNumber(num) {
      if (!num) return '0';
      
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    },
    
    formatDate(dateString) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
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
    
    getSocialIcon(platform) {
      const icons = {
        'Instagram': 'fab fa-instagram',
        'TikTok': 'fab fa-tiktok',
YouTube': 'fab fa-youtube',
        'Twitter': 'fab fa-twitter',
        'Facebook': 'fab fa-facebook',
        'LinkedIn': 'fab fa-linkedin',
        'Pinterest': 'fab fa-pinterest',
        'Snapchat': 'fab fa-snapchat'
      };
      
      return icons[platform] || 'fas fa-link';
    },
    
    getCampaignStatusClass(status) {
      const classes = {
        'DRAFT': 'is-light',
        'ACTIVE': 'is-success is-light',
        'COMPLETED': 'is-info is-light',
        'CANCELLED': 'is-danger is-light'
      };
      
      return classes[status] || 'is-light';
    },
    
    getSponsorshipStatusClass(status) {
      const classes = {
        'PENDING': 'is-warning is-light',
        'ACTIVE': 'is-success is-light',
        'COMPLETED': 'is-info is-light',
        'CANCELLED': 'is-danger is-light'
      };
      
      return classes[status] || 'is-light';
    },
    
    // Modal management
    editInfluencer() {
      this.showEditModal = true;
    },
    
    confirmDelete() {
      this.showDeleteModal = true;
    },
    
    // Social profiles management
    addProfile() {
      this.formData.socialProfiles.push({
        platform: 'Instagram',
        username: '',
        url: '',
        followers: 0
      });
    },
    
    removeProfile(index) {
      this.formData.socialProfiles.splice(index, 1);
    },
    
    // CRUD operations
    async saveInfluencer() {
      // Validate required fields
      if (!this.formData.handle || !this.formData.name) {
        alert('Handle and Name are required fields');
        return;
      }
      
      try {
        const response = await fetch(`/api/plugins/influencer-platform/influencers/${this.influencer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const updatedInfluencer = await response.json();
        
        // Update local data
        this.influencer = updatedInfluencer;
        
        // Close modal
        this.showEditModal = false;
        
        // Show success message
        alert('Influencer updated successfully');
      } catch (err) {
        console.error('Error updating influencer:', err);
        alert(`Failed to update influencer: ${err.message}`);
      }
    },
    
    async deleteInfluencer() {
      try {
        const response = await fetch(`/api/plugins/influencer-platform/influencers/${this.influencer.id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        // Close modal
        this.showDeleteModal = false;
        
        // Show success message
        alert('Influencer deleted successfully');
        
        // Redirect to influencers list
        window.location.href = '/influencers';
      } catch (err) {
        console.error('Error deleting influencer:', err);
        alert(`Failed to delete influencer: ${err.message}`);
      }
    }
  }
};
</script>

<style scoped>
.influencer-detail {
  padding-top: 2rem;
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
  color: #4a4a4a;
}

.social-profile-item {
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.social-profile-item:last-child {
  border-bottom: none;
}

.platform-name {
  font-weight: 600;
  margin-left: 8px;
}

.username {
  margin-top: 6px;
  margin-left: 28px;
  font-size: 0.9rem;
}

.username a {
  color: #3273dc;
}

.username a:hover {
  text-decoration: underline;
}

.followers {
  font-size: 0.9rem;
  color: #7a7a7a;
}

.card-footer-item {
  cursor: pointer;
}

.modal-card {
  width: 80%;
  max-width: 800px;
}

@media screen and (max-width: 768px) {
  .modal-card {
    width: 95%;
  }
}
</style>