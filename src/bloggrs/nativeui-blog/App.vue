<template>
  <div class="main-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-nav">
        <a href="/" class="nav-link">Home</a>
        <a href="/about" class="nav-link">About me</a>
      </div>
      <div class="site-branding">
        <h1 class="site-title">Rinor Maloku</h1>
        <p class="site-tagline">Master one tool at a time...</p>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Left Column - Main Content -->
      <div class="content-area">
        <!-- Profile Section -->
        <div class="profile-section">
          <div class="profile-label">Profile</div>
          <div class="profile-content">
            <img src="https://placeholder.co/60x60" class="profile-image" alt="Profile" />
            
            <!-- Skills Cards -->
            <div class="skills-cards">
              <div class="skill-card" v-for="(skill, index) in skills" :key="index">
                <div class="diagonal-content">
                  <div class="diagonal-item green">GOAL</div>
                  <div class="diagonal-item red">FEAR</div>
                </div>
                <div class="skill-label">{{ skill.label }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Featured Post -->
        <div class="featured-post">
          <div class="date-label">{{ featuredPost.date }}</div>
          <h2 class="post-title">{{ featuredPost.title }}</h2>
          <div class="post-content">{{ featuredPost.excerpt }}</div>
        </div>
        
        <!-- Diagram Post -->
        <div class="diagram-post">
          <div class="diagram-container">
            <div class="diagram">
              <!-- Diagram elements -->
              <div class="diagram-row">
                <div class="diagram-box">SA FRONTEND</div>
                <div class="diagram-box">SA FRONTEND</div>
                <div class="diagram-box">SA WEBAPP</div>
              </div>
              <div class="diagram-row">
                <div class="diagram-box center">ENVOY</div>
              </div>
              <div class="diagram-row">
                <div class="diagram-box">BROWSER</div>
              </div>
            </div>
          </div>
          
          <div class="post-details">
            <div class="date-label">February 11, 2019</div>
            <h2 class="post-title">Routing with the Envoy proxy in under 10 minutes</h2>
            <div class="post-content">
              Learn the elements of the Envoy Proxy by getting a microservice application up and running 
              and configuring the routes to every service, in less than 10 minutes.
            </div>
          </div>
        </div>
        
        <!-- Main Grid of Posts -->
        <div class="posts-grid">
          <!-- First row - 2 cards -->
          <div class="post-row first-row">
            <div v-for="post in posts.slice(0, 2)" :key="post.id" class="post-card">
              <div class="date-label">{{ post.date }}</div>
              <h3 class="post-title">{{ post.title }}</h3>
              <div class="post-content">
                <span>This entry is part {{ 10 + post.id - 1 }} of 12 in the series </span>
                <a href="#" class="series-link">Istio around everything else</a>
              </div>
              <div class="post-excerpt">{{ post.excerpt }}</div>
            </div>
          </div>
          
          <!-- Second row - 4 cards -->
          <div class="post-row">
            <div v-for="post in posts.slice(2)" :key="post.id" class="post-card">
              <div class="date-label">{{ post.date }}</div>
              <h3 class="post-title">{{ post.title }}</h3>
              <div class="post-content" v-if="post.id !== 4">
                <span>This entry is part {{ 12 - (post.id - 2) }} of 12 in the series </span>
                <a href="#" class="series-link">Istio around everything else</a>
              </div>
              <div class="post-excerpt">{{ post.excerpt }}</div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="pagination">
          <a href="#" class="page-link prev">Prev</a>
          <div class="page-numbers">
            <a href="#" class="page-number active">1</a>
            <a href="#" class="page-number">2</a>
            <a href="#" class="page-number">3</a>
          </div>
          <a href="#" class="page-link next">Next</a>
        </div>
      </div>
      
      <!-- Right Column - Sidebar -->
      <div class="sidebar">
        <div class="search-section">
          <div class="search-label">Search</div>
          <form class="search-form">
            <input type="text" class="search-input" placeholder="Search...">
          </form>
        </div>
        
        <div class="categories-section">
          <div class="category-item" v-for="category in categories" :key="category.id">
            <a href="#" class="category-link">
              {{ category.name }} 
              <span v-if="category.count" class="count">{{ category.count }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      skills: [
        { label: 'web & hp prog language' },
        { label: 'JavaScript framework' },
        { label: 'cloud engineering' }
      ],
      featuredPost: {
        id: 4,
        title: 'Parallel-Flowing and the shrinking Flow zone',
        date: 'July 5, 2020',
        excerpt: "Let's explore how being in the \"Zone\" or being in \"Flow\" isn't static and changes throughout your career. Prerequisite to getting into Flow Short feedback loops sets Software Engineering apart from every other profession."
      },
      posts: [
        {
          id: 1,
          title: 'Authentication in Istio',
          date: 'January 21, 2019',
          excerpt: "I would have never believed that I would be excited about Authentication and Authorization. What on the technological spectrum could Istio possibly do to make me excited about these dreadful topics, and more importantly why should it excite you as well?"
        },
        {
          id: 2,
          title: 'Authorization in Istio',
          date: 'January 21, 2019',
          excerpt: "Authorization with Auth0 Authentication enables us to know who a user is, but we need the authorization to know what they can access. Istio provides the tools for this as well!"
        },
        {
          id: 3,
          title: 'Istio series Summary',
          date: 'January 8, 2019',
          excerpt: "Tap yourself on the back, you are amazing for sticking with this it definitely wasn't easy, there were bumps along the way and it wasn't as smooth as I presented."
        },
        {
          id: 4,
          title: 'Timeouts, Retries and CircuitBreakers with Istio',
          date: 'January 7, 2019',
          excerpt: "It's not always that the code is buggy. In the list of \"The 8 fallacies of distributed computing\" the first fallacy is that \"The network is reliable\"."
        }
      ],
      categories: [
        { id: 'all', name: 'All Stories', count: 30 },
        { id: 'azure', name: 'Azure', count: 4 },
        { id: 'envoy', name: 'Envoy', count: 1 },
        { id: 'istio', name: 'Istio', count: 12 },
        { id: 'kubernetes', name: 'Kubernetes', count: 19 },
        { id: 'thoughts', name: 'Thoughts', count: 1 }
      ]
    };
  }
};
</script>

<style>
:root {
  --light-gray: #f2f2f2;
  --text-color: #333;
  --light-text-color: #666;
  --link-color: #0066cc;
  --border-color: #eee;
  --green-color: #4caf50;
  --red-color: #f44336;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
  color: var(--text-color);
  line-height: 1.6;
  background: #fff;
  margin: 0;
  padding: 0;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header */
.header-section {
  display: flex;
  justify-content: space-between;
  padding: 0 0 20px 0;
  margin-bottom: 30px;
}

.header-nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.9rem;
}

.nav-link:hover {
  text-decoration: underline;
}

.site-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.site-tagline {
  font-size: 0.9rem;
  margin: 0;
  color: var(--light-text-color);
}

/* Main layout */
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 40px;
}

/* Content area */
.content-area {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

/* Profile section */
.profile-section {
  margin-bottom: 20px;
}

.profile-label {
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.profile-content {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.skills-cards {
  display: flex;
  gap: 15px;
}

.skill-card {
  width: 60px;
  height: 60px;
  position: relative;
  border: 1px solid #ddd;
  overflow: hidden;
}

.diagonal-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.diagonal-item {
  position: absolute;
  width: 140%;
  text-align: center;
  font-size: 0.7rem;
  color: white;
  padding: 2px 0;
  transform: rotate(-45deg);
  transform-origin: center;
}

.diagonal-item.green {
  background-color: var(--green-color);
  top: 15px;
  left: -20px;
}

.diagonal-item.red {
  background-color: var(--red-color);
  bottom: 15px;
  left: -20px;
}

.skill-label {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 0.6rem;
  background: #f8f8f8;
  padding: 2px 0;
}

/* Featured post */
.featured-post {
  margin-bottom: 30px;
}

.date-label {
  font-size: 0.8rem;
  color: var(--light-text-color);
  margin-bottom: 5px;
}

.post-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 15px 0;
  line-height: 1.4;
  color: var(--text-color);
}

.post-content p, .post-excerpt {
  margin: 0 0 10px 0;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Diagram post */
.diagram-post {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.diagram {
  border: 1px solid #ddd;
  padding: 20px;
  background: #fff;
}

.diagram-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.diagram-box {
  border: 1px solid #000;
  padding: 6px 12px;
  font-size: 0.8rem;
  text-align: center;
  min-width: 80px;
}

.diagram-box.center {
  margin: 0 auto;
}

.post-details {
  padding-top: 10px;
}

/* Post grid */
.posts-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.post-row {
  display: grid;
  gap: 20px;
}

.post-row.first-row {
  grid-template-columns: repeat(2, 1fr);
}

.post-row:not(.first-row) {
  grid-template-columns: repeat(4, 1fr);
}

.post-card {
  background-color: var(--light-gray);
  padding: 15px;
  height: 100%;
  border: none;
}

.post-card h3.post-title {
  font-size: 1rem;
  margin: 5px 0 10px 0;
}

.series-link {
  color: var(--link-color);
  text-decoration: none;
}

.series-link:hover {
  text-decoration: underline;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 15px;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.page-number, .page-link {
  padding: 5px 10px;
  text-decoration: none;
  color: var(--text-color);
  border: 1px solid #ddd;
}

.page-number.active {
  background-color: var(--link-color);
  color: white;
  border-color: var(--link-color);
}

/* Sidebar */
.sidebar {
  margin-top: 40px;
}

.search-section {
  margin-bottom: 30px;
}

.search-label {
  font-weight: 600;
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 0;
}

.categories-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.9rem;
}

.category-link:hover {
  color: var(--link-color);
}

.count {
  font-size: 0.8rem;
  color: var(--light-text-color);
  margin-left: 5px;
}

/* Responsive adjustments */
@media (max-width: 1100px) {
  .post-row:not(.first-row) {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  
  .diagram-post {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    margin-top: 0;
  }
}

@media (max-width: 600px) {
  .post-row.first-row {
    grid-template-columns: 1fr;
  }
  
  .post-row:not(.first-row) {
    grid-template-columns: 1fr;
  }
  
  .skills-cards {
    flex-wrap: wrap;
  }
  
  .profile-content {
    flex-direction: column;
  }
}
</style> 