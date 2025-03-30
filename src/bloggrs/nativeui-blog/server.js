/**
 * Server-side code for the NativeUI blog plugin
 */

function init() {
  console.log('Initializing NativeUI Blog plugin');
  
  // Ensure needed dependencies
  try {
    require('naive-ui');
    console.log('Naive UI dependency is available');
  } catch (error) {
    console.error('Naive UI dependency missing - please install with: npm install naive-ui');
  }
}

// Mock data for the blog
const mockPosts = [
  {
    id: 1,
    title: 'Authentication in Istio',
    date: 'January 21, 2019',
    excerpt: "This entry is part 10 of 12 in the series Istio around everything else. I would have never believed that I would be excited about Authentication and Authorization. What on the technological spectrum could Istio possibly do to make me excited about these dreadful topics, and more importantly why should it excite you as well? Because, Istio takes these responsibilities from our services and offloads them to the Envoy."
  },
  {
    id: 2,
    title: 'Authorization in Istio',
    date: 'January 21, 2019',
    excerpt: "This entry is part 11 of 12 in the series Istio around everything else. Authorization with Auth0 Authentication enables us to know who a user is, but we need the authorization to know what they can access. Istio provides the tools for this as well! As an example, we'll create two groups of users (shown in figure 24): Users: with access to only the SA-WebApp and SA-Frontend service. Moderators."
  },
  {
    id: 3,
    title: 'Istio series Summary',
    date: 'January 8, 2019',
    excerpt: "This entry is part 12 of 12 in the series Istio around everything else. Tap yourself on the back, you are amazing for sticking with this it definitely wasn't easy, there were bumps along the way and it wasn't as smooth as I presented. But now you mastered this amazing technology! Istio? Let's call it Beast-io!! Because it's such a BEAST!"
  },
  {
    id: 4,
    title: 'Parallel-Flowing and the shrinking Flow zone',
    date: 'July 5, 2020',
    excerpt: "Let's explore how being in the \"Zone\" or being in \"Flow\" isn't static and changes throughout your career. Prerequisite to getting into Flow Short feedback loops sets Software Engineering apart from every other profession."
  }
];

const mockCategories = [
  { id: 'azure', name: 'Azure', count: 4 },
  { id: 'envoy', name: 'Envoy', count: 1 },
  { id: 'istio', name: 'Istio', count: 12 },
  { id: 'kubernetes', name: 'Kubernetes', count: 19 },
  { id: 'thoughts', name: 'Thoughts', count: 1 }
];

// Expose mock data
function getMockPosts() {
  return mockPosts;
}

function getMockCategories() {
  return mockCategories;
}

module.exports = {
  init,
  getMockPosts,
  getMockCategories
}; 