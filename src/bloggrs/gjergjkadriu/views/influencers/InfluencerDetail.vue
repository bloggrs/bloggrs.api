<template>
  <div class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/influencers">Influencers</a></li>
          <li class="is-active"><a href="#" aria-current="page">{{ influencer.name }}</a></li>
        </ul>
      </nav>
      
      <div v-if="!influencer.id" class="notification is-danger">
        <p>Influencer not found. The requested influencer may have been removed or does not exist.</p>
        <a href="/influencers" class="button is-light mt-3">Back to Influencers</a>
      </div>
      
      <div v-else class="columns">
        <div class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="influencer.image || `https://via.placeholder.com/400x300?text=${influencer.name}`" :alt="influencer.name">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ influencer.name }}</p>
                  <p class="subtitle is-6">@{{ influencer.handle }}</p>
                </div>
              </div>
              
              <div class="content">
                <div class="tags mb-3">
                  <span class="tag is-primary">{{ influencer.category || 'Uncategorized' }}</span>
                  <span v-if="influencer.verified" class="tag is-success">Verified</span>
                  <span class="tag is-info">{{ formatNumber(influencer.followers) }} followers</span>
                </div>
                
                <p>{{ influencer.bio || 'No bio available.' }}</p>
                
                <div class="buttons mt-4">
                  <button class="button is-info">
                    <span class="icon"><i class="fas fa-edit"></i></span>
                    <span>Edit</span>
                  </button>
                  <button class="button is-danger is-light">
                    <span class="icon"><i class="fas fa-trash"></i></span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="box mt-5">
            <h3 class="title is-5">Social Profiles</h3>
            <div v-if="influencer.socialProfiles && influencer.socialProfiles.length">
              <div v-for="profile in influencer.socialProfiles" :key="profile.id" class="media mb-3">
                <div class="media-left">
                  <span class="icon is-medium">
                    <i :class="getSocialIcon(profile.platform)"></i>
                  </span>
                </div>
                <div class="media-content">
                  <p class="is-6">
                    <strong>{{ profile.platform }}:</strong> 
                    <a :href="profile.url" target="_blank">@{{ profile.handle }}</a>
                  </p>
                  <p class="is-7">{{ formatNumber(profile.followers) }} followers</p>
                </div>
              </div>
            </div>
            <div v-else class="notification is-light">
              No social profiles added yet.
            </div>
            <button class="button is-small is-primary is-light mt-3">
              <span class="icon is-small"><i class="fas fa-plus"></i></span>
              <span>Add Social Profile</span>
            </button>
          </div>
        </div>
        
        <div class="column is-8">
          <div class="box">
            <h3 class="title is-4">Engagement Stats</h3>
            <div class="columns">
              <div class="column">
                <div class="notification is-primary is-light">
                  <p class="heading">Engagement Rate</p>
                  <p class="title">{{ influencer.engagementRate || 0 }}%</p>
                </div>
              </div>
              <div class="column">
                <div class="notification is-link is-light">
                  <p class="heading">Posts</p>
                  <p class="title">{{ influencer.posts || 0 }}</p>
                </div>
              </div>
              <div class="column">
                <div class="notification is-info is-light">
                  <p class="heading">Avg. Likes</p>
                  <p class="title">{{ formatNumber(calculateAvgLikes()) }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="box mt-5">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <h3 class="title is-4">Campaign History</h3>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <button class="button is-primary is-small">
                    <span class="icon is-small"><i class="fas fa-plus"></i></span>
                    <span>Add to Campaign</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="notification is-light">
              <p>No campaign history available.</p>
            </div>
          </div>
          
          <div class="box mt-5">
            <h3 class="title is-4">Contact Information</h3>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" :value="influencer.email || ''" placeholder="No email available" readonly>
              </div>
            </div>
            <div class="field">
              <label class="label">Phone</label>
              <div class="control">
                <input class="input" type="tel" :value="influencer.phone || ''" placeholder="No phone available" readonly>
              </div>
            </div>
            <div class="field">
              <label class="label">Location</label>
              <div class="control">
                <input class="input" type="text" :value="influencer.location || ''" placeholder="No location available" readonly>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClient: false
    };
  },
  
  methods: {
    formatNumber(num) {
      if (!num) return '0';
      
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      
      return num.toString();
    },
    
    getSocialIcon(platform) {
      const icons = {
        'Instagram': 'fab fa-instagram',
        'TikTok': 'fab fa-tiktok',
        'YouTube': 'fab fa-youtube',
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
    
    calculateAvgLikes() {
      if (!this.influencer.engagementRate || !this.influencer.followers) {
        return 0;
      }
      
      return Math.round(this.influencer.followers * (this.influencer.engagementRate / 100));
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
  },
  
  mounted() {
    console.log('InfluencerDetail component mounted on client');
    this.isClient = true;
    
    // Log the influencer data provided by the server
    console.log('Influencer data from server:', this.influencer);
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