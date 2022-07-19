"use strict";

const { ErrorHandler } = require("../utils/error");
const { parser: html_parser } = require("node-html-parser");

module.exports = (sequelize, DataTypes) => {
  let options = {
    defaultScope: {},
    scopes: {},
  };
  let Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      html_content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("DRAFT", "PUBLISHED", "UNPUBLISHED"),
        allowNull: false,
        defaultValue: "DRAFT",
      },
    },
    options
  );
  Post.findByPkOrError = async (pk) => {
    let post = await Post.findByPk(pk);
    if (!post) throw new ErrorHandler.get404("Post");
    return post;
  };
  Post.associate = (models) => {
    Post.belongsTo(models.Blog, { foreignKey: { allowNull: false } });
    Post.belongsTo(models.User, { foreignKey: { allowNull: false } });
    Post.belongsToMany(models.Category, { through: models.PostCategory });
    Post.hasMany(models.PostComment);
    Post.hasMany(models.PostLike);
  };

  return Post;
};
