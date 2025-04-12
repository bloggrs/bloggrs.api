const express = require("express");
const app = (module.exports = express());
const WebSocket = require('ws');
const http = require('http');
const { ErrorHandler } = require("../../utils/error");
const { validateRequest } = require("../../middlewares");
const yup = require("yup");
const { param_id } = require("../utils/validations");
const { getBlogByApiKey } = require("../blogs-api/blogs-dal");
const { findPostsForBlog } = require("../posts-dal");
const { findComments } = require("../postcomments-api/postcomments-dal");
const { findPost } = require("../posts-dal");
const { getBlogCategories } = require("../blogs-api/blogs-dal");
const { getBlogPages } = require("../blogs-api/blogs-dal");
const { getBlogHeaderWidetData } = require("../blogs-api/blogs-dal");
const { findByBlogSlugOr404 } = require("../pages-api/pages-dal");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store active connections
const connections = new Map();

// WebSocket connection handler
wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection');
  
  // Extract API key from URL query parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const apiKey = url.searchParams.get('api_key');
  
  if (!apiKey) {
    ws.close(1008, 'API key is required');
    return;
  }
  
  // Store connection with API key
  if (!connections.has(apiKey)) {
    connections.set(apiKey, new Set());
  }
  connections.get(apiKey).add(ws);
  
  // Handle messages from client
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString()); // Add toString() to handle Buffer
      console.log('Received message:', data); // Add logging
      
      // Handle different message types
      switch (data.type) {
        case 'subscribe':
          await handleSubscribe(ws, apiKey, data);
          break;
        case 'unsubscribe':
          handleUnsubscribe(ws, apiKey, data);
          break;
        case 'request':
          await handleRequest(ws, apiKey, data);
          break;
        case 'getRoutes':
          // Handle getRoutes specifically
          const routes = await getPageRoutes(data.blogId || apiKey);
          ws.send(JSON.stringify({
            type: 'response',
            endpoint: 'routes',
            data: routes
          }));
          break;
        case 'getPage':
          // Handle getPage specifically
          const pageData = await getPageData(data.blogId || apiKey, data.path);
          ws.send(JSON.stringify({
            type: 'response',
            endpoint: 'page',
            data: pageData
          }));
          break;
        case 'init':
          // Handle initial connection setup
          const blog = await getBlogByApiKey(apiKey);
          if (blog) {
            ws.send(JSON.stringify({
              type: 'initialized',
              blogId: blog.id
            }));
          }
          break;
        default:
          console.log('Unknown message type:', data.type); // Add logging
          ws.send(JSON.stringify({ 
            type: 'error', 
            message: `Unknown message type: ${data.type}` 
          }));
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
      ws.send(JSON.stringify({ 
        type: 'error', 
        message: error.message || 'Invalid message format' 
      }));
    }
  });
  
  // Handle connection close
  ws.on('close', () => {
    console.log('Client disconnected');
    if (connections.has(apiKey)) {
      connections.get(apiKey).delete(ws);
      if (connections.get(apiKey).size === 0) {
        connections.delete(apiKey);
      }
    }
  });
  
  // Send initial connection success message
  ws.send(JSON.stringify({ 
    type: 'connected', 
    message: 'Connected to Bloggrs WebSocket API' 
  }));
});

// Handle subscribe message
async function handleSubscribe(ws, apiKey, data) {
  try {
    const { channel } = data;
    
    // Validate channel
    if (!channel) {
      ws.send(JSON.stringify({ 
        type: 'error', 
        message: 'Channel is required' 
      }));
      return;
    }
    
    // Get blog by API key
    const blog = await getBlogByApiKey(apiKey);
    if (!blog) {
      ws.send(JSON.stringify({ 
        type: 'error', 
        message: 'Invalid API key' 
      }));
      return;
    }
    
    // Subscribe to channel
    ws.channels = ws.channels || new Set();
    ws.channels.add(channel);
    
    // Send confirmation
    ws.send(JSON.stringify({ 
      type: 'subscribed', 
      channel 
    }));
    
    // Send initial data based on channel
    await sendChannelData(ws, apiKey, channel, blog.id);
  } catch (error) {
    console.error('Subscribe error:', error);
    ws.send(JSON.stringify({ 
      type: 'error', 
      message: 'Subscription failed' 
    }));
  }
}

// Handle unsubscribe message
function handleUnsubscribe(ws, apiKey, data) {
  const { channel } = data;
  
  if (!channel) {
    ws.send(JSON.stringify({ 
      type: 'error', 
      message: 'Channel is required' 
    }));
    return;
  }
  
  if (ws.channels) {
    ws.channels.delete(channel);
    ws.send(JSON.stringify({ 
      type: 'unsubscribed', 
      channel 
    }));
  }
}

// Handle request message
async function handleRequest(ws, apiKey, data) {
  try {
    const { endpoint, params = {} } = data;
    
    const blog = await getBlogByApiKey(apiKey);
    if (!blog) {
      ws.send(JSON.stringify({ 
        type: 'error', 
        message: 'Invalid API key' 
      }));
      return;
    }
    
    let response;
    switch (endpoint) {
      case 'posts':
        response = await findPostsForBlog(blog.id, null, params);
        break;
      case 'post':
        response = await findPost(params.post_id);
        break;
      case 'comments':
        response = await findComments({ 
          PostId: params.post_id, 
          page: params.page || 1, 
          pageSize: params.pageSize || 10 
        });
        break;
      case 'categories':
        response = await getBlogCategories(blog.id, params);
        break;
      case 'pages':
        response = await getBlogPages(blog.id, params);
        break;
      case 'page':
        response = await findByBlogSlugOr404({ 
          BlogId: blog.id, 
          slug: params.slug 
        });
        break;
      case 'header':
        response = await getBlogHeaderWidetData(blog.id);
        break;
      case 'routes':
        response = await getPageRoutes(blog.id);
        break;
      case 'components':
        response = await getComponentsForBlog(blog.id);
        break;
      case 'page_data':
        response = await getPageData(blog.id, params.path);
        break;
      case 'getRoutes':
        response = await getPageRoutes(blog.id);
        break;
      case 'getPage':
        response = await getPageData(blog.id, params.path);
        break;
      case 'createTestData':
        response = await createTestData(blog.id);
        break;
      default:
        ws.send(JSON.stringify({ 
          type: 'error', 
          message: 'Unknown endpoint' 
        }));
        return;
    }
    
    ws.send(JSON.stringify({ 
      type: 'response', 
      endpoint, 
      data: response 
    }));
  } catch (error) {
    console.error('Request error:', error);
    ws.send(JSON.stringify({ 
      type: 'error', 
      message: error.message || 'Request failed' 
    }));
  }
}

// Send channel data
async function sendChannelData(ws, apiKey, channel, blogId) {
  try {
    let data;
    
    switch (channel) {
      case 'posts':
        data = await findPostsForBlog(blogId, null, { page: 1, pageSize: 10 });
        break;
      case 'categories':
        data = await getBlogCategories(blogId, { page: 1, pageSize: 10 });
        break;
      case 'pages':
        data = await getBlogPages(blogId, { page: 1, pageSize: 10 });
        break;
      case 'header':
        data = await getBlogHeaderWidetData(blogId);
        break;
      case 'routes':
        data = await getPageRoutes(blogId);
        break;
      case 'components':
        data = await getComponentsForBlog(blogId);
        break;
      case 'pageData':
        // This will be handled by specific page requests
        return;
      default:
        return;
    }
    
    ws.send(JSON.stringify({ 
      type: 'channel_data', 
      channel, 
      data 
    }));
  } catch (error) {
    console.error('Send channel data error:', error);
  }
}

// Broadcast to all connections for a specific API key
function broadcast(apiKey, message) {
  if (connections.has(apiKey)) {
    const messageStr = JSON.stringify(message);
    connections.get(apiKey).forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(messageStr);
      }
    });
  }
}

// Broadcast to specific channel for a specific API key
function broadcastToChannel(apiKey, channel, data) {
  broadcast(apiKey, { 
    type: 'channel_update', 
    channel, 
    data 
  });
}

// Add these new functions to handle route and component data
async function getRoutesForBlog(blogId) {
  try {
    // Query vueRoutes table for the blog's routes
    const routes = await prisma.vueRoutes.findMany({
      where: { BlogId: blogId },
      include: {
        component: {
          select: {
            id: true,
            name: true,
            type: true,
            props: true,
            template: true
          }
        }
      }
    });

    return routes.map(route => ({
      path: route.path,
      componentData: {
        type: route.component.type,
        props: JSON.parse(route.component.props || '{}'),
        template: route.component.template
      }
    }));
  } catch (error) {
    console.error('Error fetching routes:', error);
    return [];
  }
}

async function getComponentsForBlog(blogId) {
  try {
    // Query vueComponents table for the blog's components
    const components = await prisma.vueComponents.findMany({
      where: { BlogId: blogId }
    });

    return components.map(component => ({
      id: component.id,
      name: component.name,
      type: component.type,
      props: JSON.parse(component.props || '{}'),
      template: component.template
    }));
  } catch (error) {
    console.error('Error fetching components:', error);
    return [];
  }
}

async function getPageData(blogId, path) {
  try {
    // First check if this is a dynamic route
    const route = await prisma.vueRoutes.findFirst({
      where: { 
        BlogId: blogId,
        path: path
      },
      include: {
        component: true
      }
    });

    if (!route) {
      return null;
    }

    // Get the data based on the component type
    let data;
    switch (route.component.type) {
      case 'blog-post':
        data = await findPost(route.params?.postId);
        break;
      case 'blog-page':
        data = await findByBlogSlugOr404({ BlogId: blogId, slug: path.slice(1) });
        break;
      case 'blog-category':
        data = await getBlogCategories(blogId, { slug: route.params?.categorySlug });
        break;
      default:
        data = {};
    }

    return {
      path,
      pageData: data
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return null;
  }
}

// Add these new functions after your existing handleRequest function
async function getPageRoutes(blogId) {
    console.log(blogId, "BLOGID")
  return await prisma.page.findMany({
    where: { 
      blogId: 1,
      isPublished: true 
    },
    select: {
      id: true,
      path: true,
      title: true,
      componentId: true,
      props: true,
      component: {
        select: {
          id: true,
          name: true,
          content: true,
          props: true
        }
      }
    }
  });
}

async function getPageData(blogId, path) {
  const page = await prisma.page.findFirst({
    where: { 
      blogId: 1,
      path,
      isPublished: true 
    },
    include: {
      component: true
    }
  });
  
  if (!page) {
    throw new Error('Page not found');
  }
  
  return page;
}

async function createTestData(blogId) {
  // Create a test component
  const component = await prisma.pageComponent.create({
    data: {
      name: 'TestComponent',
      content: `
        <div class="test-component">
          <h1>{{title}}</h1>
          <p>{{content}}</p>
          <div class="metadata">
            <span>Author: {{author}}</span>
            <span>Date: {{date}}</span>
          </div>
        </div>
      `,
      props: {
        title: 'string',
        content: 'string',
        author: 'string',
        date: 'string'
      }
    }
  });

  // Create a test page using the component
  const page = await prisma.page.create({
    data: {
      path: '/test',
      title: 'Test Page',
      componentId: component.id,
      props: {
        title: 'Welcome to Test Page',
        content: 'This is a test page created dynamically',
        author: 'System',
        date: new Date().toISOString()
      },
      isPublished: true,
      blogId: 1
    }
  });

  return { component, page };
}

// Export functions for use in other modules
module.exports = function(wss) {
  // Set up connection handler
  wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');
    
    // Extract API key from URL query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    const apiKey = url.searchParams.get('api_key');
    
    if (!apiKey) {
      ws.close(1008, 'API key is required');
      return;
    }
    
    // Store connection with API key
    if (!connections.has(apiKey)) {
      connections.set(apiKey, new Set());
    }
    connections.get(apiKey).add(ws);
    
    // Handle messages from client
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString()); // Add toString() to handle Buffer
        console.log('Received message:', data); // Add logging
        
        // Handle different message types
        switch (data.type) {
          case 'subscribe':
            await handleSubscribe(ws, apiKey, data);
            break;
          case 'unsubscribe':
            handleUnsubscribe(ws, apiKey, data);
            break;
          case 'request':
            await handleRequest(ws, apiKey, data);
            break;
          case 'getRoutes':
            // Handle getRoutes specifically
            const routes = await getPageRoutes(data.blogId || apiKey);
            ws.send(JSON.stringify({
              type: 'response',
              endpoint: 'routes',
              data: routes
            }));
            break;
          case 'getPage':
            // Handle getPage specifically
            const pageData = await getPageData(data.blogId || apiKey, data.path);
            ws.send(JSON.stringify({
              type: 'response',
              endpoint: 'page',
              data: pageData
            }));
            break;
          case 'init':
            // Handle initial connection setup
            const blog = await getBlogByApiKey(apiKey);
            if (blog) {
              ws.send(JSON.stringify({
                type: 'initialized',
                blogId: blog.id
              }));
            }
            break;
          default:
            console.log('Unknown message type:', data.type); // Add logging
            ws.send(JSON.stringify({ 
              type: 'error', 
              message: `Unknown message type: ${data.type}` 
            }));
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        ws.send(JSON.stringify({ 
          type: 'error', 
          message: error.message || 'Invalid message format' 
        }));
      }
    });
    
    // Handle connection close
    ws.on('close', () => {
      console.log('Client disconnected');
      if (connections.has(apiKey)) {
        connections.get(apiKey).delete(ws);
        if (connections.get(apiKey).size === 0) {
          connections.delete(apiKey);
        }
      }
    });
    
    // Send initial connection success message
    ws.send(JSON.stringify({ 
      type: 'connected', 
      message: 'Connected to Bloggrs WebSocket API' 
    }));
  });

  return {
    broadcast,
    broadcastToChannel,
    getRoutesForBlog,
    getComponentsForBlog,
    getPageData,
    connections // Export connections map for debugging
  };
}; 