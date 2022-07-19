// if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = module.exports = express();

const { allowCrossDomain, validateRequest, jwtRequired, passUserFromJWT, adminRequired } = require("../../middlewares");

const { findAll, createSiteSession, updateSiteSession, deleteSiteSession, findByPkOr404 } = require("./sitesessions-dal");
const { ErrorHandler } = require("../../utils/error");

const yup = require("yup");
const { param_id, id } = require("../utils/validations");

app.use(allowCrossDomain)

const SiteSessionFields = {
    endedAt: yup.date(),
    UserId: id,
    BlogId: id
}
const SiteSessionFieldKeys = Object.keys(SiteSessionFields)

app.get("/sitesessions", [
    jwtRequired, passUserFromJWT,
    validateRequest(yup.object().shape({
        query: yup.object().shape({
            page: yup.number().integer().positive().default(1),
            pageSize: yup.number().integer().positive().default(10),
            status: yup.string(),
            query: yup.string()
        })
    }))
], async (req,res) => {
    let sitesessions = await findAll(req.query); 
    return res.json({
        message: "success",
        code: 200,
        data: { sitesessions }
    })
})

app.get("/sitesessions/:sitesession_id", [
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            sitesession_id: param_id.required()
        })
    }))
], async (req,res) => {
    const sitesession = await findByPkOr404(req.params.sitesession_id);
    return res.json({
        code: 200,
        message: "sucess",
        data: { sitesession }
    })
})


const CreateSiteSessionFields = {};
SiteSessionFieldKeys.map(key => {
    if (key === "UserId" || key === "endedAt") return CreateSiteSessionFields[key] = SiteSessionFields[key];
    CreateSiteSessionFields[key] = SiteSessionFields[key].required()
});
app.post("/sitesessions",[
    // jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(CreateSiteSessionFields)
    }))
], async (req,res) => {
    let sitesession = await createSiteSession(req.body);
    return res.json({
        code: 200,
        message: "success",
        data: { sitesession }
    })
})

app.patch("/sitesessions/:sitesession_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(SiteSessionFields),
        params: yup.object().shape({
            sitesession_id: param_id.required()
        })
    }))
], async (req,res) => {
    let sitesession = await updateSiteSession({
        pk: req.params.sitesession_id,
        data: req.body
    });
    return res.json({
        code: 200,
        message: "success",
        data: { sitesession }
    })
})

app.delete("/sitesessions/:sitesession_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            sitesession_id: param_id.required()
        })
    }))
], async (req,res) => {
    await deleteSiteSession(req.params.sitesession_id)
    return res.json({
        code: 204,
        message: "success"
    })
})
