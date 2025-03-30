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

/**
 * Resource Manager for plugin resources
 */
const fs = require('fs');
const path = require('path');

/**
 * Generate head tags from plugin resources
 * @param {Object} plugin - Plugin object
 * @returns {string} HTML for head tags
 */
function generateHeadTags(plugin) {
  if (!plugin || !plugin.resources) return '';
  
  let headTags = '';
  
  // Add meta tags
  if (plugin.resources.meta && Array.isArray(plugin.resources.meta)) {
    plugin.resources.meta.forEach(meta => {
      headTags += `<meta name="${meta.name}" content="${meta.content}">\n`;
    });
  }
  
  // Add style tags
  if (plugin.resources.styles && Array.isArray(plugin.resources.styles)) {
    plugin.resources.styles.forEach(style => {
      if (style.position !== 'head') return;
      
      if (style.type === 'cdn') {
        headTags += `<link rel="stylesheet" href="${style.href}">\n`;
      } else if (style.type === 'local') {
        headTags += `<link rel="stylesheet" href="${style.href}">\n`;
      } else if (style.type === 'inline') {
        headTags += `<style>${style.content}</style>\n`;
      }
    });
  }
  
  // Add script tags in head
  if (plugin.resources.scripts && Array.isArray(plugin.resources.scripts)) {
    plugin.resources.scripts.forEach(script => {
      if (script.position !== 'head') return;
      
      if (script.type === 'cdn' || script.type === 'local') {
        headTags += `<script src="${script.src}"></script>\n`;
      } else if (script.type === 'inline') {
        headTags += `<script>${script.content}</script>\n`;
      }
    });
  }
  
  return headTags;
}

/**
 * Generate body end tags from plugin resources
 * @param {Object} plugin - Plugin object
 * @returns {string} HTML for body end tags
 */
function generateBodyEndTags(plugin) {
  if (!plugin || !plugin.resources) return '';
  
  let bodyEndTags = '';
  
  // Add script tags at the end of body
  if (plugin.resources.scripts && Array.isArray(plugin.resources.scripts)) {
    plugin.resources.scripts.forEach(script => {
      if (script.position !== 'bodyEnd') return;
      
      if (script.type === 'cdn' || script.type === 'local') {
        bodyEndTags += `<script src="${script.src}"></script>\n`;
      } else if (script.type === 'inline') {
        bodyEndTags += `<script>${script.content}</script>\n`;
      }
    });
  }
  
  return bodyEndTags;
}

/**
 * Process resources for the plugin and generate HTML
 * @param {Object} plugin - Plugin object
 * @returns {Object} Object with head and bodyEnd HTML
 */
function processResources(plugin) {
  return {
    head: generateHeadTags(plugin),
    bodyEnd: generateBodyEndTags(plugin)
  };
}

module.exports = {
  generateStylesHTML,
  generateScriptsHTML,
  generateMetaHTML,
  processPluginResources,
  processResources,
  generateHeadTags,
  generateBodyEndTags
}; 