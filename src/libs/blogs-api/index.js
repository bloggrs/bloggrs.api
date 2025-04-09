// if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = (module.exports = express());

const {
  allowCrossDomain,
  validateRequest,
  jwtRequired,
  passUserFromJWT,
  adminRequired,
  checkPermission,
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
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const { exec } = require('child_process');

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
const prisma = require("../../prisma");
const { requireAuth } = require('../../middlewares/auth');
const { addPermissionsToUser, findOrCreatePermission } = require("../users-api/permissions-dal");
const { initializeInstance } = require("../../services/instance.service");

app.use(allowCrossDomain);


const BlogFields = {
  name: yup.string(),
  description: yup.string(),
  logo_url: yup.string(),
  slug: yup.string(),
  BlogCategoryId: id,
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

app.get(
  "/blogs/:blog_id/posts",
  [
    jwtRequired,
    passUserFromJWT,
    validateRequest(
      yup.object().shape({
        query: yup.object().shape({
          page: param_id,
          pageSize: param_id,
        }),
        params: yup.object().shape({
          blog_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    const { id: UserId } = req.user;
    
    // Check if user has access to this blog
    const blog = await findByPkOr404(req.params.blog_id);
    if (false) {
      throw new ErrorHandler(403, "Forbidden", ["You don't have access to this blog"]);
    }

    const posts = await findPostsForBlog(req.params.blog_id, UserId, req.query);
    return res.json({
      code: 200,
      message: "success",
      data: { posts },
    });
  }
);


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
          blog_id: yup.string().required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    const blog = await findByPkOr404(req.params.blog_id);
    return res.json({
      code: 200,
      message: "sucess",
      data: { blog,  },
    });
  }
);

const createBlogFields = {};
BlogFieldKeys.map(
  (key) => {
    if (key === 'description') return createBlogFields[key]
    if (key === 'logo_url') return createBlogFields[key]
    if (key === 'slug') return createBlogFields[key]
    if (key === 'craftjs_json_state') return createBlogFields[key]
    return (createBlogFields[key] = BlogFields[key].required())
  }
);

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.post(
  "/blogs",
  [
    jwtRequired,
    passUserFromJWT,
    validateRequest(yup.object().shape({
      requestBody: yup.object().shape(createBlogFields)
    }))
  ],
  async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    // Generate slug from name if not provided
    const slug = req.body.slug || req.body.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    let blog = await createBlog({ 
      ...req.body,
      slug,
      UserId: req.user.id, 
      req 
    });

    // Create default permissions for the blog creator
    const defaultPermissions = [
      { resource: 'posts', action: 'create' },
      { resource: 'posts', action: 'update' },
      { resource: 'posts', action: 'delete' },
      { resource: 'pages', action: 'create' },
      { resource: 'pages', action: 'update' },
      { resource: 'pages', action: 'delete' },
      { resource: 'settings', action: 'update' }
    ];

    // Create permissions if they don't exist and add them to the user
    const permissions = await Promise.all(
      defaultPermissions.map(({ resource, action }) => 
        findOrCreatePermission(`${resource}.${action}`, resource, action)
      )
    );
    
    // Skip adding direct user permissions since they'll be managed through team membership

    // Create team member first
    const teamMember = await prisma.teammembers.create({
      data: {
        UserId: req.user.id,
        BlogId: blog.id,
        isOwner: true
      }
    });

    // Then create the permission associations through blogpermissions
    await prisma.blogpermissions.createMany({
      data: permissions.flatMap(permission => [
        {
          resourceId: blog.id,
          resourceType: 'blogs',
          action: 'read',
          teammemberId: teamMember.id
        },
        {
          resourceId: blog.id,
          resourceType: 'blogs', 
          action: 'write',
          teammemberId: teamMember.id
        },
        {
          resourceId: blog.id,
          resourceType: 'blogs',
          action: 'update',
          teammemberId: teamMember.id
        },
        {
          teammemberId: teamMember.id,
          resourceId: blog.id,
          resourceType: 'blogs',
          action: 'delete',
        }
      ]),
      skipDuplicates: true // Adding action parameter to fix validation error
    });

    let key = await generatePublicKey(blog.id);
    const repoUrl = 'https://github.com/bloggrs/bloggrs.platform.next/archive/refs/heads/main.zip'; // replace with your repo's URL

    // Step 1: Download the repository ZIP file
    const response = await fetch(repoUrl);
    const zipFilePath = path.join(__dirname, 'repository.zip');
    const tempDir = path.join(__dirname, 'repository-main-' + blog.id); // Directory where files are extracted

    const fileStream = fs.createWriteStream(zipFilePath);
    await new Promise((resolve, reject) => {
      response.body.pipe(fileStream);
      response.body.on('error', reject);
      fileStream.on('finish', resolve);
    });

    await  delay(3000);

    // Step 2: Unzip the downloaded file
    await new Promise(async (resolve, reject) => {
      await fs.createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: tempDir }))
        .on('close', resolve) // Resolve when extraction is complete
        .on('error', reject);
    });

    // Step 3: Modify specific files
    const fileToModify = path.join(tempDir, 'bloggrs.platform.next-main/lib/bloggrs.js'); // Update path accordingly
    const fileToModify2 = path.join(tempDir, 'bloggrs.platform.next-main/.env'); // Update path accordingly

    let fileContent = fs.readFileSync(fileToModify, 'utf-8');
    fileContent = fileContent.replace('carinova', blog.slug); // Customize replacement
    fs.writeFileSync(fileToModify, fileContent);
    const newEnvContent = `NEXT_PUBLIC_BLOGGRS_PUBLIC_KEY=${key}\n`; // Customize this as needed
    fs.writeFileSync(fileToModify2, newEnvContent); // This will overwrite the file
    
    // Step 4: Run `npm start`
    exec(`npm install && npm run dev`, { cwd: tempDir + "/bloggrs.platform.next-main" }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting app: ${error}`);
        // res.status(500).send('Error starting the app');
        return;
      }
      console.log(`stdout: ${stdout}`);
      // res.send('App started successfully');
    });
    await prisma.instances.create({
      data: {
        name: 'repository-main-' + blog.id,
        status: 'running',
        BlogId: blog.BlogId, // Optional field, ensure BlogId is valid if used
        UserId: blog.UserId, // Optional field, ensure UserId is valid if used
      },
    });

    // Create an instance for the blog
    const instance = await prisma.instances.create({
      data: {
        name: `blog-${blog.id}`,
        status: 'pending',
        BlogId: blog.id,
        UserId: req.user.id
      }
    });

    // Initialize the instance (you'll need to implement this)
    await initializeInstance(instance.id);

    return res.json({
      code: 200,
      message: "success",
      data: { blog, instance }
    });
  }
);

app.patch(
  "/blogs/:blog_id",
  [
    jwtRequired,
    passUserFromJWT,
    checkPermission('blogs', 'update'),
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
    checkPermission('blogs', 'delete'),
    validateRequest(
      yup.object().shape({
        params: yup.object().shape({
          blog_id: param_id.required(),
        }),
      })
    ),
  ],
  async (req, res) => {
    await deleteBlog(req.params.blog_id, req);
    return res.json({
      code: 204,
      message: "success",
    });
  }
);
