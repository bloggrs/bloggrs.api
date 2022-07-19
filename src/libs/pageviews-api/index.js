// if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = module.exports = express();

const { allowCrossDomain, validateRequest, jwtRequired, passUserFromJWT, adminRequired } = require("../../middlewares");

const { findAll, createPageView, updatePageView, deletePageView, findByPkOr404 } = require("./pageviews-dal");
const { ErrorHandler } = require("../../utils/error");

const yup = require("yup");
const { param_id, id } = require("../utils/validations");

app.use(allowCrossDomain)

const PageViewFields = {
    pathname: yup.string(),
    SiteSessionId: id
}
const PageViewFieldKeys = Object.keys(PageViewFields)

app.get("/pageviews", [
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
    let pageviews = await findAll(req.query); 
    return res.json({
        message: "success",
        code: 200,
        data: { pageviews }
    })
})

app.get("/pageviews/:pageview_id", [
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            pageview_id: param_id.required()
        })
    }))
], async (req,res) => {
    const pageview = await findByPkOr404(req.params.pageview_id);
    return res.json({
        code: 200,
        message: "sucess",
        data: { pageview }
    })
})


const CreatePageViewFields = {};
PageViewFieldKeys.map(key => CreatePageViewFields[key] = PageViewFields[key].required());
app.post("/pageviews",[
    // jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(CreatePageViewFields)
    }))
], async (req,res) => {
    let pageview = await createPageView(req.body);
    return res.json({
        code: 200,
        message: "success",
        data: { pageview }
    })
})

app.patch("/pageviews/:pageview_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(PageViewFields),
        params: yup.object().shape({
            pageview_id: param_id.required()
        })
    }))
], async (req,res) => {
    let pageview = await updatePageView({
        pk: req.params.pageview_id,
        data: req.body
    });
    return res.json({
        code: 200,
        message: "success",
        data: { pageview }
    })
})

app.delete("/pageviews/:pageview_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            pageview_id: param_id.required()
        })
    }))
], async (req,res) => {
    await deletePageView(req.params.pageview_id)
    return res.json({
        code: 204,
        message: "success"
    })
})
