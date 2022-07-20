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
  createBlog,
  updateBlog,
  deleteBlog,
  findByPkOr404,
  generateSecret,
  getBlogCategories,
  getBlogPages,
  generatePublicKey,
  getBlogHeaderWidetData,
  likeBlogPostHandler,
  findBySlug,
  update_page_state,
} = require("./blogs-dal");

const {
  findAll: findComments
} = require("../postcomments-api/postcomments-dal");

const { ErrorHandler } = require("../../utils/error");

const yup = require("yup");
const { param_id, id } = require("../utils/validations");
const validateCredentials = require("./validateCredentials");
const createBlogToken = require("../utils/createBlogToken");
const { findPostsForBlog, findPost } = require("../posts-dal");
const publickeysDal = require("../publickeys-api/publickeys-dal");
const { findByBlogSlugOr404 } = require("../pages-api/pages-dal");
const pagesDal = require("../pages-api/pages-dal");

app.use(allowCrossDomain);


const BlogFields = {
  name: yup.string(),
  description: yup.string(),
  BlogCategory: yup.object(),
  logo_url: yup.string(),
  slug: yup.string(),
  BlogCategoryId: id,
  BlogThemeId: id,
  craftjs_json_state: yup.string()
};
const BlogFieldKeys = Object.keys(BlogFields);

const getResponse = (blog) => ({
  status: "success",
  code: 200,
  message: "Authorized",
  data: {
    token: createBlogToken(blog.id),
    blog,
  },
});
app.post(
  "/blogs/:blog_id/generate_secret",
  [
    jwtRequired,
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          blog_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    let secret = await generateSecret(req.params.blog_id);
    return res.json({
      code: 200,
      message: "success",
      data: { secret },
    });
  }
);

app.post(
  "/blogs/:blog_id/generate_public_key",
  [
    jwtRequired,
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          blog_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    let key = await generatePublicKey(req.params.blog_id);
    return res.json({
      code: 200,
      message: "success",
      data: { key },
    });
  }
);

app.get("/blogs/:slug/api_key", async (req, res) => {
  const { slug } = req.params;
  const blog = await findBySlug(slug);
  const key = await publickeysDal.findOne({
    BlogId: blog.id
  });
  if (!key) throw new ErrorHandler(401, "Unauthorized", [ "slug not valid"])
  return res.json({
    code: 200,
    message: "success",
    data: { blog, key }
  })
});

app.get("/blogs/api_key/:api_key", [
  validateRequest(
    yup.object().shape({
      params: yup.object().shape({
        api_key: yup.string().required()
      })
    })
  )
], async (req, res) => {
  const key = await publickeysDal.findUnique(req.params.api_key);
  if (!key) throw new ErrorHandler(401, "Unauthorized", [ "api_key not valid"])
  const blog = await findByPkOr404(key.BlogId);
  return res.json({
    code: 200,
    message: "success",
    data: { blog, key }
  })
});


app.post("/blogs/api_key", [
  validateRequest(
    yup.object().shape({
      requestBody: yup.object().shape({
        api_key: yup.string().required()
      })
    })
  )
], async (req, res) => {
  const key = await publickeysDal.findUnique(req.body.api_key);
  if (!key) throw new ErrorHandler(401, "Unauthorized", [ "api_key not valid"])
  const blog = await findByPkOr404(key.BlogId);
  blog.pages = await pagesDal.findByBlogId(blog.id);
  return res.json({
    code: 200,
    message: "success",
    data: { blog, key }
  })
});

app.get("/blogs/auth", jwtRequired, async (req, res) => {
  let user = await findUserByPk(req.auth.userId);
  if (!user) throw new ErrorHandler(401, "Unauthorized");
  return res.json(getResponse(user));
});

app.post(
  "/blogs/auth",
  validateRequest(
    yup.object().shape({
      requestBody: yup.object().shape({
        blog_id: id.required(),
        secret: yup.string().uuid().required(),
      }),
    })
  ),
  async (req, res) => {
    let user = await validateCredentials(req.body);
    return res.json(getResponse(user));
  }
);

app.patch("/blogs/:apikey/update_page_state/:page_id",
  validateRequest(
    yup.object().shape({
      requestBody: yup.object().shape({
        craftjs_json_state: yup.string().required()
      }),
      params: yup.object().shape({
        apikey: yup.string().required(),
        page_id: yup.string().required()
      })
    })
  ),
  async (req, res) => {
    const { apikey, page_id } = req.params;
    console.log({ apikey, page_id })
    const { craftjs_json_state }  = req.body;
    await update_page_state({
      apikey, page_id, craftjs_json_state
    })
    return res.json({
      code: 201,
      message: "success"
    })
  }
)

app.get("/blogs/:blog_id/categories",[
  validateRequest(
    yup.object().shape({
      query: yup.object().shape({
        page: param_id.default("1"),
        pageSize: param_id.default("10"),
        status: yup.string(),
        query: yup.string(),
      }),
      params: yup.object().shape({
        blog_id: param_id.required()
      })
  }))
], async (req, res) => {
  const categories = await getBlogCategories(req.params.blog_id, req.query);
  return res.json({
    code: 200,
    message: "success",
    data: { categories },
  });
});

app.get("/blogs/:blog_id/header-widget-data", [
  validateRequest(
    yup.object().shape({
      params: yup.object().shape({
        blog_id: param_id.required()
      })
    })
  )
], async (req,res) => {
  const data = await getBlogHeaderWidetData(req.params.blog_id);
  return res.json({
    code: 200,
    message: "success",
    data
  })
})

app.get("/blogs/:blog_id/pages",[
  validateRequest(
    yup.object().shape({
      query: yup.object().shape({
        page: param_id.default("1"),
        pageSize: param_id.default("10"),
        status: yup.string(),
        query: yup.string(),
      }),
      params: yup.object().shape({
        blog_id: param_id.required()
      })
    })
  ),
], async (req, res) => {
  const pages = await getBlogPages(req.params.blog_id, req.query);
  return res.json({
    code: 200,
    message: "success",
    data: { pages },
  });
});

app.get("/blogs/:blog_id/pages/:slug", [
  validateRequest(
    yup.object().shape({
      params: yup.object().shape({
        blog_id: param_id.required(),
        slug: yup.string().required()
      })
    })
  )
], async (req,res) => {
  const {
    blog_id: BlogId,
    slug 
  } = req.params;
  const page = await findByBlogSlugOr404({ BlogId, slug });
  return res.json({
    code: 200,
    message: "success",
    data: { page }
  })
})

app.get(
  "/blogs/:blog_id/posts",
  [
    validateRequest(
      yup.object().shape({
        query: yup.object().shape({
          page: param_id,
          pageSize: param_id,
        }),
      })
    ),
    jwtRequired,
    passUserFromJWT
  ],
  async (req, res) => {
    const { id: UserId } = req.user;
    const posts = await findPostsForBlog(req.params.blog_id, UserId, req.query);
    return res.json({
      code: 200,
      message: "success",
      data: { posts },
    });
  }
);

app.get(
  "/blogs/:blog_id/posts/:post_id",
  [
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          blog_id: param_id.required(),
          post_id: yup.string(),
        }),
        query: yup.object().shape({
          page: param_id.default("1"),
          pageSize: param_id.default("10"),
          categories: yup.string()
        }),
      })
    ),
  ],
  async (req, res) => {
    const post = await findPost(req.params.post_id);
    return res.json({
      code: 200,
      message: "success",
      data: { post },
    });
  }
);

app.get(
  "/blogs/:blog_id/posts/:post_id/comments",
  [
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          blog_id: param_id.required(),
          post_id: yup.string(),
        }),
        query: yup.object().shape({
          page: param_id.default("1"),
          pageSize: param_id.default("3"),
        }),
      })
    ),
  ],
  async (req, res) => {
    const { post_id: PostId } = req.params;
    const { page, pageSize } = req.query;
    const { postcomments: comments, count } = await findComments({ 
      PostId, page, pageSize
    });
    return res.json({
      code: 200,
      message: "success",
      data: { page: Number(page) || 1, pageSize: Number(pageSize) || 3, count, comments },
    });
  }
);

app.post(
  "/blogs/:blog_id/posts/:post_id/:action",
  [
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          blog_id: param_id.required(),
          post_id: param_id.required(),
          action: yup.string().oneOf([ 'like', 'unlike' ])
        }),
      })
    ),
    jwtRequired,
    passUserFromJWT
  ],
  async (req, res) => {
    const { id: UserId } = req.user;
    const { post_id: PostId, action } = req.params;
    await likeBlogPostHandler({ PostId, UserId, action });
    return res.json({
      code: 200,
      message: "success",
    });
  }
);


app.get(
  "/blogs",
  [
    // jwtRequired,
    // passUserFromJWT,
    validateRequest(
      yup.object().shape({
        query: yup.object().shape({
          page: param_id.default("1"),
          pageSize: param_id.default("10"),
          status: yup.string(),
          query: yup.string(),
        }),
      })
    ),
  ],
  async (req, res) => {
    let blogs = await findAll(req.query);
    return res.json({
      message: "success",
      code: 200,
      data: { blogs },
    });
  }
);


app.get(
  "/me/blogs",
  [
    jwtRequired,
    passUserFromJWT
  ],
  async (req, res) => {
    const { UserId } = req.user;
    const blogs = await findAll({ UserId });
    return res.json({
      code: 200,
      message: "sucess",
      data: { blogs },
    });
  }
);

app.get(
  "/blogs/:blog_id",
  [
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          blog_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    const blog = await findByPkOr404(req.params.blog_id);
    const key = await publickeysDal.findOne({
      BlogId: blog.id
    });
    return res.json({
      code: 200,
      message: "sucess",
      data: { blog, key },
    });
  }
);

const createBlogFields = {};
BlogFieldKeys.map(
  (key) => {
    if (key === 'description') return createBlogFields[key]
    if (key === 'slug') return createBlogFields[key]
    if (key === 'craftjs_json_state') return createBlogFields[key]
    return (createBlogFields[key] = BlogFields[key].required())
  }
);
app.post(
  "/blogs",
  [
    jwtRequired,
    passUserFromJWT,
    validateRequest(
      yup.object().shape({
        requestBody: yup.object().shape(createBlogFields),
      })
    ),
  ],
  async (req, res) => {
    let blog = await createBlog({
      ...req.body,
      UserId: req.user.id,
    });
    return res.json({
      code: 200,
      message: "success",
      data: { blog },
    });
  }
);

app.patch(
  "/blogs/:blog_id",
  [
    jwtRequired,
    passUserFromJWT,
    adminRequired,
    validateRequest(
      yup.object().shape({
        requestBody: yup.object().shape(BlogFields),
        params: yup.object().shape({
          blog_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    let blog = await updateBlog({
      pk: req.params.blog_id,
      data: req.body,
    });
    return res.json({
      code: 200,
      message: "success",
      data: { blog },
    });
  }
);

app.delete(
  "/blogs/:blog_id",
  [
    jwtRequired,
    passUserFromJWT,
    adminRequired,
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          blog_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    await deleteBlog(req.params.blog_id);
    return res.json({
      code: 204,
      message: "success",
    });
  }
);
