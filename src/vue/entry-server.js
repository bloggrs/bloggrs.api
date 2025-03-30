import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './components/App.vue'

export async function render() {
  const app = createSSRApp(App)
  return await renderToString(app)
} 