// ... existing code ...

// Update the getPlugin method to check for enabled status
exports.getPlugin = async function(name) {
  const plugin = plugins.find(p => p.name === name && p.enabled !== false);
  if (!plugin) return null;
  return plugin;
};

// ... existing code ... 