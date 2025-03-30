if (!process.env.DONT_USE_DOTENV) require("dotenv").config();

require('randomuuid') // crypto polyfill
require("express-async-errors");

// const models = require("./models");

// models.sequelize.sync({ force: false });

const http = require("http");
const cors = require("cors");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan")("dev");
const path = require("path");
const { fileURLToPath } = require('url');
const DocsCollector = require("docs-collector");
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const fs = require('fs');

const docs_collector = new DocsCollector(
  __dirname + "/libs/api-docs/swagger-input.json",
  __dirname + "/libs/api-docs/swagger.json"
);

const { errorHandler, allowCrossDomain } = require("./middlewares");
const { addPermissionContext } = require("./middlewares/permissions");
const { authenticateUser } = require("./middlewares/auth");

const users_api = require("./libs/users-api");
const auth_api = require("./libs/auth-api");
const api_docs = require("./libs/api-docs");
const blogs_api = require("./libs/blogs-api");
const blogcategories_api = require("./libs/blogcategories-api");
const categories_api = require("./libs/categories-api");
const pages_api = require("./libs/pages-api");
const posts_api = require("./libs/posts-api");
const postcategories_api = require("./libs/postcategories-api");
const postcomments_api = require("./libs/postcomments-api");
const postlikes_api = require("./libs/postlikes-api");
const referral_api = require("./libs/referral-api");
const teammembers_api = require("./libs/teammembers-api");
const secretkeys_api = require("./libs/secretkeys-api");
const publickeys_api = require("./libs/publickeys-api");
const blogpostcategories_api = require("./libs/blogpostcategories-api");
const blogcontacts_api = require("./libs/blogcontacts-api");
const files_api = require("./libs/files-api");
const pageviews_api = require("./libs/pageviews-api");
const sitesessions_api = require("./libs/sitesessions-api");
const blogthemes_api = require("./libs/blogthemes-api");
const roles_api = require("./libs/roles-api");
const blogpermissions_api = require("./libs/blogpermissions-api");
const permissions_api = require("./libs/permissions-api");
const teammemberspermissions_api = require("./libs/teammemberspermissions-api");
const resourcepolicies_api = require("./libs/resourcepolicies-api");
const console_api = require("./console-api");

const app = express();
const server = http.createServer(app);

// Basic middleware
app.use(cors())
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(logger);
app.use(allowCrossDomain);

// Vite middleware setup
function viteMiddleware(req, res, next) {
  if (!app.get('vite') && process.env.NODE_ENV === 'development') {
    const { createServer } = require('vite')
    createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    }).then(vite => {
      app.set('vite', vite) // Store vite instance in app
      vite.middlewares(req, res, next)
    }).catch(err => {
      console.error('Vite setup error:', err)
      next(err)
    })
  } else {
    const vite = app.get('vite')
    if (vite) {
      vite.middlewares(req, res, next)
    } else {
      next()
    }
  }
}

// Register Vite middleware
app.use(viteMiddleware)

// Vue SSR route
app.get('/', (req, res) => {
  const vite = app.get('vite')
  if (vite) {
    const template = fs.readFileSync(
      path.join(__dirname, 'views/index.html'),
      'utf-8'
    )
    
    vite.transformIndexHtml(req.url, template)
      .then(transformedTemplate => {
        return vite.ssrLoadModule('/src/vue/entry-server.js')
          .then(({ render }) => render())
          .then(appHtml => {
            const html = transformedTemplate.replace('<!--vue-ssr-outlet-->', appHtml)
            res.send(html)
          })
      })
      .catch(err => {
        vite.ssrFixStacktrace(err)
        console.error('SSR Error:', err)
        res.status(500).send('Server Error')
      })
  } else {
    // Production fallback
    try {
      const template = fs.readFileSync(
        path.join(__dirname, 'views/index.html'),
        'utf-8'
      )
      const { render } = require('./vue/entry-server.js')
      render().then(appHtml => {
        const html = template.replace('<!--vue-ssr-outlet-->', appHtml)
        res.send(html)
      })
    } catch (err) {
      console.error('SSR Error:', err)
      res.status(500).send('Server Error')
    }
  }
})

// API routes
app.use(authenticateUser);
app.use(addPermissionContext);

const PATHNAME_PREFIX = "/api/v1";
docs_collector.generateSwaggerDocument();
app.use(PATHNAME_PREFIX, api_docs);
app.use(PATHNAME_PREFIX, auth_api);
app.use(PATHNAME_PREFIX, users_api);
app.use(PATHNAME_PREFIX, blogs_api);
app.use(PATHNAME_PREFIX, blogcontacts_api);
app.use(PATHNAME_PREFIX, blogthemes_api);
app.use(PATHNAME_PREFIX, blogcategories_api);
app.use(PATHNAME_PREFIX, categories_api);
app.use(PATHNAME_PREFIX, pages_api);
app.use(PATHNAME_PREFIX, posts_api);
app.use(PATHNAME_PREFIX, postcategories_api);
app.use(PATHNAME_PREFIX, postcomments_api);
app.use(PATHNAME_PREFIX, postlikes_api);
app.use(PATHNAME_PREFIX, referral_api);
app.use(PATHNAME_PREFIX, teammembers_api);
app.use(PATHNAME_PREFIX, secretkeys_api);
app.use(PATHNAME_PREFIX, publickeys_api);
app.use(PATHNAME_PREFIX, blogpostcategories_api);
app.use(PATHNAME_PREFIX, files_api);
app.use(PATHNAME_PREFIX, pageviews_api);
app.use(PATHNAME_PREFIX, sitesessions_api);
app.use(PATHNAME_PREFIX, roles_api);
app.use(PATHNAME_PREFIX, blogpermissions_api);
app.use(PATHNAME_PREFIX, permissions_api);
app.use(PATHNAME_PREFIX, teammemberspermissions_api);
app.use(PATHNAME_PREFIX, resourcepolicies_api);
app.use(PATHNAME_PREFIX, console_api);

// Move the catch-all route to the end
app.get("*", (req, res) =>
  res.status(404).json({
    code: 404,
    message:
      "API Endpoint not found, if this is unexpected please contact the developer.",
  })
);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log("Running on port:", PORT));

module.exports = app;
