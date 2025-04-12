const yup = require('yup');

module.exports = {
  componentStateSchema: yup.object().shape({
    requestBody: yup.object().shape({
      instanceId: yup.string().required(),
      componentId: yup.string().required(),
      name: yup.string().required(),
      type: yup.string().oneOf(['REACTIVE', 'REF', 'READONLY', 'SHALLOW_REF', 'SHALLOW_REACTIVE']),
      scope: yup.string().oneOf(['LOCAL', 'SHARED', 'GLOBAL', 'PERSISTENT']),
      initialValue: yup.mixed()
    })
  }),

  performanceConfigSchema: yup.object().shape({
    requestBody: yup.object().shape({
      instanceId: yup.string().required(),
      lcpThreshold: yup.number().positive(),
      fidThreshold: yup.number().positive(),
      clsThreshold: yup.number().positive(),
      enableCodeSplitting: yup.boolean()
    })
  }),

  imageOptimizationSchema: yup.object().shape({
    requestBody: yup.object().shape({
      instanceId: yup.string().required(),
      enabled: yup.boolean(),
      defaultQuality: yup.number().min(1).max(100),
      formats: yup.array().of(yup.string())
    })
  }),

  imageProcessingSchema: yup.object().shape({
    requestBody: yup.object().shape({
      configId: yup.string().required(),
      path: yup.string().required(),
      priority: yup.number().min(0),
      preset: yup.string()
    })
  })
}; 