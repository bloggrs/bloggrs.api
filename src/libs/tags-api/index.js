// if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = (module.exports = express());

const {
  allowCrossDomain,
  validateRequest,
  jwtRequired,
  passUserFromJWT,
  adminRequired,
} = require("../../middlewares");

const {
  findAll,
  createTag,
  updateTag,
  deleteTag,
  findByPkOr404,
} = require("./tags-dal");
const { ErrorHandler } = require("../../utils/error");

const yup = require("yup");
const { param_id, id } = require("../utils/validations");

app.use(allowCrossDomain);

const TagFields = {
  name: yup.string(),
  slug: yup.string(),
};
const TagFieldKeys = Object.keys(TagFields);

const prisma = require("../../prisma");
app.get(
  "/tags",
  [
    // jwtRequired, passUserFromJWT,
    validateRequest(
      yup.object().shape({
        query: yup.object().shape({
          page: yup.string().default("1"),
          pageSize: yup.string().default("10"),
          status: yup.string(),
          query: yup.string(),
          BlogId: param_id,
        }),
      })
    ),
  ],
  async (req, res) => {
    const { BlogId } = req.query;
    let tags = await findAll(req.query);
    let _meta = {
      count: await prisma.tags.count(BlogId ? { BlogId } : {})
    }
    return res.json({
      message: "success",
      code: 200,
      data: { tags, _meta },
    });
  }
);

app.get(
  "/tags/:tag_id",
  [
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          tag_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    const tag = await findByPkOr404(req.params.tag_id);
    return res.json({
      code: 200,
      message: "sucess",
      data: { tag },
    });
  }
);

const CreateTagFields = {};
TagFieldKeys.map(
  (key) => (CreateTagFields[key] = TagFields[key].required())
);
app.post(
  "/tags",
  [
    // jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(
      yup.object().shape({
        requestBody: yup.object().shape(CreateTagFields),
      })
    ),
  ],
  async (req, res) => {
    let tag = await createTag(req.body);
    return res.json({
      code: 200,
      message: "success",
      data: { tag },
    });
  }
);

app.patch(
  "/tags/:tag_id",
  [
    jwtRequired,
    passUserFromJWT,
    adminRequired,
    validateRequest(
      yup.object().shape({
        requestBody: yup.object().shape(TagFields),
        params: yup.object().shape({
          tag_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    let tag = await updateTag({
      pk: req.params.tag_id,
      data: req.body,
    });
    return res.json({
      code: 200,
      message: "success",
      data: { tag },
    });
  }
);

app.delete(
  "/tags/:tag_id",
  [
    jwtRequired,
    passUserFromJWT,
    adminRequired,
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          tag_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    await deleteTag(req.params.tag_id);
    return res.json({
      code: 204,
      message: "success",
    });
  }
);
