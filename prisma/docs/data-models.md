---
layout: default
title: Data Models
nav_order: 2
---

# Data Models

This section documents the core data models used in the Bloggrs API.

## Core Models

### Users
- Handles user authentication and profiles
- Manages user roles and permissions
- Stores user preferences and settings

### Posts
- Blog post content and metadata
- Post categories and tags
- Post status and visibility

### Comments
- User comments on posts
- Comment threading and replies
- Comment moderation

### Media
- Image and file uploads
- Media metadata and optimization
- Media storage and CDN integration

## GraphQL Models

### Queries
- Data fetching operations
- Filtering and pagination
- Field selection

### Mutations
- Data modification operations
- Input validation
- Error handling

### Subscriptions
- Real-time updates
- WebSocket connections
- Event handling

## Database Schema

The database schema is managed using Prisma and includes:

- Automatic migrations
- Type safety
- Query optimization
- Index management

For detailed schema information, see the [Prisma Schema Reference](/schema-reference). 