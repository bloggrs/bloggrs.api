const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const compiler = require('vue-template-compiler');

// Simple Vue file compiler that works with CommonJS
function compileVueFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const parsed = compiler.parseComponent(fileContent);
  
  // Extract the template
  const template = parsed.template ? parsed.template.content : '';
  
  // Extract and evaluate the script content
  let component = {};
  if (parsed.script) {
    // Create a temporary script content that returns the componentsdefinition
    const scriptContent = parsed.script.content
      .replace('module.exports =', 'return')
      .replace('export default', 'return');
    
    // Use Function constructor to evaluate the script in isolation
    const componentFn = new Function(scriptContent);
    component = componentFn();
  }
  
  // Add the template to the component
  if (template) {
    component.template = template;
  }
  
  // Extract styles if needed
  const styles = parsed.styles.map(style => style.content).join('\n');
  
  return { component, styles };
}

module.exports = { compileVueFile }; 