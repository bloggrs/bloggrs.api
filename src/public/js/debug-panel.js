(function() {
  // Create debug panel element
  const debugPanel = document.createElement('div');
  debugPanel.id = 'debug-panel';
  debugPanel.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    max-height: 50vh;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-family: monospace;
    font-size: 12px;
    z-index: 9999;
    padding: 10px;
    border-top-left-radius: 5px;
  `;
  
  // Header with toggle functionality
  const header = document.createElement('div');
  header.innerHTML = '<strong>Debug Panel</strong> <span style="float:right;cursor:pointer;">[x]</span>';
  header.querySelector('span').addEventListener('click', () => {
    const content = debugPanel.querySelector('.debug-content');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
  });
  debugPanel.appendChild(header);
  
  // Content container
  const content = document.createElement('div');
  content.className = 'debug-content';
  debugPanel.appendChild(content);
  
  // Add to document
  document.body.appendChild(debugPanel);
  
  // Update debug info
  function updateDebugInfo() {
    // Check Vue status
    const isVueAvailable = typeof Vue !== 'undefined';
    const hasComponentData = typeof window.COMPONENT_DATA !== 'undefined';
    const hasInitialData = typeof window.INITIAL_DATA !== 'undefined';
    const isAppMounted = typeof window.vueAppMounted !== 'undefined' && window.vueAppMounted === true;
    
    // Get current URL info
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    const currentRoute = window.CURRENT_ROUTE || 'not set';
    const pluginId = window.PLUGIN_ID || 'unknown';
    
    // Check API status
    fetch(`/api/plugins/${pluginId}/debug`)
      .then(response => response.json())
      .then(apiStatus => {
        // Format the debug info
        content.innerHTML = `
          <div style="margin-top: 10px;">
            <div><strong>Vue Status</strong></div>
            <div>Vue available: ${isVueAvailable}</div>
            <div>COMPONENT_DATA: ${hasComponentData}</div>
            <div>INITIAL_DATA: ${hasInitialData}</div>
            <div>App Mounted: ${isAppMounted}</div>
            <div>Plugin ID: ${pluginId}</div>
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Component Data</strong></div>
            ${hasComponentData 
              ? `<div>Has template: ${!!window.COMPONENT_DATA.template}</div>
                 <div>Has methods: ${!!window.COMPONENT_DATA.methods}</div>
                 <div>Template length: ${(window.COMPONENT_DATA.template || '').length} chars</div>
                 <div>Method keys: ${Object.keys(window.COMPONENT_DATA.methods || {}).join(', ') || 'none'}</div>`
              : '<div>No component data available</div>'
            }
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Initial Data</strong></div>
            ${hasInitialData
              ? `<div>Keys: ${Object.keys(window.INITIAL_DATA).join(', ') || 'empty object'}</div>
                 <div>Data size: ~${JSON.stringify(window.INITIAL_DATA).length} bytes</div>`
              : '<div>No initial data available</div>'
            }
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Router</strong></div>
            <div>Current URL: ${currentUrl}</div>
            <div>Path: ${currentPath}</div>
            <div>CURRENT_ROUTE: ${currentRoute}</div>
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>API Status</strong></div>
            <div>Status: ${apiStatus.status || 'unknown'}</div>
            <div>Routes: ${JSON.stringify(apiStatus.routes || [])}</div>
            <div>Data Providers: ${JSON.stringify(apiStatus.dataProviders || [])}</div>
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Console Log</strong></div>
            <div id="console-log-capture"></div>
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Actions</strong></div>
            <button onclick="window.location.reload()" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-right: 5px;">Reload</button>
            <button onclick="console.log('Debug data:', { Vue: typeof Vue, COMPONENT_DATA: window.COMPONENT_DATA, INITIAL_DATA: window.INITIAL_DATA, vueAppMounted: window.vueAppMounted })" style="background-color: #2196F3; color: white; border: none; padding: 5px 10px; cursor: pointer;">Log Debug</button>
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Network Timings</strong></div>
            <div id="network-timings"></div>
          </div>
        `;
        
        // Update network timings if Performance API is available
        if (window.performance && window.performance.getEntriesByType) {
          try {
            const resources = window.performance.getEntriesByType('resource');
            const networkTimingsDiv = document.getElementById('network-timings');
            
            if (networkTimingsDiv && resources.length > 0) {
              const timingsHtml = resources
                .slice(-5) // Get the last 5 resources
                .map(resource => {
                  const name = resource.name.split('/').pop();
                  return `<div>${name}: ${Math.round(resource.duration)}ms</div>`;
                })
                .join('');
              
              networkTimingsDiv.innerHTML = timingsHtml;
            }
          } catch (e) {
            console.error('Error getting performance entries:', e);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching API status:', error);
        content.innerHTML = `
          <div style="margin-top: 10px;">
            <div><strong>Vue Status</strong></div>
            <div>Vue available: ${isVueAvailable}</div>
            <div>COMPONENT_DATA: ${hasComponentData}</div>
            <div>INITIAL_DATA: ${hasInitialData}</div>
            <div>App Mounted: ${isAppMounted}</div>
            <div>Plugin ID: ${pluginId}</div>
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Component Data</strong></div>
            ${hasComponentData 
              ? `<div>Has template: ${!!window.COMPONENT_DATA.template}</div>
                 <div>Has methods: ${!!window.COMPONENT_DATA.methods}</div>
                 <div>Template length: ${(window.COMPONENT_DATA.template || '').length} chars</div>
                 <div>Method keys: ${Object.keys(window.COMPONENT_DATA.methods || {}).join(', ') || 'none'}</div>`
              : '<div>No component data available</div>'
            }
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Initial Data</strong></div>
            ${hasInitialData
              ? `<div>Keys: ${Object.keys(window.INITIAL_DATA).join(', ') || 'empty object'}</div>
                 <div>Data size: ~${JSON.stringify(window.INITIAL_DATA).length} bytes</div>`
              : '<div>No initial data available</div>'
            }
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Router</strong></div>
            <div>Current URL: ${currentUrl}</div>
            <div>Path: ${currentPath}</div>
            <div>CURRENT_ROUTE: ${currentRoute}</div>
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>API Status</strong></div>
            <div>Error: ${error.message}</div>
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Console Log</strong></div>
            <div id="console-log-capture"></div>
          </div>
          
          <div style="margin-top: 10px;">
            <div><strong>Actions</strong></div>
            <button onclick="window.location.reload()" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-right: 5px;">Reload</button>
            <button onclick="console.log('Debug data:', { Vue: typeof Vue, COMPONENT_DATA: window.COMPONENT_DATA, INITIAL_DATA: window.INITIAL_DATA, vueAppMounted: window.vueAppMounted })" style="background-color: #2196F3; color: white; border: none; padding: 5px 10px; cursor: pointer;">Log Debug</button>
          </div>
        `;
      });
  }
  
  // Capture console logs
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const logs = [];
  
  console.log = function() {
    logs.unshift({ type: 'log', args: Array.from(arguments).join(' ') });
    if (logs.length > 10) logs.pop();
    updateConsoleLogs();
    originalLog.apply(console, arguments);
  };
  
  console.error = function() {
    logs.unshift({ type: 'error', args: Array.from(arguments).join(' ') });
    if (logs.length > 10) logs.pop();
    updateConsoleLogs();
    originalError.apply(console, arguments);
  };
  
  console.warn = function() {
    logs.unshift({ type: 'warn', args: Array.from(arguments).join(' ') });
    if (logs.length > 10) logs.pop();
    updateConsoleLogs();
    originalWarn.apply(console, arguments);
  };
  
  function updateConsoleLogs() {
    const logCapture = document.getElementById('console-log-capture');
    if (logCapture) {
      logCapture.innerHTML = logs.map(log => {
        const color = log.type === 'error' ? '#ff4444' : (log.type === 'warn' ? '#ffbb33' : '#ffffff');
        return `<div style="color: ${color}; margin-bottom: 2px; word-break: break-word;">${log.args}</div>`;
      }).join('');
    }
  }
  
  // Initial update
  updateDebugInfo();
  
  // Update every 3 seconds
  setInterval(updateDebugInfo, 3000);
})(); 