const { createSSRApp } = require('vue');
const { renderToString } = require('vue/server-renderer');
const fs = require('fs');
const path = require('path');
const compiler = require('@vue/compiler-sfc');

// Improved Vue file compiler that handles potential syntax issues
function compileVueFile(filePath) {
  // Read the Vue component file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Parse using Vue 3 compiler
  const { descriptor } = compiler.parse(fileContent);
  
  // Extract the template
  const template = descriptor.template ? descriptor.template.content : '';
  
  // Extract and evaluate the script content
  let component = {};
  if (descriptor.script) {
    // Get raw script content
    const scriptContent = descriptor.script.content;
    
    // Instead of using Function constructor which is failing,
    // we'll use a simpler approach to extract the component object
    if (scriptContent.includes('export default')) {
      // For ES module syntax
      const startIndex = scriptContent.indexOf('export default') + 'export default'.length;
      let componentCode = scriptContent.slice(startIndex).trim();
      
      // If it starts with defineComponent, remove that wrapper
      if (componentCode.startsWith('defineComponent(')) {
        componentCode = componentCode.slice('defineComponent('.length, -1);
      }
      
      // Remove trailing semicolon if present
      if (componentCode.endsWith(';')) {
        componentCode = componentCode.slice(0, -1);
      }
      
      // Evaluate the component definition
      try {
        component = eval(`(${componentCode})`);
      } catch (e) {
        console.error('Failed to evaluate component:', e);
        component = { data: () => ({}) }; // Fallback
      }
    } else if (scriptContent.includes('module.exports =')) {
      // For CommonJS syntax
      const startIndex = scriptContent.indexOf('module.exports =') + 'module.exports ='.length;
      let componentCode = scriptContent.slice(startIndex).trim();
      
      // Remove trailing semicolon if present
      if (componentCode.endsWith(';')) {
        componentCode = componentCode.slice(0, -1);
      }
      
      // Evaluate the component definition
      try {
        component = eval(`(${componentCode})`);
      } catch (e) {
        console.error('Failed to evaluate component:', e);
        component = { data: () => ({}) }; // Fallback
      }
    }
  }
  
  // Add the template to the component
  if (template) {
    component.template = template;
  }
  
  // Extract styles
  const styles = descriptor.styles ? descriptor.styles.map(style => style.content).join('\n') : '';
  
  return { component, styles };
}

async function render() {
  try {
    // Compile App.vue
    const appPath = path.resolve(__dirname, './components/App.vue');
    console.log('Loading Vue component from:', appPath);
    
    const { component: App, styles: appStyles } = compileVueFile(appPath);
    console.log('Component loaded successfully');
    
    // Create Vue instance
    const app = createSSRApp(App);
    
    // Render to string
    const appHtml = await renderToString(app);
    
    return {
      appHtml,
      cssHtml: appStyles
    };
  } catch (error) {
    console.error('Error in render function:', error);
    return {
      appHtml: `<div>Error rendering application: ${error.message}</div>`,
      cssHtml: ''
    };
  }
}

module.exports = { render }; 