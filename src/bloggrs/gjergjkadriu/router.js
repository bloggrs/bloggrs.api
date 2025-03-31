import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

// Import your components
// Note: In a real implementation, we'd use dynamic imports for code splitting
const InfluencerList = () => import('./views/influencers/InfluencerList.vue');
const InfluencerDetail = () => import('./views/influencers/InfluencerDetail.vue');
const BrandList = () => import('./views/brands/BrandList.vue');
const BrandDetail = () => import('./views/brands/BrandDetail.vue');
const CampaignList = () => import('./views/campaigns/CampaignList.vue');
const CampaignDetail = () => import('./views/campaigns/CampaignDetail.vue');
const SponsorshipList = () => import('./views/sponsorships/SponsorshipList.vue');
const Dashboard = () => import('./views/analytics/Dashboard.vue');
const Settings = () => import('./views/settings/Settings.vue');

// Create routes
const routes = [
  { path: '/', component: App },
  { path: '/influencers', component: InfluencerList },
  { path: '/influencers/:id', component: InfluencerDetail, props: true },
  { path: '/brands', component: BrandList },
  { path: '/brands/:id', component: BrandDetail, props: true },
  { path: '/campaigns', component: CampaignList },
  { path: '/campaigns/:id', component: CampaignDetail, props: true },
  { path: '/sponsorships', component: SponsorshipList },
  { path: '/analytics', component: Dashboard },
  { path: '/settings', component: Settings }
];

// Create router
const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router; 