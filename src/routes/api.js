const express = require('express');
const router = express.Router();

// Example API endpoints
router.get('/posts', (req, res) => {
  // Return mock posts data
  const posts = [
    {
      id: 1,
      title: 'Authentication in Istio',
      date: 'January 21, 2019',
      excerpt: 'This entry is part 10 of 12 in the series Istio around everything else'
    },
    {
      id: 2,
      title: 'Authorization in Istio',
      date: 'January 21, 2019',
      excerpt: 'This entry is part 11 of 12 in the series Istio around everything else'
    }
    // More posts...
  ];
  
  res.json(posts);
});

router.get('/categories', (req, res) => {
  // Return mock categories data
  const categories = [
    { id: 'azure', name: 'Azure', count: 4 },
    { id: 'envoy', name: 'Envoy', count: 1 },
    { id: 'istio', name: 'Istio', count: 12 },
    { id: 'kubernetes', name: 'Kubernetes', count: 19 },
    { id: 'thoughts', name: 'Thoughts', count: 1 }
  ];
  
  res.json(categories);
});

// Example of a POST endpoint
router.post('/comments', (req, res) => {
  // Mock comment submission
  console.log('Received comment:', req.body);
  res.status(201).json({
    success: true,
    message: 'Comment received'
  });
});

// Export the router
module.exports = router; 