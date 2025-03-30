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
        <div class="site-tagline">Master one tool at a time...</div>
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
            <div class="profile-image-container">
              <img src="https://placeholder.co/60x60" class="profile-image" alt="Profile" />
            </div>
            
            <!-- Skills Cards -->
            <div class="skills-cards">
              <div class="skill-card">
                <div class="diagonal-content">
                  <div class="diagonal-item green">GOAL</div>
                  <div class="diagonal-item red">FEAR</div>
                </div>
                <div class="skill-label">web & hp prog language</div>
              </div>
              
              <div class="skill-card">
                <div class="diagonal-content">
                  <div class="diagonal-item green">GOAL</div>
                  <div class="diagonal-item red">FEAR</div>
                </div>
                <div class="skill-label">JavaScript framework</div>
              </div>
              
              <div class="skill-card">
                <div class="diagonal-content">
                  <div class="diagonal-item green">GOAL</div>
                  <div class="diagonal-item red">FEAR</div>
                </div>
                <div class="skill-label">cloud engineering</div>
              </div>
            </div>
          </div>
          <div class="profile-description">
            These cards represent my skill journey - what I aim to master and what challenges I face.
          </div>
        </div>
        
        <!-- Posts Section -->
        <div class="posts-container">
          <!-- Posts Grid - Blog posts in rectangular boxes -->
          <div class="posts-grid">
            <div class="post-box" v-for="(post, index) in posts" :key="index">
              <div class="post-date">{{ post.date }}</div>
              <h2 class="post-title">{{ post.title }}</h2>
              <div class="post-series" v-if="post.series">
                This entry is part {{ post.seriesPart }} of 12 in the series <span class="series-name">{{ post.series }}</span>
              </div>
              <p class="post-excerpt">{{ post.excerpt }}</p>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="pagination">
          <a href="#" class="page-link prev">Prev</a>
          <span class="page-numbers">
            <a href="#" class="page-number active">1</a>
            <a href="#" class="page-number">2</a>
            <a href="#" class="page-number">3</a>
          </span>
          <a href="#" class="page-link next">Next</a>
        </div>
      </div>
      
      <!-- Right Column - Sidebar -->
      <div class="sidebar">
        <div class="search-section">
          <div class="search-label">Search</div>
          <form class="search-form">
            <input type="text" class="search-input" placeholder="Search...">
            <button type="submit" class="search-button">Search</button>
          </form>
        </div>
        
        <div class="categories-section">
          <div class="category-item">
            <a href="#" class="category-link active">All Stories <span class="count">(30)</span></a>
          </div>
          <div class="category-item">
            <a href="#" class="category-link">Azure <span class="count">(4)</span></a>
          </div>
          <div class="category-item">
            <a href="#" class="category-link">Envoy <span class="count">(1)</span></a>
          </div>
          <div class="category-item">
            <a href="#" class="category-link">Istio <span class="count">(12)</span></a>
          </div>
          <div class="category-item">
            <a href="#" class="category-link">Kubernetes <span class="count">(19)</span></a>
          </div>
          <div class="category-item">
            <a href="#" class="category-link">Thoughts <span class="count">(1)</span></a>
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
      posts: [
        {
          date: "January 8, 2019",
          title: "Istio series Summary",
          seriesPart: 12,
          series: "Istio around everything else",
          excerpt: "Tap yourself on the back, you are amazing for sticking with this it definitely wasn't easy, there were bumps along the way and it wasn't as smooth as I presented. But now you mastered this amazing technology! Istio? Let's call it Beast-io!! Because it's such a BEAST! It provided us with: Observability over our services"
        },
        {
          date: "January 7, 2019",
          title: "Timeouts, Retries and CircuitBreakers with Istio",
          seriesPart: 9,
          series: "Istio around everything else",
          excerpt: "It's not always that the code is buggy. In the list of \"The 8 fallacies of distributed computing\" the first fallacy is that \"The network is reliable\". The network is definitely NOT reliable, and that is why we need Timeouts and Retries."
        },
        {
          date: "January 7, 2019",
          title: "Canary Deployments with Istio",
          seriesPart: 8,
          series: "Istio around everything else",
          excerpt: "Canary Deployment is the process of rolling out a new version of an application to a small set of users, as a step to verify the absence of issues, and then with a higher assurance of quality release to the wider audience."
        },
        {
          date: "January 7, 2019",
          title: "Shadowing – VirtualServices in Practice",
          seriesPart: 7,
          series: "Istio around everything else",
          excerpt: "Shadowing or Mirroring is used when we want to test a change in production but not affect end-users, so we mirror the requests into a second instance that has the change and evaluate it."
        },
        {
          date: "January 7, 2019",
          title: "A/B Testing – DestinationRules in Practice",
          seriesPart: 6,
          series: "Istio around everything else",
          excerpt: "Traffic Management Using the Envoy's Istio provides a host of new capabilities to your cluster enabling: Dynamic request routing: Canary deployments, A/B testing, Load balancing."
        },
        {
          date: "January 5, 2019",
          title: "Istio out of the box: Kiali, Grafana & Jaeger",
          seriesPart: 5,
          series: "Istio around everything else",
          excerpt: "Istio features out of the box By intercepting all network communication Istio is fed with metrics and data that can be used to gain observability of the whole application."
        },
        {
          date: "January 5, 2019",
          title: "Istio in Practice – Routing with VirtualService",
          seriesPart: 4,
          series: "Istio around everything else",
          excerpt: "The VirtualService resource The VirtualService instructs the Ingress Gateway how to route the requests that were allowed into the cluster."
        },
        {
          date: "January 5, 2019",
          title: "Istio in Practice – Ingress Gateway",
          seriesPart: 3,
          series: "Istio around everything else",
          excerpt: "Intro to Ingress Gateway A best practice for allowing traffic into your cluster is through Istio's Ingress Gateway which positions itself at the edge of the cluster."
        }
      ]
    }
  }
}
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
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --card-bg: #fff;
  --card-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
  color: var(--text-color);
  line-height: 1.6;
  background: #f9f9f9;
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
  border-bottom: 1px solid var(--border-color);
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
  color: var(--light-text-color);
}

/* Main layout */
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 40px;
}

/* Content area */
.content-area {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* Profile section */
.profile-section {
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  padding: 20px;
  margin-bottom: 20px;
}

.profile-label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 8px;
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
  flex-wrap: wrap;
}

.skill-card {
  width: 80px;
  height: 80px;
  position: relative;
  border: 1px solid #ddd;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  font-size: 0.65rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 0;
}

.profile-description {
  font-size: 0.85rem;
  color: var(--light-text-color);
  margin-top: 15px;
  border-top: 1px solid var(--border-color);
  padding-top: 10px;
}

/* Posts Grid */
.posts-container {
  margin-bottom: 30px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin: 10px 0 20px;
}

.post-box {
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  padding: 24px;
  margin-bottom: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-box:hover {
  transform: translateY(-3px);
  box-shadow: var(--card-hover-shadow);
}

.post-date {
  font-size: 0.8rem;
  color: var(--light-text-color);
  margin-bottom: 12px;
}

.post-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  line-height: 1.4;
  color: var(--text-color);
}

.post-series {
  font-size: 0.8rem;
  color: var(--light-text-color);
  margin-bottom: 16px;
  margin-top: 4px;
  background-color: #f5f7fa;
  padding: 8px 12px;
  border-radius: 4px;
  display: inline-block;
}

.series-name {
  font-weight: 600;
  color: var(--link-color);
}

.post-excerpt {
  font-size: 0.9rem;
  color: var(--text-color);
  line-height: 1.6;
  flex-grow: 1;
  margin: 0;
  padding-top: 4px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
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
  border-radius: 4px;
  font-size: 0.9rem;
}

.page-number.active {
  background-color: var(--link-color);
  color: white;
  border-color: var(--link-color);
}

.page-link:hover, .page-number:hover:not(.active) {
  background-color: #f5f5f5;
}

/* Sidebar */
.sidebar {
  margin-top: 30px;
}

.search-section {
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  padding: 20px;
  margin-bottom: 30px;
}

.search-label {
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.search-button {
  padding: 8px 12px;
  background-color: var(--link-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.search-button:hover {
  background-color: #005bb5;
}

.categories-section {
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  padding: 20px;
}

.category-item {
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.category-item:last-child {
  border-bottom: none;
}

.category-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.9rem;
  display: block;
}

.category-link.active {
  color: var(--link-color);
  font-weight: 500;
}

.category-link:hover {
  color: var(--link-color);
}

.count {
  font-size: 0.8rem;
  color: var(--light-text-color);
}

/* Responsive adjustments */
@media (max-width: 1100px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    margin-top: 0;
  }
}

@media (max-width: 600px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .skills-cards {
    flex-wrap: wrap;
  }
  
  .profile-content {
    flex-direction: column;
  }
  
  .header-section {
    flex-direction: column;
    gap: 15px;
  }
}
</style>