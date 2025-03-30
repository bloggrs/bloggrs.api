const fs = require('fs');
const path = require('path');

/**
 * Compile a Vue single-file component
 * @param {string} filePath - Path to the Vue file
 * @returns {Object|null} - Compiled component or null if error
 */
function compileVueFile(filePath) {
  try {
    console.log(`Compiling Vue file: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }
    
    const source = fs.readFileSync(filePath, 'utf8');
    console.log(`File content length: ${source.length} characters`);
    
    // Extract template, script and style
    const templateMatch = source.match(/<template>([\s\S]*?)<\/template>/i);
    const scriptMatch = source.match(/<script>([\s\S]*?)<\/script>/i);
    
    if (!templateMatch) {
      console.error(`No template found in ${filePath}`);
    }
    
    if (!scriptMatch) {
      console.error(`No script found in ${filePath}`);
    }
    
    // Basic component structure even if parsing fails
    const component = {
      template: templateMatch ? templateMatch[1].trim() : '<div>Template missing</div>',
      data: function() { return {}; },
      methods: {},
      computed: {}
    };
    
    // Try to extract more component data if script is available
    if (scriptMatch) {
      try {
        // Simple extraction - this is not a full JS parser but works for basic components
        // Extract the export default ... part
        const exportMatch = script.match(/export\s+default\s*(\{[\s\S]*\})/);
        
        if (exportMatch) {
          let exportScript = exportMatch[1];
          
          // Convert the script to be evaluable
          exportScript = exportScript
            .replace(/data\(\)\s*\{/g, 'data: function() {')
            .replace(/methods\s*:/g, 'methods:')
            .replace(/computed\s*:/g, 'computed:');
          
          // Use indirect eval to evaluate in global scope
          const componentObj = (0, eval)(`(${exportScript})`);
          
          // Merge into component
          component = {
            ...component,
            ...componentObj,
            template // Keep template from the file
          };
          
          console.log(`[Vue Compiler] Compiled component: ${Object.keys(component).join(', ')}`);
        } else {
          console.warn(`[Vue Compiler] Could not extract export default from ${filePath}`);
        }
      } catch (error) {
        console.error(`[Vue Compiler] Error parsing script in ${filePath}:`, error);
        // Still return the template, even if the script fails
      }
    }
    
    console.log(`Compiled component keys: ${Object.keys(component).join(', ')}`);
    return component;
  } catch (error) {
    console.error(`Error compiling Vue file ${filePath}:`, error);
    // Return a minimal component that won't cause errors
    return {
      template: '<div>Error loading component</div>',
      data: function() { return {}; },
      methods: {},
      computed: {}
    };
  }
}

module.exports = {
  compileVueFile
};