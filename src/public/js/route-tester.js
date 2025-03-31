// /**
//  * Route Tester
//  * 
//  * This script tests all defined routes to check if they're working
//  */
// (function() {
//   console.log('[Route Tester] Initializing route tester');
  
//   // Create the tester UI
//   const tester = document.createElement('div');
//   tester.id = 'route-tester';
//   tester.style.cssText = `
//     position: fixed;
//     top: 20px;
//     right: 20px;
//     background-color: #fff;
//     border: 1px solid #ddd;
//     padding: 15px;
//     border-radius: 5px;
//     box-shadow: 0 0 10px rgba(0,0,0,0.1);
//     z-index: 9999;
//     max-width: 300px;
//   `;
  
//   tester.innerHTML = `
//     <h3 style="margin-top: 0; margin-bottom: 10px;">Route Tester</h3>
//     <div id="route-test-results">Loading routes...</div>
//     <button id="test-routes-button" style="margin-top: 10px; padding: 5px 10px; background-color: #3273dc; color: white; border: none; border-radius: 3px; cursor: pointer;">
//       Test All Routes
//     </button>
//   `;
  
//   // Add to document
//   document.body.appendChild(tester);
  
//   // Fetch and display routes
//   async function fetchRoutes() {
//     try {
//       const response = await fetch('/debug/routes');
//       const data = await response.json();
      
//       if (data.status === 'success') {
//         let html = '<ul style="padding-left: 20px; margin: 0;">';
        
//         let allRoutes = [];
//         data.plugins.forEach(plugin => {
//           if (plugin.routes && Array.isArray(plugin.routes)) {
//             plugin.routes.forEach(route => {
//               allRoutes.push({
//                 path: route.path,
//                 plugin: plugin.plugin
//               });
//             });
//           }
//         });
        
//         allRoutes.forEach(route => {
//           html += `<li><a href="${route.path}" target="_blank">${route.path}</a> (${route.plugin})</li>`;
//         });
        
//         html += '</ul>';
        
//         document.getElementById('route-test-results').innerHTML = html;
//       } else {
//         document.getElementById('route-test-results').innerHTML = 
//           `<p>Error: ${data.message}</p>`;
//       }
//     } catch (error) {
//       document.getElementById('route-test-results').innerHTML = 
//         `<p>Error fetching routes: ${error.message}</p>`;
//     }
//   }
  
//   // Test all routes
//   async function testAllRoutes() {
//     const resultsDiv = document.getElementById('route-test-results');
//     resultsDiv.innerHTML = '<p>Testing routes...</p>';
    
//     try {
//       const response = await fetch('/debug/routes');
//       const data = await response.json();
      
//       if (data.status === 'success') {
//         let html = '<ul style="padding-left: 20px; margin: 0;">';
//         let allRoutes = [];
        
//         data.plugins.forEach(plugin => {
//           if (plugin.routes && Array.isArray(plugin.routes)) {
//             plugin.routes.forEach(route => {
//               allRoutes.push({
//                 path: route.path,
//                 plugin: plugin.plugin
//               });
//             });
//           }
//         });
        
//         const testResults = await Promise.all(
//           allRoutes.map(async route => {
//             try {
//               const routeResponse = await fetch(route.path);
//               return {
//                 path: route.path,
//                 plugin: route.plugin,
//                 status: routeResponse.status,
//                 ok: routeResponse.ok
//               };
//             } catch (error) {
//               return {
//                 path: route.path,
//                 plugin: route.plugin,
//                 status: 'Error',
//                 ok: false,
//                 error: error.message
//               };
//             }
//           })
//         );
        
//         testResults.forEach(result => {
//           const statusColor = result.ok ? 'green' : 'red';
//           html += `
//             <li>
//               <a href="${result.path}" target="_blank">${result.path}</a>
//               <span style="color: ${statusColor};">[${result.status}]</span>
//               ${result.error ? `<span style="color: red;">${result.error}</span>` : ''}
//             </li>
//           `;
//         });
        
//         html += '</ul>';
//         resultsDiv.innerHTML = html;
//       } else {
//         resultsDiv.innerHTML = `<p>Error: ${data.message}</p>`;
//       }
//     } catch (error) {
//       resultsDiv.innerHTML = `<p>Error testing routes: ${error.message}</p>`;
//     }
//   }
  
//   // Initialize
//   fetchRoutes();
  
//   // Add event listener for the test button
//   document.getElementById('test-routes-button').addEventListener('click', testAllRoutes);
// })(); 