import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';

// Import components
const PostList = () => import('./views/posts/PostList.vue');
const PostDetail = () => import('./views/posts/PostDetail.vue');
const CategoryPosts = () => import('./views/categories/CategoryPosts.vue');
const AuthorProfile = () => import('./views/authors/AuthorProfile.vue');

// Create routes
const routes = [
  { path: '/', component: Home },
  { path: '/posts', component: PostList },
  { path: '/posts/:slug', component: PostDetail, props: true },
  { path: '/categories/:slug', component: CategoryPosts, props: true },
  { path: '/authors/:id', component: AuthorProfile, props: true }
];

// Create router
const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router; 