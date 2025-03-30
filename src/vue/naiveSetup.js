const { NButton, NInput, NInputGroup, NConfigProvider, NAvatar, NSpace, NTag, NDivider } = require('naive-ui');

function setupNaive(app) {
  // Register Naive UI components
  app.component('NButton', NButton);
  app.component('NInput', NInput);
  app.component('NInputGroup', NInputGroup);
  app.component('NConfigProvider', NConfigProvider);
  app.component('NAvatar', NAvatar);
  app.component('NSpace', NSpace);
  app.component('NTag', NTag);
  app.component('NDivider', NDivider);
  
  // Generate CSS style string for SSR
  let naiveStyle = '';
  
  // In a real app, you'd use naive-ui's SSR utils to collect styles
  // But for now, we'll keep it simple
  
  return { naiveStyle };
}

module.exports = { setupNaive }; 