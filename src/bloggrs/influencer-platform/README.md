# Influencer Platform Plugin

A plugin for the Bloggrs platform that adds influencer marketing capabilities.

## Features

- Influencer discovery and management
- Brand campaign management
- Sponsorship tracking
- Rich data model with social profiles and statistics
- Modern UI built with Bulma CSS
- Server-side rendering with Vue.js
- RESTful API for all influencer data

## Installation

This plugin is automatically installed as part of the Bloggrs platform. No additional installation steps are required.

## Configuration

The plugin uses its own PostgreSQL database to store influencer data. The database connection is managed automatically by the plugin system.

### Environment Variables

- `INFLUENCER_PLATFORM_DATABASE_URL`: PostgreSQL connection string for the plugin database. This will be automatically configured during plugin initialization.

## API Routes

The plugin registers the following API routes:

### Influencers

- `GET /api/plugins/influencer-platform/influencers`: Get all influencers
- `GET /api/plugins/influencer-platform/influencers/:id`: Get influencer by ID
- `GET /api/plugins/influencer-platform/influencers/handle/:handle`: Get influencer by handle
- `POST /api/plugins/influencer-platform/influencers`: Create a new influencer
- `PUT /api/plugins/influencer-platform/influencers/:id`: Update an influencer
- `DELETE /api/plugins/influencer-platform/influencers/:id`: Delete an influencer
- `GET /api/plugins/influencer-platform/influencers/search`: Search influencers

### Brands

- `GET /api/plugins/influencer-platform/brands`: Get all brands
- `GET /api/plugins/influencer-platform/brands/:id`: Get brand by ID
- `POST /api/plugins/influencer-platform/brands`: Create a new brand
- `PUT /api/plugins/influencer-platform/brands/:id`: Update a brand
- `DELETE /api/plugins/influencer-platform/brands/:id`: Delete a brand