const express = require("express");
const WebSocket = require('ws');
const Handlebars = require('handlebars');

// Create WebSocket server
const wss = new WebSocket.Server({ port: process.env.WS_PORT || 3001 });

// Store active connections
// Register Handlebars helpers
Handlebars.registerHelper('gt', (a, b) => a > b);
Handlebars.registerHelper('lt', (a, b) => a < b);
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('add', (a, b) => a + b);
Handlebars.registerHelper('subtract', (a, b) => a - b);
Handlebars.registerHelper('range', (start, end) => {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
});
// Initialize services
// WebSocket connection handler
wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const apiKey = url.searchParams.get('api_key');
  wsService.handleConnection(ws, apiKey);
});


// Export functions for use in other modules
module.exports = wss; 