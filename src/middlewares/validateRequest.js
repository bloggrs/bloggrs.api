const { ErrorHandler } = require("../utils/error")

module.exports = (yupSchema,strict = true,options) => {
    return async (req,res,next) => {
        if (options){
            let {
                admin_or_id_is_same_as_val_of_param
            } = options
            if (admin_or_id_is_same_as_val_of_param){
                if (
                    req.user.isAdmin ||
                    req.user.id === Number(req.params[admin_or_id_is_same_as_val_of_param])
                ) {}
                else throw new ErrorHandler(401, "Unauthorized")
            }
        }
        if (process.env.DEBUG)
            console.log({
                requestBody: req.body.body ? req.body.body : req.body,
                query: req.query,
                params: req.params
            })
       try {
           await yupSchema.validate({
                requestBody: req.body.body ? req.body.body : req.body,
                query: req.query,
                params: req.params
           }, { abortEarly: false, strict })
       } catch (err) {
           console.log(err)
           throw new ErrorHandler(403,"Validation error",err.errors || [1])
       }
        next()
    }
}