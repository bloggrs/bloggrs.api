// if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = module.exports = express();

const { 
    allowCrossDomain, validateRequest, 
    jwtRequired, passUserFromJWT, 
    adminRequired, jwtNotRequired,
    passUserOrCreateGuestFromJWT 
} = require("../../middlewares");

const { findAll, createPost, updatePost, deletePost, findByPkOr404 } = require("./posts-dal");
const { ErrorHandler } = require("../../utils/error");

const yup = require("yup");
const { param_id, id } = require("../utils/validations");


yup.addMethod(yup.array, 'oneOfSchemas', function(schemas) {
    return this.test(
      'one-of-schemas',
      'Not all items in ${path} match one of the allowed schemas',
      items => !schemas.length ? true : items.every(item => {
        return schemas.some(schema => schema.isValidSync(item, {strict: true}))
      })
    )
})

app.use(allowCrossDomain)

const PostFields = {
    title: yup.string(),
    slug: yup.string(),
    html_content: yup.string(),
    BlogId: id,
    // categories: yup.array().oneOfSchemas([
    //     yup.object().shape({
    //         title: yup.string().required()
    //     }),
    //     yup.object().shape({
    //         slug: yup.string().required()
    //     }),
    //     yup.object().shape({
    //         id: id.required()
    //     }),
    // ])
    // status: yup.string().default("")
}
const PostFieldKeys = Object.keys(PostFields)

app.get("/posts", [
    jwtNotRequired, passUserOrCreateGuestFromJWT,
    validateRequest(yup.object().shape({
        query: yup.object().shape({
            page: yup.number().integer().positive().default(1),
            pageSize: yup.number().integer().positive().default(3),
            status: yup.string(),
            query: yup.string(),
            categories: yup.string()
        })
    }))
], async (req,res) => {
    let { page, pageSize } = req.query;
    let posts = await findAll({
        ...req.query,
        UserId: req.user.id
    }); 
    return res.json({
        message: "success",
        code: 200,
        data: { page, pageSize, posts }
    })
})

app.get("/posts/:post_id", [
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            post_id: param_id.required()
        })
    }))
], async (req,res) => {
    const post = await findByPkOr404(req.params.post_id);
    return res.json({
        code: 200,
        message: "sucess",
        data: { post }
    })
})


const CreatePostFields = {};
PostFieldKeys.map(key => CreatePostFields[key] = PostFields[key].required());
app.post("/posts",[
    jwtRequired, passUserFromJWT,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(CreatePostFields)
    }))
], async (req,res) => {
    let post = await createPost({
        ...req.body,
        UserId: req.user.id,
    });
    return res.json({
        code: 200,
        message: "success",
        data: { post }
    })
})

app.patch("/posts/:post_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(PostFields),
        params: yup.object().shape({
            post_id: param_id.required()
        })
    }))
], async (req,res) => {
    let post = await updatePost({
        pk: req.params.post_id,
        data: req.body
    });
    return res.json({
        code: 200,
        message: "success",
        data: { post }
    })
})

app.delete("/posts/:post_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            post_id: param_id.required()
        })
    }))
], async (req,res) => {
    await deletePost(req.params.post_id)
    return res.json({
        code: 204,
        message: "success"
    })
})