const { compileVueFile } = require('./vue-compiler');

// Register a custom require extension for .vue files
require.extensions['.vue'] = function(module, filename) {
  try {
    const component = compileVueFile(filename);
    module.exports = component;
  } catch (error) {
    console.error(`Error loading Vue file ${filename}:`, error);
    throw error;
  }
};

// Call this function at the start of your application to enable .vue file requiring
function setupVueRequireHook() {
  console.log('Vue require hook setup complete - .vue files can now be required directly');
}

module.exports = {
  setupVueRequireHook
}; 