// if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = module.exports = express();

const { allowCrossDomain, validateRequest, jwtRequired, passUserFromJWT, adminRequired } = require("../../middlewares");

const { findAll, createPostComment, updatePostComment, deletePostComment, findByPkOr404 } = require("./postcomments-dal");
const { ErrorHandler } = require("../../utils/error");

const yup = require("yup");
const { param_id, id } = require("../utils/validations");

app.use(allowCrossDomain)

const PostCommentFields = {
    content: yup.string().min(1),
    PostId: id,
}
const PostCommentFieldKeys = Object.keys(PostCommentFields)

app.get("/postcomments", [
    // jwtRequired, passUserFromJWT,
    validateRequest(yup.object().shape({
        query: yup.object().shape({
            page: param_id.default("1"),
            pageSize: param_id.default("3"),
            status: yup.string(),
            query: yup.string(),
            PostId: param_id,
            BlogId: param_id
        })
    }))
], async (req,res) => {
    const { page, pageSize } = req.query;
    const { postcomments, count } = await findAll(req.query); 
    return res.json({
        message: "success",
        code: 200,
        data: { count, page, pageSize, postcomments }
    })
})

app.get("/postcomments/:postcomment_id", [
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            postcomment_id: param_id.required()
        })
    }))
], async (req,res) => {
    const postcomment = await findByPkOr404(req.params.postcomment_id);
    return res.json({
        code: 200,
        message: "sucess",
        data: { postcomment }
    })
})


const CreatePostCommentFields = {};
PostCommentFieldKeys.map(key => CreatePostCommentFields[key] = PostCommentFields[key].required());
app.post("/postcomments",[
    jwtRequired, passUserFromJWT,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(PostCommentFields)
    }))
], async (req,res) => {
    let { id: UserId } = req.user;
    let postcomment = await createPostComment({
        ...req.body,
        UserId
    });
    return res.json({
        code: 200,
        message: "success",
        data: { postcomment }
    })
})

app.patch("/postcomments/:postcomment_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        requestBody: yup.object().shape(PostCommentFields),
        params: yup.object().shape({
            postcomment_id: param_id.required()
        })
    }))
], async (req,res) => {
    let postcomment = await updatePostComment({
        pk: req.params.postcomment_id,
        data: req.body
    });
    return res.json({
        code: 200,
        message: "success",
        data: { postcomment }
    })
})

app.delete("/postcomments/:postcomment_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(yup.object().shape({
        params: yup.object().shape({
            postcomment_id: param_id.required()
        })
    }))
], async (req,res) => {
    await deletePostComment(req.params.postcomment_id)
    return res.json({
        code: 204,
        message: "success"
    })
})
