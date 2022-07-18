// if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = module.exports = express();

const { allowCrossDomain, validateRequest, jwtRequired, passUserFromJWT, adminRequired } = require("../../middlewares");

const { findAll, createBlogTheme, updateBlogTheme, deleteBlogTheme, findByPkOr404 } = require("./blogthemes-dal");
const { ErrorHandler } = require("../../utils/error");

const yup = require("yup");
const { param_id, id } = require("../utils/validations");

app.use(allowCrossDomain)

const BlogThemeFields = {
    name: yup.string(),
    description: yup.string(),
    image_url: yup.string(),
    UserId: yup.number(),
    BlogCategoryId: yup.number(),
    BlogThemeId: yup.number(),
}
const BlogThemeFieldKeys = Object.keys(BlogThemeFields)

app.get("/blogthemes", [
    // jwtRequired, passUserFromJWT,
    validateRequest(yup.object().shape({
        query: yup.object().shape({
            page: yup.number().integer().positive().default(1),
            pageSize: yup.number().integer().positive().default(10),
            status: yup.string(),
            query: yup.string()
        })
    }))
], async (req,res) => {
    let blogthemes = await findAll(req.query); 
    return res.json({
        message: "success",
        code: 200,
        data: { blogthemes }
    })
})

app.get("/blogthemes/:blogtheme_id", [
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            blogtheme_id: param_id.required()
        })
    }))
], async (req,res) => {
    const blogtheme = await findByPkOr404(req.params.blogtheme_id);
    return res.json({
        code: 200,
        message: "sucess",
        data: { blogtheme }
    })
})


const CreateBlogThemeFields = {};
BlogThemeFieldKeys.map(key => CreateBlogThemeFields[key] = BlogThemeFields[key].required());
app.post("/blogthemes",[
    // jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(CreateBlogThemeFields)
    }))
], async (req,res) => {
    let blogtheme = await createBlogTheme(req.body);
    return res.json({
        code: 200,
        message: "success",
        data: { blogtheme }
    })
})

app.patch("/blogthemes/:blogtheme_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(BlogThemeFields),
        params: yup.object().shape({
            blogtheme_id: param_id.required()
        })
    }))
], async (req,res) => {
    let blogtheme = await updateBlogTheme({
        pk: req.params.blogtheme_id,
        data: req.body
    });
    return res.json({
        code: 200,
        message: "success",
        data: { blogtheme }
    })
})

app.delete("/blogthemes/:blogtheme_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            blogtheme_id: param_id.required()
        })
    }))
], async (req,res) => {
    await deleteBlogTheme(req.params.blogtheme_id)
    return res.json({
        code: 204,
        message: "success"
    })
})
