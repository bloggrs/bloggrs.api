const fs = require('fs');
const path = require('path');
const compiler = require('@vue/compiler-sfc');
const Vue = require('vue');

// Compile a Vue SFC file for server-side rendering
function compileVueFile(filePath) {
  try {
    // Read the file
    const source = fs.readFileSync(filePath, 'utf-8');
    
    // Parse the SFC
    const { descriptor } = compiler.parse(source, { filename: filePath });
    
    // Extract the template content
    const template = descriptor.template ? descriptor.template.content : '';
    
    // Extract script content
    let scriptContent = '';
    let component = null;
    
    if (descriptor.script) {
      scriptContent = descriptor.script.content.trim();
      
      // First, try a direct require approach for native modules
      const moduleDir = path.dirname(filePath);
      const tempFilePath = path.join(
        moduleDir, 
        `__temp_${path.basename(filePath, '.vue')}.js`
      );
      
      // Create a temporary JS file with the script content
      const jsContent = scriptContent
        .replace(/export\s+default/, 'module.exports =')
        .replace(/import\s+([^{]*?)\s+from\s+(['"])(.*?)['"]/g, 
                'const $1 = require($2$3$2)');
      
      fs.writeFileSync(tempFilePath, jsContent);
      
      try {
        // Require the temporary file
        delete require.cache[require.resolve(tempFilePath)]; // Clear cache
        component = require(tempFilePath);
        fs.unlinkSync(tempFilePath); // Clean up
      } catch (err) {
        console.error('Error requiring component:', err);
        // Clean up temp file
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
        
        // Fallback to the old method
        const tempModule = { exports: {} };
        const fnBody = scriptContent
          .replace('export default', 'tempModule.exports =')
          .replace('module.exports =', 'tempModule.exports =');
        
        try {
          const fn = new Function('tempModule', 'require', fnBody);
          fn(tempModule, require);
          component = tempModule.exports;
        } catch (error) {
          console.error('Error evaluating script in Vue component:', error);
          component = {};
        }
      }
    }
    
    // Add the template to the component
    if (template && component) {
      component.template = template;
    }
    
    // Extract styles
    const styles = descriptor.styles.map(style => style.content).join('\n');
    
    return {
      component,
      styles
    };
  } catch (error) {
    console.error(`Error compiling Vue file ${filePath}:`, error);
    return { component: {}, styles: '' };
  }
}

module.exports = { compileVueFile };