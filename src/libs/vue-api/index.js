const express = require('express');
const app = module.exports = express();
const { validateRequest, jwtRequired, passUserFromJWT } = require('../../middlewares');
const { 
  componentStateSchema, 
  performanceConfigSchema,
  imageOptimizationSchema,
  imageProcessingSchema 
} = require('./validations');
const {
  stateManagementDal,
  performanceDal,
  imageDal
} = require('./vue-dal');

// State Management Routes
app.post('/vue/state', [
  jwtRequired,
  passUserFromJWT,
  validateRequest(componentStateSchema)
], async (req, res) => {
  const state = await stateManagementDal.createComponentState(req.body);
  return res.json({
    message: 'success',
    code: 201,
    data: { state }
  });
});

app.get('/vue/state/:componentId', [
  jwtRequired,
  passUserFromJWT
], async (req, res) => {
  const states = await stateManagementDal.getComponentStates(req.params.componentId);
  return res.json({
    message: 'success',
    code: 200,
    data: { states }
  });
});

// Performance Monitoring Routes
app.post('/vue/performance/config', [
  jwtRequired,
  passUserFromJWT,
  validateRequest(performanceConfigSchema)
], async (req, res) => {
  const config = await performanceDal.createConfig(req.body);
  return res.json({
    message: 'success',
    code: 201,
    data: { config }
  });
});

app.post('/vue/performance/metrics', [
  jwtRequired,
  passUserFromJWT
], async (req, res) => {
  const metrics = await performanceDal.recordMetrics(req.body);
  return res.json({
    message: 'success',
    code: 201,
    data: { metrics }
  });
});

// Image Optimization Routes
app.post('/vue/images/config', [
  jwtRequired,
  passUserFromJWT,
  validateRequest(imageOptimizationSchema)
], async (req, res) => {
  const config = await imageDal.createOptimizationConfig(req.body);
  return res.json({
    message: 'success',
    code: 201,
    data: { config }
  });
});

app.post('/vue/images/process', [
  jwtRequired,
  passUserFromJWT,
  validateRequest(imageProcessingSchema)
], async (req, res) => {
  const job = await imageDal.queueImageProcessing(req.body);
  return res.json({
    message: 'success',
    code: 201,
    data: { job }
  });
});

// Error handling for this router
app.use((err, req, res, next) => {
  console.error('Vue API Error:', err);
  res.status(err.statusCode || 500).json({
    message: 'error',
    code: err.statusCode || 500,
    error: err.message || 'Internal server error'
  });
}); 