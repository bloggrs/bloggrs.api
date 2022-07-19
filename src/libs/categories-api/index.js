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
  createCategory,
  updateCategory,
  deleteCategory,
  findByPkOr404,
} = require("./categories-dal");
const { ErrorHandler } = require("../../utils/error");

const yup = require("yup");
const { param_id, id } = require("../utils/validations");

app.use(allowCrossDomain);

const CategoryFields = {
  name: yup.string(),
  slug: yup.string(),
};
const CategoryFieldKeys = Object.keys(CategoryFields);

const prisma = require("../../prisma");
app.get(
  "/categories",
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
    let categories = await findAll(req.query);
    let _meta = {
      count: await prisma.categories.count(BlogId ? { BlogId } : {})
    }
    return res.json({
      message: "success",
      code: 200,
      data: { categories, _meta },
    });
  }
);

app.get(
  "/categories/:category_id",
  [
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          category_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    const category = await findByPkOr404(req.params.category_id);
    return res.json({
      code: 200,
      message: "sucess",
      data: { category },
    });
  }
);

const CreateCategoryFields = {};
CategoryFieldKeys.map(
  (key) => (CreateCategoryFields[key] = CategoryFields[key].required())
);
app.post(
  "/categories",
  [
    // jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(
      yup.object().shape({
        requestBody: yup.object().shape(CreateCategoryFields),
      })
    ),
  ],
  async (req, res) => {
    let category = await createCategory(req.body);
    return res.json({
      code: 200,
      message: "success",
      data: { category },
    });
  }
);

app.patch(
  "/categories/:category_id",
  [
    jwtRequired,
    passUserFromJWT,
    adminRequired,
    validateRequest(
      yup.object().shape({
        requestBody: yup.object().shape(CategoryFields),
        params: yup.object().shape({
          category_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    let category = await updateCategory({
      pk: req.params.category_id,
      data: req.body,
    });
    return res.json({
      code: 200,
      message: "success",
      data: { category },
    });
  }
);

app.delete(
  "/categories/:category_id",
  [
    jwtRequired,
    passUserFromJWT,
    adminRequired,
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          category_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    await deleteCategory(req.params.category_id);
    return res.json({
      code: 204,
      message: "success",
    });
  }
);
