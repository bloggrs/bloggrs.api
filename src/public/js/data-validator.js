/**
 * Data Validator
 * 
 * A tool to validate data flow from server to client
 */
(function() {
  console.log('[Data Validator] Initializing...');
  
  // Create a validation report
  const validationResults = {
    componentData: {
      exists: false,
      hasTemplate: false,
      hasMethods: false,
      status: 'unknown'
    },
    initialData: {
      exists: false,
      keys: [],
      status: 'unknown'
    },
    routeParams: {
      exists: false,
      keys: [],
      status: 'unknown'
    },
    vueStatus: {
      loaded: false,
      mounted: false,
      status: 'unknown'
    }
  };
  
  // Validate component data
  function validateComponentData() {
    validationResults.componentData.exists = !!window.COMPONENT_DATA;
    
    if (validationResults.componentData.exists) {
      validationResults.componentData.hasTemplate = !!window.COMPONENT_DATA.template;
      validationResults.componentData.hasMethods = !!window.COMPONENT_DATA.methods;
      validationResults.componentData.status = 'valid';
      
      if (!validationResults.componentData.hasTemplate) {
        validationResults.componentData.status = 'invalid-no-template';
      }
    } else {
      validationResults.componentData.status = 'missing';
    }
  }
  
  // Validate initial data
  function validateInitialData() {
    validationResults.initialData.exists = !!window.INITIAL_DATA;
    
    if (validationResults.initialData.exists) {
      validationResults.initialData.keys = Object.keys(window.INITIAL_DATA);
      validationResults.initialData.status = validationResults.initialData.keys.length > 0 ? 'valid' : 'empty';
    } else {
      validationResults.initialData.status = 'missing';
    }
  }
  
  // Validate route params
  function validateRouteParams() {
    validationResults.routeParams.exists = !!window.ROUTE_PARAMS;
    
    if (validationResults.routeParams.exists) {
      validationResults.routeParams.keys = Object.keys(window.ROUTE_PARAMS);
      validationResults.routeParams.status = 'valid';
    } else {
      validationResults.routeParams.status = 'missing';
    }
  }
  
  // Validate Vue status
  function validateVueStatus() {
    validationResults.vueStatus.loaded = typeof Vue !== 'undefined';
    validationResults.vueStatus.mounted = !!window.vueAppMounted;
    
    if (validationResults.vueStatus.loaded && validationResults.vueStatus.mounted) {
      validationResults.vueStatus.status = 'valid';
    } else if (validationResults.vueStatus.loaded) {
      validationResults.vueStatus.status = 'loaded-not-mounted';
    } else {
      validationResults.vueStatus.status = 'vue-missing';
    }
  }
  
  // Run all validations
  function runValidations() {
    validateComponentData();
    validateInitialData();
    validateRouteParams();
    validateVueStatus();
    
    // Log the results
    console.log('[Data Validator] Validation Results:', validationResults);
    
    // Show validation UI if any validation failed
    if (
      validationResults.componentData.status !== 'valid' ||
      validationResults.initialData.status === 'missing' ||
      validationResults.vueStatus.status !== 'valid'
    ) {
      showValidationUI();
    }
  }
  
  // Show validation UI
  function showValidationUI() {
    // Check if the UI has already been created
    if (document.getElementById('data-validator-ui')) {
      return;
    }
    
    // Create validation UI element
    const validatorUI = document.createElement('div');
    validatorUI.id = 'data-validator-ui';
    validatorUI.style.cssText = `
      position: fixed;
      bottom: 10px;
      left: 10px;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      max-width: 350px;
      max-height: 300px;
      overflow: auto;
    `;
    
    // Build HTML content
    let html = '<h3 style="margin-top: 0;">Data Flow Validation</h3>';
    
    // Component Data section
    html += '<div style="margin-top: 10px;"><strong>Component Data:</strong> ';
    if (validationResults.componentData.status === 'valid') {
      html += '<span style="color: green;">✓ Valid</span>';
    } else if (validationResults.componentData.status === 'invalid-no-template') {
      html += '<span style="color: red;">✗ Missing Template</span>';
    } else {
      html += '<span style="color: red;">✗ Missing</span>';
    }
    html += '</div>';
    
    // Initial Data section
    html += '<div style="margin-top: 5px;"><strong>Initial Data:</strong> ';
    if (validationResults.initialData.status === 'valid') {
      html += '<span style="color: green;">✓ Valid</span>';
      html += ` (${validationResults.initialData.keys.length} keys)`;
    } else if (validationResults.initialData.status === 'empty') {
      html += '<span style="color: orange;">⚠ Empty</span>';
    } else {
      html += '<span style="color: red;">✗ Missing</span>';
    }
    html += '</div>';
    
    // Route Params section
    html += '<div style="margin-top: 5px;"><strong>Route Params:</strong> ';
    if (validationResults.routeParams.status === 'valid') {
      html += '<span style="color: green;">✓ Valid</span>';
    } else {
      html += '<span style="color: orange;">⚠ Missing</span>';
    }
    html += '</div>';
    
    // Vue Status section
    html += '<div style="margin-top: 5px;"><strong>Vue Status:</strong> ';
    if (validationResults.vueStatus.status === 'valid') {
      html += '<span style="color: green;">✓ Mounted</span>';
    } else if (validationResults.vueStatus.status === 'loaded-not-mounted') {
      html += '<span style="color: orange;">⚠ Loaded but not mounted</span>';
    } else {
      html += '<span style="color: red;">✗ Vue missing</span>';
    }
    html += '</div>';
    
    // Actions section
    html += `
      <div style="margin-top: 10px;">
        <strong>Actions:</strong>
        <div style="margin-top: 5px;">
          <button onclick="window.location.reload()" style="background-color: #4CAF50; color: white; border: none; padding: 5px; margin-right: 5px; cursor: pointer;">Reload</button>
          <button onclick="document.getElementById('data-validator-ui').style.display='none'" style="background-color: #f44336; color: white; border: none; padding: 5px; cursor: pointer;">Close</button>
        </div>
      </div>
    `;
    
    validatorUI.innerHTML = html;
    document.body.appendChild(validatorUI);
  }
  
  // Run initial validation after a delay
  setTimeout(runValidations, 3000);
  
  // Run validation again after Vue should be mounted
  setTimeout(runValidations, 6000);
})(); 