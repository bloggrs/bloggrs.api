// if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = module.exports = express();

const { allowCrossDomain, validateRequest, jwtRequired, passUserFromJWT, adminRequired } = require("../../middlewares");

const { findAll, createPage, updatePage, deletePage, findByPkOr404 } = require("./pages-dal");
const { ErrorHandler } = require("../../utils/error");

const yup = require("yup");
const { param_id, id } = require("../utils/validations");

app.use(allowCrossDomain)

const block_fields = {
    name: yup.string().required(),
    attributes: yup.object().required()
  }
  
  const blocks_schema = yup.array().of(
    yup.object().shape({
      ...block_fields,
      children: yup.array().of(
          yup.object().shape({
              ...block_fields,
              children: yup.array().of(
                  yup.object().shape({
                      ...block_fields
                  })
              )
          })
      )
    })
  )

const PageFields = {
    name: yup.string(),
    slug: yup.string(),
    BlogId: id,
    UserId: id,
    blocks: blocks_schema
}
const PageFieldKeys = Object.keys(PageFields)

app.get("/pages", [
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
    let pages = await findAll(req.query); 
    return res.json({
        message: "success",
        code: 200,
        data: { pages }
    })
})

app.get("/pages/:page_id", [
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            page_id: param_id.required()
        })
    }))
], async (req,res) => {
    const page = await findByPkOr404(req.params.page_id);
    return res.json({
        code: 200,
        message: "sucess",
        data: { page }
    })
})


const CreatePageFields = {};
PageFieldKeys.map(key => CreatePageFields[key] = PageFields[key].required());
app.post("/pages",[
    // jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(CreatePageFields)
    }))
], async (req,res) => {
    let page = await createPage(req.body);
    return res.json({
        code: 200,
        message: "success",
        data: { page }
    })
})

app.patch("/pages/:page_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(PageFields),
        params: yup.object().shape({
            page_id: param_id.required()
        })
    }))
], async (req,res) => {
    let page = await updatePage({
        pk: req.params.page_id,
        data: req.body
    });
    return res.json({
        code: 200,
        message: "success",
        data: { page }
    })
})

app.delete("/pages/:page_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            page_id: param_id.required()
        })
    }))
], async (req,res) => {
    await deletePage(req.params.page_id)
    return res.json({
        code: 204,
        message: "success"
    })
})
