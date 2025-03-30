/**
 * Utility for managing plugin resources (styles, scripts, meta tags)
 */

/**
 * Generate HTML for CSS resources
 * @param {Array} styles - Array of style resource objects
 * @returns {String} HTML string with style tags
 */
function generateStylesHTML(styles) {
  if (!styles || !Array.isArray(styles)) return '';
  
  return styles.map(style => {
    if (style.type === 'cdn') {
      let attributes = `rel="stylesheet" href="${style.href}"`;
      if (style.integrity) attributes += ` integrity="${style.integrity}"`;
      if (style.crossorigin) attributes += ` crossorigin="${style.crossorigin}"`;
      
      return `<link ${attributes}>`;
    } else if (style.type === 'inline') {
      return `<style>${style.content}</style>`;
    } else if (style.type === 'file') {
      return `<link rel="stylesheet" href="${style.path}">`;
    }
    return '';
  }).join('\n');
}

/**
 * Generate HTML for JavaScript resources
 * @param {Array} scripts - Array of script resource objects
 * @param {String} position - Position to include scripts ('head' or 'bodyEnd')
 * @returns {String} HTML string with script tags
 */
function generateScriptsHTML(scripts, position = 'head') {
  if (!scripts || !Array.isArray(scripts)) return '';
  
  return scripts
    .filter(script => !script.position || script.position === position)
    .map(script => {
      if (script.type === 'cdn') {
        let attributes = `src="${script.src}"`;
        if (script.defer) attributes += ' defer';
        if (script.async) attributes += ' async';
        if (script.integrity) attributes += ` integrity="${script.integrity}"`;
        if (script.crossorigin) attributes += ` crossorigin="${script.crossorigin}"`;
        
        return `<script ${attributes}></script>`;
      } else if (script.type === 'inline') {
        return `<script>${script.content}</script>`;
      } else if (script.type === 'file') {
        return `<script src="${script.path}"></script>`;
      }
      return '';
    }).join('\n');
}

/**
 * Generate HTML for meta tags
 * @param {Array} metaTags - Array of meta tag objects
 * @returns {String} HTML string with meta tags
 */
function generateMetaHTML(metaTags) {
  if (!metaTags || !Array.isArray(metaTags)) return '';
  
  return metaTags.map(meta => {
    const attributes = Object.entries(meta)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    
    return `<meta ${attributes}>`;
  }).join('\n');
}

/**
 * Process a plugin's resources and generate HTML
 * @param {Object} plugin - Plugin object with resources property
 * @param {String} position - Position to process ('head' or 'bodyEnd')
 * @returns {String} Combined HTML for all resources at the specified position
 */
function processPluginResources(plugin, position = 'head') {
  if (!plugin || !plugin.resources) return '';
  
  const { resources } = plugin;
  let html = '';
  
  // Add meta tags (only in head)
  if (position === 'head' && resources.meta) {
    html += generateMetaHTML(resources.meta);
  }
  
  // Add styles (most styles go in head, but filter by position if specified)
  if (resources.styles) {
    const positionStyles = resources.styles.filter(s => !s.position || s.position === position);
    html += generateStylesHTML(positionStyles);
  }
  
  // Add scripts (position-specific)
  if (resources.scripts) {
    html += generateScriptsHTML(resources.scripts, position);
  }
  
  return html;
}

module.exports = {
  generateStylesHTML,
  generateScriptsHTML,
  generateMetaHTML,
  processPluginResources
}; 