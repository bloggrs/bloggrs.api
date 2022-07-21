// if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = module.exports = express();

const { allowCrossDomain, validateRequest, jwtRequired, passUserFromJWT, adminRequired } = require("../../middlewares");

const { findAll, createMedia, updateMedia, deleteMedia, findByPkOr404 } = require("./medias-dal");
const { ErrorHandler } = require("../../utils/error");

const yup = require("yup");
const { param_id, id } = require("../utils/validations");

app.use(allowCrossDomain)

const MediaFields = {
    fieldName: yup.string(),
    originalName: yup.string(),
    encoding: yup.string(),
    mimetype: yup.string(),
    size: yup.string(),
    media_url: yup.string(),
    BlogId: yup.string(),
}
const MediaFieldKeys = Object.keys(MediaFields)

app.get("/medias", [
    jwtRequired, passUserFromJWT,
    validateRequest(yup.object().shape({
        query: yup.object().shape({
            page: yup.string().transform(val => Number(val)),
            pageSize: yup.string().transform(val => Number(val)),
            status: yup.string(),
            query: yup.string()
        })
    }))
], async (req,res) => {
    let medias = await findAll(req.query); 
    return res.json({
        message: "success",
        code: 200,
        data: { medias }
    })
})

app.get("/medias/:media_id", [
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            media_id: param_id.required()
        })
    }))
], async (req,res) => {
    const media = await findByPkOr404(req.params.media_id);
    return res.json({
        code: 200,
        message: "sucess",
        data: { media }
    })
})


const CreateMediaFields = {};
MediaFieldKeys.map(key => CreateMediaFields[key] = MediaFields[key].required());
app.post("/medias",[
    // jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(CreateMediaFields)
    }))
], async (req,res) => {
    let media = await createMedia(req.body);
    return res.json({
        code: 200,
        message: "success",
        data: { media }
    })
})

app.patch("/medias/:media_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(MediaFields),
        params: yup.object().shape({
            media_id: param_id.required()
        })
    }))
], async (req,res) => {
    let media = await updateMedia({
        pk: req.params.media_id,
        data: req.body
    });
    return res.json({
        code: 200,
        message: "success",
        data: { media }
    })
})

app.delete("/medias/:media_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            media_id: param_id.required()
        })
    }))
], async (req,res) => {
    await deleteMedia(req.params.media_id)
    return res.json({
        code: 204,
        message: "success"
    })
})
