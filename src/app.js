if (!process.env.DONT_USE_DOTENV) require("dotenv").config();

require("express-async-errors");

// const models = require("./models");

// models.sequelize.sync({ force: false });

const http = require("http");
const cors = require("cors");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan")("dev");
const DocsCollector = require("docs-collector");

const docs_collector = new DocsCollector(
  __dirname + "/libs/api-docs/swagger-input.json",
  __dirname + "/libs/api-docs/swagger.json"
);

const { errorHandler, allowCrossDomain } = require("./middlewares");

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
const blogthemes_api = require("./libs/blogthemes-api");
const files_api = require("./libs/files-api");

const app = express();
const server = http.createServer(app);

app.use(cors())
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(logger);
app.use(allowCrossDomain);

const PATHNAME_PREFIX = "/api/v1";

docs_collector.generateSwaggerDocument();
app.use(PATHNAME_PREFIX, api_docs);
app.use(PATHNAME_PREFIX, auth_api);
app.use(PATHNAME_PREFIX, users_api);
app.use(PATHNAME_PREFIX, blogs_api);
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
app.use(PATHNAME_PREFIX, blogthemes_api);
app.use(PATHNAME_PREFIX, files_api);

app.get("/", (req, res) => res.json({ versions: ["v1"] }));
app.get("*", (req, res) =>
  res.status(404).json({
    code: 404,
    message:
      "API Endpoint not found, if this is unexpected please contact the developer.",
  })
);

app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => console.log("Running on port: ", PORT));
}

module.exports = app;
