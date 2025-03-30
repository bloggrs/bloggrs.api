/**
 * Retry a Prisma operation with exponential backoff
 * @param {Function} operation - Function that returns a Promise
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Result of the operation
 */
async function retryOperation(operation, maxRetries = 3, baseDelay = 100) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      // Only retry transaction conflicts and deadlocks
      if (error.code === 'P2034') {
        lastError = error;
        
        // Calculate delay with exponential backoff and jitter
        const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 100;
        console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${Math.round(delay)}ms`);
        
        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        // For other errors, don't retry
        throw error;
      }
    }
  }
  
  // If we've exhausted all retries
  throw lastError;
}

module.exports = {
  retryOperation
}; 